type OmittedRequestInit = Omit<RequestInit, 'method' | 'credentials'>;

const apiAddress = 'https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1';

export const api = {
	use: function (this: any, fetch: typeof window.fetch) {
		this.fetch = fetch;
		return {
			get: __get.bind(this, fetch),
			post: __post.bind(this, fetch),
			put: __put.bind(this, fetch)
		};
	}
};

const __get = (
	fetch: typeof window.fetch,
	path: string,
	init?: OmittedRequestInit
): Promise<Response> => {
	return fetch(
		endpoint(path),
		Object.assign(
			{
				method: 'get',
				credentials: 'include'
			},
			init
		) as RequestInit
	);
};

const __post = (
	fetch: typeof window.fetch,
	path: string,
	init?: OmittedRequestInit
): Promise<Response> => {
	return fetch(
		endpoint(path),
		Object.assign(
			{
				method: 'post',
				credentials: 'include'
			},
			init
		) as RequestInit
	);
};

const __put = (
	fetch: typeof window.fetch,
	path: string,
	init?: OmittedRequestInit
): Promise<Response> => {
	return fetch(
		endpoint(path),
		Object.assign(
			{
				method: 'put',
				credentials: 'include'
			},
			init
		) as RequestInit
	);
};

export const endpoint = (path: string) => {
	return apiAddress + path;
};
