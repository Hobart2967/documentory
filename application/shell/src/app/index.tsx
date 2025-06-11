import 'reflect-metadata';

import './index.scss';

import { RibbonBar } from './components/ribbon-bar/ribbon-bar.component';
import { TopBar } from './components/top-bar/top-bar.component';
import { SideBar } from './components/side-bar/side-bar.component';

import 'reflect-metadata';
import '@codewyre/wyrekit-runtime-composition';
import { DependencyInjectionContext } from '@codewyre/wyrekit-composition-solid';

import { Bootstrapper, ModuleDefinition, module } from '@codewyre/wyrekit-composition';
import {
	withDependencyInjection,
	withLogging,
	withModuleSupport,
	type DependencyInjectionContext as DependencyInjectionAppContext,
	type LoggingContext
} from '@codewyre/wyrekit-runtime-composition';
import { BaseApp } from '@codewyre/wyrekit-runtime';
import { render } from 'solid-js/web';
import { usingInversify } from '@codewyre/wyrekit-runtime-composition-inversify';
import { SidebarService } from './services/side-bar.service';
import { FileSystemService } from './services/file-system.service';
import { TranslationService } from './services/translation.service';
import { IconMappingService } from './services/icon-mapping.service';
import { ComputerService } from './services/computer.service';
import { IpcChannelProvider, IpcService } from './services/ipc.service';
import { IpcServiceBootstrapper } from './configuration/ipc-service.bootstrapper';

@module({
  services: [
    SidebarService,
    FileSystemService,
    TranslationService,
    IconMappingService,
    ComputerService,
    IpcService,
  ],
  aliases: [],
  constantValues: [
    {
      use: IpcChannelProvider,
      withValue: window as unknown as IpcChannelProvider,
    },
  ],
  factories: [],
  modules: [],
  bootstrappers: [IpcServiceBootstrapper],
})
export class App extends BaseApp {
  public constructor() {
    super();

    this.build(
      withLogging(),
      withDependencyInjection((context) =>
        usingInversify(context).addOnActivationHandler((_, instance) => {
          const loggingContext = context as LoggingContext;

          const { name } = Object.getPrototypeOf(instance).constructor;
          loggingContext.log?.root.trace("Activating " + name);

          (instance as Record<string, unknown>).log =
            loggingContext.log?.root.createChild(name);

          return instance;
        })
      ),
      withModuleSupport((_) => ({
        rootModule: (App as unknown as Record<string, ModuleDefinition>)
          .module$,
      }))
    );

    this.main();
  }

  public async main(): Promise<void> {
    const containerContext = this.context as DependencyInjectionAppContext;

    try {
      for (const bootstrapper of containerContext.container!.getAll<Bootstrapper>(
        Bootstrapper
      )) {
        await bootstrapper.bootstrap();
      }
    } catch (error) {
      console.log("Could not bootstrap application", error);
    }

    this.render();
  }

  private render(): App {
    const containerContext = this.context as DependencyInjectionAppContext;

    const appContainer = document.getElementById("app");

    if (!appContainer) {
      throw new Error("Could not find #app container element in DOM.");
    }

    document.body.classList.add("dark");

    render(
      () => (
        <DependencyInjectionContext.Provider
          value={containerContext.container!}
        >
          <RibbonBar></RibbonBar>
          <TopBar></TopBar>
          <div class="d-flex column flex">
            <div class="d-flex flex">
              <SideBar></SideBar>
              <div class="d-flex flex"></div>
            </div>
          </div>
        </DependencyInjectionContext.Provider>
      ),
      appContainer
    );

    return this;
  }
}

new App();

