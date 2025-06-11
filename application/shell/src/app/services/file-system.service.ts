import { injectable } from 'inversify';
import { TreeItem } from '../models/tree-item.model';
import { inject } from '@codewyre/wyrekit-composition';
import { IpcService } from './ipc.service';

export class FileSystemService {
	public constructor(
		@inject(IpcService)
		private readonly ipcService: IpcService
	) { }

  public async getPathItems(path: string): Promise<TreeItem[]> {
		const response = await this.ipcService.sendRequest({
			path: 'fs:getItems',
			body: path
		});

		console.log(response);
		return response.body as TreeItem[];
	}

	public async chooseDirectory(): Promise<string | undefined> {
		const response = await this.ipcService.sendRequest({
			path: 'fs:chooseDirectory',
			body: null
		});

		console.log(response);
		return response.body as string;
	}
}