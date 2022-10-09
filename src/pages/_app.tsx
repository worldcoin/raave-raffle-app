import client from '@/lib/apollo'
import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { ApolloProvider } from '@apollo/client'
import Web3Provider from '@/components/Web3Provider'

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
