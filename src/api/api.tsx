export const api = {
	randomBird: (): Promise<{ response: Response }> => {
		return fetch('http://localhost:8080/random')
			.then(response => response.json());
	}
};