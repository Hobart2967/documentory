
import 'reflect-metadata';
import '@codewyre/wyrekit-runtime-composition';
import '@codewyre/wyrekit-diagnostics';

import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path';
import { CommunicationService } from './services/communication.service';

import { Bootstrapper, ModuleDefinition, module } from '@codewyre/wyrekit-composition';
import {
	withDependencyInjection,
	withLogging,
	withModuleSupport,
	type DependencyInjectionContext as DependencyInjectionAppContext,
	type LoggingContext
} from '@codewyre/wyrekit-runtime-composition';
import { BaseApp } from '@codewyre/wyrekit-runtime';
import { usingInversify } from '@codewyre/wyrekit-runtime-composition-inversify';
import { FileSystemService } from '../app/services/file-system.service';
import { FileSystemController } from './controllers/file-system.controller';
import { ControllerBase } from './controllers/controller-base';

@module({
	services: [
		CommunicationService,
		FileSystemService,
	],
	aliases: [
		{
			use: FileSystemController,
			withAlias: ControllerBase
		}
	],
	constantValues: [
	],
	factories: [
	],
	modules: [
	],
	bootstrappers: [
	]
})
export class App extends BaseApp {
	public constructor() {
		super();

		this
			.build(
				withLogging(),
				withDependencyInjection(context =>
					usingInversify(context)
						.addOnActivationHandler((_, instance) => {
							const loggingContext = context as LoggingContext;

							const { name } = Object.getPrototypeOf(instance).constructor;
							loggingContext.log?.root.trace('Activating ' + name);

							(instance as Record<string, unknown>).log = loggingContext.log?.root.createChild(name);

							return instance;
						})),
				withModuleSupport(_ => ({
					rootModule: (App as unknown as Record<string, ModuleDefinition>).module$
				})));

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
			console.log('Could not bootstrap application', error);
		}


		this.render();
	}

	private async render(): Promise<App> {
		await app.whenReady();

		const win = new BrowserWindow({
			title: 'Main window',
			width: 1280,
			height: 720,
			backgroundColor: '#222220', // TODO: Make this dependent on System theme.,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js')
			}
		});

		const containerContext = this.context as DependencyInjectionAppContext;

		ipcMain.on('request', (event, ...args) => {
			const communicationService = containerContext.container?.get<CommunicationService>(CommunicationService)!;
			communicationService.receiveMessage(event, args);
		});

		// You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
		if (process.env.VITE_DEV_SERVER_URL) {
			win.loadURL(process.env.VITE_DEV_SERVER_URL)
		} else {
			// Load your file
			win.loadFile('dist/index.html');
		}

		return this;
	}
}

new App();