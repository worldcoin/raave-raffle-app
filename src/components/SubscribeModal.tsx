import Modal from './Modal'
import Button from './Button'
import { useToggle } from '@/hooks/useToggle'
import useProfiles from '@/hooks/useProfiles'
import WorldcoinLogo from './Icons/WorldcoinLogo'
import ProfileCard from '@/components/ProfileCard'
import LensHumanRaffle from '@/abi/LensHumanRaffle.abi.json'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

type Props = {
	modalState: ReturnType<typeof useToggle>
	onSuccess: () => void
}

const SubscribeModal: FC<Props> = ({ modalState, onSuccess }) => {
	const { profiles, loading } = useProfiles()
	const profileToSubscribe = profiles?.find(profile => profile.onChainIdentity.worldcoin.isHuman)
	const [subscribing, setSubscribing] = useState(false)

	const { data, status } = useContractRead({
		functionName: 'isParticipating',
		args: [profileToSubscribe?.id],
		enabled: !!profileToSubscribe,
		contractInterface: LensHumanRaffle,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	})

	const hasEntered = useMemo<boolean>(() => status == 'success' && (data as unknown as boolean), [status, data])

	const { config } = usePrepareContractWrite({
		functionName: 'enter',
		enabled: !!profileToSubscribe,
		args: [profileToSubscribe?.id],
		contractInterface: LensHumanRaffle,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	})

	const { write } = useContractWrite({ ...config, onSuccess })

	const requestEntry = useCallback(() => {
		write()
		setSubscribing(true)
	}, [write])

	return (
		<Modal modalState={modalState}>
			<div className="relative py-4 sm:pt-0">
				<div className="flex items-center mb-2 space-x- relative justify-center md:justify-end">
					<div className="md:absolute md:-top-20 md:-left-20">
						<img src="/images/raave-ticket.png" className="h-14 md:h-24 mb-4 sm:mb-0" />
					</div>
					<WorldcoinLogo className="hidden sm:block mb-2" />
				</div>

				<div className="border-b border-white/20 mb-6 -ml-8 -mr-8" />

				<h2 className="text-2xl text-primary font-bold text-center">Let&apos;s get you that ticket!</h2>

				<p className="text-center mb-4">You'll join the raffle with your Lens profile below</p>

				<div className="border-b border-white/20 mb-6" />

				{loading ? (
					<div className="flex justify-center text-lg">Loading 👻 🍃 🪩...</div>
				) : (
					<>
						<div className="grid w-100 max-w-full">
							<div className="rounded-xl border border-white/20 overflow-clip divide-y">
								{profileToSubscribe ? (
									<ProfileCard key={profileToSubscribe.id} profile={profileToSubscribe} verified />
								) : (
									profiles?.map(profile => (
										<ProfileCard
											key={profile.id}
											profile={profile}
											verified={profile.onChainIdentity.worldcoin.isHuman}
										/>
									))
								)}
							</div>
						</div>

						{hasEntered ? null : profileToSubscribe ? (
							<div className="mt-8 flex justify-center">
								<Button onClick={requestEntry} loading={subscribing} variant="primary">
									Subscribe to raffle
								</Button>
							</div>
						) : (
							<div className="mt-8 text-center">
								<p className="text-amber-500">
									Looks like you don&apos;t have a verified Lens profile yet, fren 😢
								</p>
								<div className="mt-4">
									<a href="https://human.withlens.app" target="_blank" rel="noopener noreferrer">
										<Button variant="primary">Verify my profile now</Button>
									</a>
								</div>
								<div className="mt-4">
									<a
										href="https://twitter.com/worldcoin"
										target="_blank"
										rel="noopener noreferrer"
										className="text-neutral-300 underline"
									>
										Where can I find an orb? 🪩
									</a>
								</div>
							</div>
						)}
					</>
				)}
				<div></div>
			</div>
		</Modal>
	)
}

export default memo(SubscribeModal)
