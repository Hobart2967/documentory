import 'reflect-metadata';

import { render } from 'solid-js/web';

import './index.scss';

import { RibbonBar } from './components/ribbon-bar/ribbon-bar.component';
import { TreeNode } from './components/tree-node/tree-node.component';
import { TopBar } from './components/top-bar/top-bar.component';
import { SideBar } from './components/side-bar/side-bar.component';
import { ContainerProvider } from './configuration/container';

export function App() {
  document.body.classList.add('dark');

  return <>
    <RibbonBar></RibbonBar>
    <TopBar></TopBar>
    <div class="d-flex column flex">
      <div class="d-flex flex">
        <SideBar></SideBar>
        <div class="d-flex flex">

        </div>
      </div>
    </div>
  </>;
}

render(() => <ContainerProvider>
  <App />
</ContainerProvider>, document.body);