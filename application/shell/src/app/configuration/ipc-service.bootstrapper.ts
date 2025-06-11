import { Bootstrapper, ConstantValue, inject } from '@codewyre/wyrekit-composition';
import { ReplaySubject } from 'rxjs';
import { IpcChannelProvider, IpcService, MessageRequest } from '../services/ipc.service';


export class IpcServiceBootstrapper extends Bootstrapper {
	private readonly messagePipeline$: ReplaySubject<MessageRequest<unknown>> = new ReplaySubject<MessageRequest<unknown>>();
	public readonly messagePipeline = this.messagePipeline$.asObservable();

	public constructor(
		@inject(IpcService)
		private readonly ipcService: IpcService,

		@inject(IpcChannelProvider)
		private readonly ipcChannelProvider: ConstantValue<IpcChannelProvider>) {
		super();
	}

	public bootstrap(): Promise<void> {
		this.ipcChannelProvider.instance.ipcChannel.onMessage((_, message) =>
			this.ipcService.onMessage(message));

		return Promise.resolve();
	}
}
