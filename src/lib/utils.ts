export const routeIPFSToGateway = (url: string, gateway = 'https://lens.infura-ipfs.io/ipfs/'): string => {
	if (!url || url.startsWith('http')) return url

	return `${gateway}${url.slice(7)}`
}
