import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FC, useCallback } from 'react'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import MetaTags from '@/components/MetaTags'
import { useToggle } from '@/hooks/useToggle'
import { useAccount, useNetwork } from 'wagmi'
import raavePoster from '@images/raave-poster.png'
import SuccessModal from '@/components/SuccessModal'
import SubscribeModal from '@/components/SubscribeModal'
import WorldcoinIcon from '@/components/Icons/WorldcoinIcon'

const ConnectWallet = dynamic(() => import('@/components/ConnectWallet'), { ssr: false })
const RandFigs = dynamic(() => import('@/components/RandFigs'), { ssr: false })

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
		<div className="relative min-h-screen bg-no-repeat bg-cover bg-center bg-inverse">
			<MetaTags />
			<SubscribeModal modalState={subscribeModal} onSuccess={handleSuccess} />
			<SuccessModal modalState={successModal} />
			<RandFigs />
			<div
				className="text-primary font-sora relative h-full pb-4 pt-0"
				style={{ backgroundImage: "url('/images/bg.png')" }}
			>
				<div className="p-6 flex mb-4">
					<div className="flex-grow">
						<a href="/">
							<WorldcoinIcon className="w-8" />
						</a>
					</div>
					<div>
						<ConnectWallet />
					</div>
				</div>

				<div className="flex items-top justify-center sm:items-center">
					<div className="flex flex-col md:flex-row md:space-x-16">
						<div className="mx-auto md:mx-0 w-2/3 md:w-96 h-auto rounded-lg overflow-hidden mb-8">
							<Image src={raavePoster} placeholder="blur" alt="rAAVE Bogotá poster" />
						</div>
						<div className="mx-6 md:mx-0">
							<p className="text-primary font-sora text-sm text-center mb-8 md:text-left">
								👻 rAAVE x 🌱 Lens x 🪩 Worldcoin
							</p>
							<h1 className="text-5xl font-sora text-primary font-bold text-center md:text-left">
								rAAVE Bogotá 2022{' '}
								<div
									className="border text-stroke text-stroke-primary text-transparent"
									style={{
										WebkitTextStroke: '1px #C9E791',
										textShadow: '0px 0px 3px rgba(223, 245, 186, 0.32)',
									}}
								>
									human-only raffle
								</div>
							</h1>

							<div className="mt-8">
								<div className="flex justify-center md:justify-start">
									<img
										src="/images/raave-ticket.png"
										alt="We're giving away 5 rAAVE tickets"
										className="h-20"
									/>
								</div>
								<p className="mt-12">It&apos;s super easy to participate:</p>
								<ol className="list-decimal pl-8">
									<li className="pb-4 pt-4">
										<a
											target="_blank"
											rel="noreferrer"
											className="font-bold underline"
											href="https://human.withlens.app"
										>
											Verify your Lens profile
										</a>{' '}
										with World ID ✅{' '}
										<span className="text-muted">(if you haven&apos;t already)</span>
									</li>
									<li className="pb-4">Subscribe below 👇</li>
									<li className="pb-4">💃🕺 like there&apos;s no tomorrow</li>
								</ol>
							</div>
							<div className="mt-8">
								<ConnectWallet visibility="not_connected" buttonVariant="primary" />

								{isConnected && !chain.unsupported && (
									<Button onClick={() => subscribeModal.toggleOn()} variant="primary">
										Subscribe now
									</Button>
								)}
							</div>
							<div className="mt-8 text-center text-xs">
								5 random winners will be{' '}
								<a
									href="https://polygonscan.com/address/0x24bbdba114da81429d84752d9226b18d16fcbcc4"
									target="_blank"
									rel="noopener noreferrer"
									className=" underline"
								>
									selected automatically
								</a>{' '}
								the day of rAAVE.
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Home
