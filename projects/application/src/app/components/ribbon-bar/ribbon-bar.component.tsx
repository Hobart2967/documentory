import { RibbonBarButton } from './ribbon-bar-button.component';
import './ribbon-bar.component.scss';

export function RibbonBar() {
  return <div class="ribbon-bar ctrl-bg-primary ph-16 pv-8 g-8 d-flex">
    <RibbonBarButton icon='fa-circle-plus'>New</RibbonBarButton>
    <div class="ribbon-bar__separator"></div>
    <RibbonBarButton icon='fa-scissors'></RibbonBarButton>
    <RibbonBarButton icon='fa-copy'></RibbonBarButton>
    <RibbonBarButton icon='fa-paste'></RibbonBarButton>
  </div>;
}