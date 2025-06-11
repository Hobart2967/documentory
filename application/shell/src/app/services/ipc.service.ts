import { ConstantValue, inject } from '@codewyre/wyrekit-composition';
import { filter, firstValueFrom, ReplaySubject, take } from 'rxjs';
import { ControllerRequest } from '../models/controller-request';
import { IpcRequestDto } from '../../shared/comms/ipc-request-dto';

export class IpcChannelProvider {
	public readonly ipcChannel!: {
		sendMessage: <T>(message: IpcRequestDto<T>) => void;
		onMessage: <T>(callback: (event: unknown, message: IpcRequestDto<T>) => void) => void;
	}
}

export class IpcService {
	private readonly messagePipeline$: ReplaySubject<IpcRequestDto<unknown>> = new ReplaySubject<IpcRequestDto<unknown>>();
	public readonly messagePipeline = this.messagePipeline$.asObservable();

	public constructor(@inject(IpcChannelProvider) private readonly ipcChannelProvider: ConstantValue<IpcChannelProvider>) { }

	public sendMessage(message: ControllerRequest) {
		const { instance: provider } = this.ipcChannelProvider;
		const { ipcChannel } = provider;

		ipcChannel.sendMessage({
			requestId: crypto.randomUUID(),
			body: message
		});
	}

	public async sendRequest<T, TResponse>(message: T): Promise<IpcRequestDto<TResponse>> {
		const { instance: provider } = this.ipcChannelProvider;
		const { ipcChannel } = provider;

		const requestId = crypto.randomUUID();
		const response = firstValueFrom(this.messagePipeline$.pipe(
			filter(x => x.requestId === requestId),
			take(1)
		));

		ipcChannel.sendMessage({
			requestId,
			body: message
		});

		return response as unknown as IpcRequestDto<TResponse>;
	}

	public onMessage<T>(message: IpcRequestDto<T>) {
		this.messagePipeline$.next(message);
	}
}