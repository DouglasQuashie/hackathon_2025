import { ContentfulStatusCode } from 'hono/utils/http-status';

export type UseCaseResponseSuccess<T> = {
	isSuccess: true;
	status: ContentfulStatusCode;
	data: T;
};
export type UseCaseResponseError = {
	isSuccess: false;
	status: ContentfulStatusCode;
	message: string;
};

export type UseCaseResponse<T> =
	| UseCaseResponseSuccess<T>
	| UseCaseResponseError;


export const UseCaseResponseBuilder = {
	success: <T>(status: ContentfulStatusCode, data: T): UseCaseResponse<T> => ({
		isSuccess: true,
		status,
		data
	}),
	error: <T>(status: ContentfulStatusCode, message: string): UseCaseResponse<T> => ({
		isSuccess: false,
		status,
		message
	})
};

export type InputFactory<TData, TDeps> = {
	data: TData;
	dependencies: TDeps;
};

export type OutputFactory<T> = UseCaseResponse<T>;

export type UseCase<Input extends { data: unknown; dependencies: unknown }, Output> = (
	dependencies: Input['dependencies']
) => {
	execute(data: Input['data']): Promise<Output>;
};
