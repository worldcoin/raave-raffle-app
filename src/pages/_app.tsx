import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Web3Provider from '@/components/Web3Provider'
import client from '@/lib/apollo'
import { ApolloProvider } from '@apollo/client'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<ApolloProvider client={client}>
				<Web3Provider>
					<Component {...pageProps} />
				</Web3Provider>
			</ApolloProvider>
		</ThemeProvider>
	)
}

export default App
