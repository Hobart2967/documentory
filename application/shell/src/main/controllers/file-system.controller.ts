import { ControllerRequest } from '../../app/models/controller-request';
import { ControllerBase } from './controller-base';
import { dialog } from 'electron';

import fs from 'fs';

export class FileSystemController extends ControllerBase {
	public constructor() {
		super('fs');

		this.registeredPaths.push(
			['getItems', request => this.getItems(request)],
			['chooseDirectory', request => this.chooseDirectory(request)],
		)
	}

	public async getItems(request: ControllerRequest): Promise<unknown> {
		const { body: path } = request.body;
		if (!fs.existsSync(path)) {
			throw new Error(`Path does not exist: ${path}`);
		}

		return fs.readdirSync(path);
	}

	public async chooseDirectory(request: ControllerRequest): Promise<string | undefined> {
		console.log('Choosing directory...');
		const result = await dialog.showOpenDialog({
			properties: ['openDirectory', 'createDirectory'],
		});

		if (result.canceled) {
			return undefined;
		}

		return result.filePaths[0];
	}
}