import '@/styles/styles.css'
import posthog from 'posthog-js'
import { useEffect } from 'react'
import client from '@/lib/apollo'
import { ApolloProvider } from '@apollo/client'
import { usePostHog } from '@/hooks/usePostHog'
import Web3Provider from '@/components/Web3Provider'

const App = ({ Component, pageProps }) => {
	usePostHog()
	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY
		if (apiKey) {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
				autocapture: true,
				debug: process.env.NODE_ENV === 'development',
				persistence: 'localStorage',
				loaded: posthog => {
					posthog.register({ env: process.env.NODE_ENV })
				},
			})
			posthog.register({ app: 'world-id-raave-raffle' })
		}
	}, [])

	return (
		<ApolloProvider client={client}>
			<Web3Provider>
				<Component {...pageProps} />
			</Web3Provider>
		</ApolloProvider>
	)
}

export default App
