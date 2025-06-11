import { JSXElement, Show } from 'solid-js';

import './ribbon-bar-button.component.scss';

export interface RibbonBarButtonProps {
  icon: string;
  iconType?: string;
	children?: JSXElement;
	onClick?: () => void;
}
export function RibbonBarButton(props: RibbonBarButtonProps) {
  return <div class="ribbon-bar__button" onClick={props.onClick}>
      <i class={"ribbon-bar__button__icon fa-" + (props.iconType || 'solid') + " " + props.icon}></i>
      <Show when={props.children}>
        <div class="content">
          {props.children}
        </div>
      </Show>
    </div>;
}