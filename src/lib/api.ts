const apiAddress = 'https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1';

export const endpoint = (path: string) => {
	return apiAddress + path;
}
