import { Icon } from './icon.model';
import { TreeItemType } from './tree-item-type.enum';

export interface TreeItem {
  data?: any;
  type: TreeItemType;
  icon: Icon;
  label: string;
}