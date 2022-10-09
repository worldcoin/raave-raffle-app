import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FC, useCallback } from 'react'
import Button from '@/components/Button'
import MetaTags from '@/components/MetaTags'
import { useToggle } from '@/hooks/useToggle'
import { useAccount, useNetwork } from 'wagmi'
import raavePoster from '@images/raave-poster.jpeg'
import SuccessModal from '@/components/SuccessModal'
import SubscribeModal from '@/components/SubscribeModal'
const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'), { ssr: false })

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
			<div className="relative flex items-top justify-center min-h-screen bg-lime-100 sm:items-center pt-24 pb-10 sm:pt-0">
				<div className="absolute top-6 right-6">
					<ConnectWallet />
				</div>

				<div className="flex flex-col md:flex-row md:space-x-16">
					<div className="mx-auto md:mx-0 w-2/3 md:w-96 h-auto rounded-lg overflow-hidden mb-8">
						<Image src={raavePoster} placeholder="blur" alt="rAAVE Bogotá poster" />
					</div>
					<div className="mx-6 md:mx-0">
						<h1 className="text-4xl font-sora text-green-900 text-center">
							rAAVE Bogotá 2022 <span className="font-medium text-green-700">human-only raffle</span>
						</h1>
						<p className="text-center text-green-900/70">By 👻 rAAVE x 🌱 Lens x 🪩 Worldcoin</p>
						<div className="mt-8">
							<p className="text-center text-green-900/80">
								We&apos;re giving away <span className="text-3xl font-bold">5 rAAVE tix 🎟</span>
							</p>
							<p className="mt-12 text-green-900/80">It&apos;s super easy to participate:</p>
							<ol className="list-decimal pl-8 text-green-900/80">
								<li className="pb-4 pt-4">
									<a
										target="_blank"
										rel="noreferrer"
										className="text-green-500 underline"
										href="https://human.withlens.app"
									>
										Verify
									</a>{' '}
									your Lens profile with World ID (if you haven&apos;t already)
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
