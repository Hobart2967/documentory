import { IpcMainEvent } from 'electron/main';
import { ControllerBase } from '../controllers/controller-base';
import { multiInject } from 'inversify';

export class CommunicationService {
  public registeredControllers: ControllerBase[] = [];

  public constructor(@multiInject(ControllerBase) controllers: ControllerBase[]) {
		this.registeredControllers = controllers;
  }

  public async receiveMessage(event: IpcMainEvent, args: any[]): Promise<void> {
		const [message] = args;

		console.log('Received message:', message);

    for (const controller of this.registeredControllers) {
			if (!message.body.path.startsWith(controller.path)) {
				continue;
			}

			try {
				const result = await controller.handleMessage(event, message);
				console.log('Response from controller:', result);

				event.sender.send('response', {
					requestId: message.requestId,
					body: result,
				});
			} catch (error) {
				event.sender.send('response', { error: error.message });
			}
    }
  }
}