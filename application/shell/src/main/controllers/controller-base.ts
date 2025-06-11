import { IpcMainEvent } from 'electron/main';
import { NotFoundError } from '../errors/not-found.error';
import { ControllerRequest } from '../../app/models/controller-request';

export class ControllerBase {
  public path: string;
  public registeredPaths: Array<[string, (request: ControllerRequest) => Promise<unknown>]> = [];

  public constructor(path: string) {
    this.path = path;
  }

  public async handleMessage(___: IpcMainEvent, message: any): Promise<unknown> {
		const [_, pathId] = message.body.path.split(':');

		//Object.getPrototypeOf(this)[pathId];
		const controllerMapping = this.registeredPaths.find(([registeredId]) => registeredId === pathId);
    if (!controllerMapping) {
			throw new NotFoundError(`Controller path not found: ${pathId}, known paths: ${JSON.stringify(this.registeredPaths.map(([id]) => id))}`)
		}

		const [__, handler] = controllerMapping;

		return handler(message);
  }
}