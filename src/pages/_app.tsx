import '@/styles/styles.css'
import client from '@/lib/apollo'
import { ApolloProvider } from '@apollo/client'
import Web3Provider from '@/components/Web3Provider'

const App = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Web3Provider>
				<Component {...pageProps} />
			</Web3Provider>
		</ApolloProvider>
	)
}

export default App
