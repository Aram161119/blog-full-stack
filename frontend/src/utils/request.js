export const request = (url, method, body) => {
	return fetch(`/api/${url}`, {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		method: method || 'GET',
		body: body ? JSON.stringify(body) : undefined,
	}).then((res) => res.json());
};
