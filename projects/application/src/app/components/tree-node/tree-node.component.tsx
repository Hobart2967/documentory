import { JSXElement, Show } from 'solid-js';

import './tree-node.component.scss';
import { Icon } from '../../models/icon.model';

export interface TreeNodeProps {
  title: string;
  icon?: Icon;
  children?: JSXElement;
}

export function TreeNode(props: TreeNodeProps) {
  return <div class="tree-node d-flex column pv-4 g-8">
    <div class="tree-node__title d-flex g-4 pv-4 ph-16">
      <i class="fa-solid fa-chevron-down"></i>
      <div class="icon">
        <i
          class={props.icon.class}
          style={{
            'color': props.icon.color
          }}></i>
      </div>
      <div class="label">{props.title}</div>
    </div>
    <Show when={props.children}>
      <div class="tree-node__children p-8">
        {props.children}
      </div>
    </Show>
  </div>
}