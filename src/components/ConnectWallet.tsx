import { FC } from 'react'
import { ConnectKitButton } from 'connectkit'
import { chain, useSwitchNetwork } from 'wagmi'
import Button, { ButtonVariants } from './Button'
import { ChevronRightIcon } from '@heroicons/react/outline'

type Visibility = 'always' | 'connected' | 'not_connected'

const ConnectWallet: FC<{ visibility?: Visibility; buttonVariant?: ButtonVariants }> = ({
	visibility = 'always',
	buttonVariant = 'default',
}) => {
	const { switchNetwork } = useSwitchNetwork()

	return (
		<ConnectKitButton.Custom>
			{({ show, isConnected, unsupported }) => {
				if (
					(visibility == 'connected' && !isConnected) ||
					(visibility == 'not_connected' && isConnected && !unsupported)
				) {
					return
				}

				if (isConnected && !unsupported) {
					return <ConnectKitButton />
				}

				if (unsupported) {
					return (
						<Button
							className="flex gap-x-4 items-center"
							onClick={() => switchNetwork(chain.polygon.id)}
							variant={buttonVariant}
						>
							Switch to Polygon <ChevronRightIcon className="h-4 w-4" />
						</Button>
					)
				}

				return (
					<Button onClick={show} variant={buttonVariant}>
						Connect wallet
					</Button>
				)
			}}
		</ConnectKitButton.Custom>
	)
}

export default ConnectWallet
