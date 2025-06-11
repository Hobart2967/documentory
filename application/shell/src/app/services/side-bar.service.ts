import { inject } from 'inversify';
import { TreeItemType } from '../models/tree-item-type.enum';
import { TreeItem } from '../models/tree-item.model';
import { IconMappingService } from './icon-mapping.service';
import { TranslationService } from './translation.service';

export class SidebarService {
  public constructor(
    @inject(TranslationService)
    private readonly _translationService: TranslationService,

    @inject(IconMappingService)
    private readonly _iconMapper: IconMappingService) { }

  public async getRootItems(): Promise<TreeItem[]> {
    return [{
      type: TreeItemType.QuickAccessRoot,
      label: this._translationService.translate('QuickAccess'),
      icon: this._iconMapper.mapIconFromType(TreeItemType.QuickAccessRoot)
    }, {
      type: TreeItemType.ComputerRoot,
      label: this._translationService.translate('Computer'),
      icon: this._iconMapper.mapIconFromType(TreeItemType.ComputerRoot)
    }, {
      type: TreeItemType.NetworkRoot,
      label: this._translationService.translate('Network'),
      icon: this._iconMapper.mapIconFromType(TreeItemType.NetworkRoot)
    }];
  }
}