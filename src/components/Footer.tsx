import { ExternalLinkIcon } from '@heroicons/react/outline'

const Footer = () => {
	return (
		<div className="text-white flex bg-footer px-8 py-6 font-sora text-sm shadow-md">
			<div className="flex-grow hidden md:block">👻 rAAVE x 🌱 Lens x 🪩 Worldcoin</div>
			<div className="grid gap-8 md:grid-flow-col">
				<a
					className="grid grid-flow-col gap-1 hover:text-white/70 transition-all duration-200"
					href="https://twitter.com/letsraave"
					target="_blank"
					rel="noopener noreferrer"
				>
					👻 Learn about rAAVE <ExternalLinkIcon className="h-4" />
				</a>
				<a
					className="grid grid-flow-col gap-1 hover:text-white/70 transition-all duration-200"
					href="https://lens.xyz"
					target="_blank"
					rel="noopener"
				>
					🌱 Learn about Lens <ExternalLinkIcon className="h-4" />
				</a>
				<a
					className="grid grid-flow-col gap-1 hover:text-white/70 transition-all duration-200"
					href="https://id.worldcoin.org"
					target="_blank"
					rel="noopener"
				>
					🪩 Learn about Worldcoin <ExternalLinkIcon className="h-4" />
				</a>
			</div>
		</div>
	)
}

export default Footer
