import { IpcMainEvent } from 'electron/main';
import { NotFoundError } from '../errors/not-found.error';

export class ControllerBase {
  public path: string;
  public registeredPaths: any;

  public constructor(path: string) {
    this.path = path;
  }

  public async handleMessage(event: IpcMainEvent, message: any): Promise<void> {
    const [_, pathId] = message.path.split(':');
    if (!this.registeredPaths[pathId]) {
      throw new NotFoundError('Path not found');
    }
  }
}