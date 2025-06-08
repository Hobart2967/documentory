import { Container } from 'inversify';
import { FileSystemService } from '../services/file-system.service';
import { IconMappingService } from '../services/icon-mapping.service';
import { SidebarService } from '../services/side-bar.service';
import { JSXElement, createContext, useContext } from 'solid-js';
import { Type } from '../models/type';
import { TranslationService } from '../services/translation.service';
import { ComputerService } from '../services/computer.service';

const ContainerContext = createContext<Container>();

export function ContainerProvider(props: { children: JSXElement }) {
  const container = new Container();
  container
    .bind(FileSystemService)
    .toSelf()
    .inSingletonScope();
  container
    .bind(TranslationService)
    .toSelf()
    .inSingletonScope();
  container
    .bind(IconMappingService)
    .toSelf()
    .inSingletonScope();
  container
    .bind(ComputerService)
    .toSelf()
    .inSingletonScope();
  container
    .bind(SidebarService)
    .toSelf()
    .inSingletonScope();

  return <ContainerContext.Provider value={container}>
    {props.children}
  </ContainerContext.Provider>
}

export function useService<T>(service: Type<T>): T {
  return useContext(ContainerContext).get(service);
}