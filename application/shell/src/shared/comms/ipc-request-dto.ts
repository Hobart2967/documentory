export interface IpcRequestDto<T> {
	requestId: string;
	body: T;
}