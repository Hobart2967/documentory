import { For, createResource, createSignal } from 'solid-js';
import { TreeNode } from '../tree-node/tree-node.component';
import { SidebarService } from '../../services/side-bar.service';
import { useDependency } from '@codewyre/wyrekit-composition-solid';
import { IpcService } from '../../services/ipc.service';
import { FileSystemService } from '../../services/file-system.service';

export function SideBar() {
  const sidebarService = useDependency<SidebarService>(SidebarService);
  const fileSystemService = useDependency<FileSystemService>(FileSystemService);
  const [width, setWidth] = createSignal(20);

  const [treeItems] = createResource(() => {
    try {
      return sidebarService.getRootItems()
    } catch {
      return [];
    }
	});

	async function requestFiles() {
		const result = await fileSystemService.getPathItems("/mnt/c/Users/marco/OneDrive/Dokumente");
		console.log(result);
	}

  return <div
    class="side-bar ctrl-bg-secondary flex pv-16"
    style={{'max-width': width() + '%'}}>
    <For each={treeItems()}>
      {item => <TreeNode
        title={item.label}
        icon={item.icon}></TreeNode>}
    </For>

    <button onClick={() => requestFiles()}>Send message</button>
  </div>
}