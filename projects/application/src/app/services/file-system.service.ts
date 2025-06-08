import { injectable } from 'inversify';
import { TreeItem } from './../models/tree-item.model';

@injectable()
export class FileSystemService {
  public async getPathItems(path: string): Promise<TreeItem[]> {

  }
}