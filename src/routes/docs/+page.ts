export const prerender = true;

export const load = () => {
	return new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 500 + 50)));
};
