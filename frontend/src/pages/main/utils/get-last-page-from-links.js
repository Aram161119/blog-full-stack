export const getLastPageFromLinks = (links) => {
	if (!links) return 1;

	const lastPageMatch = links.match(/&?_page=(\d+)&?_limit=\d+>; rel="last"/);
	return lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
};
