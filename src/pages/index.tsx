import { FC, Suspense, useCallback, useEffect } from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import SubscribeModal from '@/components/SubscribeModal'
import { useToggle } from '@/hooks/useToggle'
import SuccessModal from '@/components/SuccessModal'
import { useAccount, useNetwork } from 'wagmi'
import Button from '@/components/Button'

const Home: FC = () => {
	const { chain } = useNetwork()
	const { isConnected, address } = useAccount()
	const subscribeModal = useToggle()
	const successModal = useToggle()

	const handleSuccess = useCallback(() => {
		subscribeModal.toggleOff()
		successModal.toggleOn()
	}, [])

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>

			<div className="flex">
				<div className="mr-16">
					<img src="/images/raave-poster.jpeg" alt="" className="h-80 rounded-lg ml-auto mr-auto mb-8" />
				</div>
				<div>
					<h1 className="text-4xl font-sora">
						rAAVE Bogotá 2022 <span className="font-bold">humans-only raffle</span>
					</h1>
					<p className="text-center text-neutral-300">By 👻 rAAVE x 🍃 Lens x 🪩 Worldcoin</p>
					<div className="mt-8">
						<p className="text-center">
							We're raffling <span className="text-3xl font-bold">5x rAAVE tix 🎟</span>
						</p>
						<p className="mt-12">It's super easy to participate:</p>
						<ol className="list-decimal pl-8">
							<li className="pb-4 pt-4">
								<a href="https://human.withlens.app" target="_blank" className="text-indigo-400">
									Verify
								</a>{' '}
								your Lens profile with Worldcoin (if you haven't already)
							</li>
							<li className="pb-4">Subscribe below 👇</li>
							<li className="pb-4">💃🕺 like there's no tomorrow</li>
						</ol>
					</div>
					<div className="mt-8 flex justify-center">
						<ConnectWallet visibility="not_connected" />

						{isConnected && !chain.unsupported && (
							<Button onClick={() => subscribeModal.toggleOn()}>Subscribe now</Button>
						)}
					</div>
				</div>
			</div>

			<SubscribeModal modalState={subscribeModal} onSuccess={handleSuccess} />
			<SuccessModal modalState={successModal} />
		</div>
	)
}

export default Home
