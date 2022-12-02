type OmittedRequestInit = Omit<RequestInit, 'method'>;

const endpoint = 'https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1';

const makeEndpointUrl = (path: string) => {
	return `${endpoint}${path}`;
}

export const get = (path: string, init?: OmittedRequestInit) => {
	return fetch(makeEndpointUrl(path), Object.assign({
		method: 'get',
	}, init));
}

export const post = (path: string, init?: OmittedRequestInit) => {
	return fetch(makeEndpointUrl(path), Object.assign({
		method: 'post',
	}, init))
}
