import Image from 'next/image'
import { FC, useCallback } from 'react'
import Button from '@/components/Button'
import MetaTags from '@/components/MetaTags'
import { useToggle } from '@/hooks/useToggle'
import { useAccount, useNetwork } from 'wagmi'
import raavePoster from '@images/raave-poster.jpeg'
import SuccessModal from '@/components/SuccessModal'
import ConnectWallet from '@/components/ConnectWallet'
import SubscribeModal from '@/components/SubscribeModal'

const Home: FC = () => {
	const { chain } = useNetwork()
	const successModal = useToggle()
	const subscribeModal = useToggle()
	const { isConnected } = useAccount()

	const handleSuccess = useCallback(() => {
		successModal.toggleOn()
		subscribeModal.toggleOff()
	}, [subscribeModal, successModal])

	return (
		<>
			<MetaTags />
			<SubscribeModal modalState={subscribeModal} onSuccess={handleSuccess} />
			<SuccessModal modalState={successModal} />
			<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
				<div className="absolute top-6 right-6">
					<ConnectWallet />
				</div>

				<div className="flex space-x-16">
					<Image
						width={250}
						height={320}
						src={raavePoster}
						placeholder="blur"
						alt="rAAVE Bogotá poster"
						className="rounded-lg mb-8"
					/>
					<div>
						<h1 className="text-4xl font-sora">
							rAAVE Bogotá 2022 <span className="font-bold">humans-only raffle</span>
						</h1>
						<p className="text-center text-neutral-300">By 👻 rAAVE x 🍃 Lens x 🪩 Worldcoin</p>
						<div className="mt-8">
							<p className="text-center">
								We&apos;re raffling <span className="text-3xl font-bold">5x rAAVE tix 🎟</span>
							</p>
							<p className="mt-12">It&apos;s super easy to participate:</p>
							<ol className="list-decimal pl-8">
								<li className="pb-4 pt-4">
									<a
										target="_blank"
										rel="noreferrer"
										className="text-indigo-400"
										href="https://human.withlens.app"
									>
										Verify
									</a>{' '}
									your Lens profile with Worldcoin (if you haven&apos;t already)
								</li>
								<li className="pb-4">Subscribe below 👇</li>
								<li className="pb-4">💃🕺 like there&apos;s no tomorrow</li>
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
			</div>
		</>
	)
}

export default Home
