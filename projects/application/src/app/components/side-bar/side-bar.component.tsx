import { For, createResource, createSignal } from 'solid-js';
import { TreeNode } from '../tree-node/tree-node.component';
import { useService } from './../../configuration/container';
import { SidebarService } from '../../services/side-bar.service';

export function SideBar() {
  const sidebarService = useService(SidebarService);
  const [width, setWidth] = createSignal(20);

  const [treeItems] = createResource(() => sidebarService.getRootItems());

  return <div
    class="side-bar ctrl-bg-secondary flex pv-16"
    style={{'max-width': width() + '%'}}>
    <For each={treeItems()}>
      {item => <TreeNode
        title={item.label}
        icon={item.icon}></TreeNode>}
    </For>
  </div>
}