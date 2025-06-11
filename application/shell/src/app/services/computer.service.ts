import * as nodeDiskInfo from 'node-disk-info';
import { injectable } from 'inversify';
import { TreeItem } from '../models/tree-item.model';

export class ComputerService {
  public constructor() {

  }

  public async getDisks(): Promise<TreeItem[]> {

    return [];
  }
}