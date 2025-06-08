import { IpcMainEvent } from 'electron/main';
import { ControllerBase } from '../controllers/controller-base';

export class CommunicationService {
  public registeredControllers: ControllerBase[] = [];

  public constructor() {

  }

  public registerController(controller: any): void {
    this.registeredControllers.push(controller);
  }

  public async receiveMessage(event: IpcMainEvent, args: any[]): Promise<void> {
    const [message] = args;

    for (const controller of this.registeredControllers) {
      if (message.path.startsWith(controller.path)) {
        await controller.handleMessage(event, message);
      }
    }
  }
}