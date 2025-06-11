import { useDependency } from '@codewyre/wyrekit-composition-solid';
import { RibbonBarButton } from './ribbon-bar-button.component';
import './ribbon-bar.component.scss';
import { FileSystemService } from '../../services/file-system.service';

export function RibbonBar() {
	const fileSystemService =
    useDependency<FileSystemService>(FileSystemService);
	function openVault() {
		const dirname = fileSystemService.chooseDirectory();
	}

  return <div class="ribbon-bar ctrl-bg-primary ph-16 pv-8 g-8 d-flex">
		<RibbonBarButton icon='fa-circle-plus' onClick={() => openVault()}>Open</RibbonBarButton>
    <div class="ribbon-bar__separator"></div>
    <RibbonBarButton icon='fa-scissors'></RibbonBarButton>
    <RibbonBarButton icon='fa-copy'></RibbonBarButton>
    <RibbonBarButton icon='fa-paste'></RibbonBarButton>
  </div>;
}