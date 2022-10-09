import { APP_NAME } from '@/lib/consts'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		appName: APP_NAME,
		autoConnect: true,
		chains: [chain.polygon],
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	})
)

const Web3Provider = ({ children }) => {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider
				theme="auto"
				mode="light"
				customTheme={{
					'--ck-accent-color': '#22c55e',
					'--ck-accent-text-color': '#EFFCD0',
					'--ck-connectbutton-background': '#EFFCD0',
				}}
			>
				{children}
			</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
