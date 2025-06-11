import { TreeItemType } from '../models/tree-item-type.enum'
import { TreeItem } from '../models/tree-item.model';
import { Icon } from '../models/icon.model';

export class IconMappingService {
  private readonly _treeItemTypeMappings = new Map<TreeItemType, Icon>([
    [TreeItemType.QuickAccessRoot, {
      class: 'fa-solid fa-star',
      color: '#ffb700'
    }],
    [TreeItemType.ComputerRoot, {
      class: 'fa-solid fa-house-laptop',
      color: '#5fb5ff'
    }],
    [TreeItemType.NetworkRoot, {
      class: 'fa-solid fa-network-wired',
      color: '#5fb5ff'
    }]
  ]);

  public mapIcon(item: TreeItem): Icon {
    const icon = this.mapIconFromType(item.type);
    if (icon) {
      return icon;
    }

    throw new Error('Not implemented');
  }

  public mapIconFromType(type: TreeItemType): Icon {
    if (this._treeItemTypeMappings.has(type)) {
      return this._treeItemTypeMappings.get(type);
    }
  }

}