import Modal from './Modal'
import Button from './Button'
import { useToggle } from '@/hooks/useToggle'
import useProfiles from '@/hooks/useProfiles'
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
				<h2 className="mb-8 text-2xl text-center font-bold">Enter the raffle to win a rAAVE tix 🎟</h2>

				{loading ? (
					<div className="flex justify-center text-lg">Loading 👻 🍃 🪩...</div>
				) : (
					<>
						<div className="grid w-100 max-w-full">
							<div className="rounded-xl border border-slate-700 overflow-clip divide-y divide-slate-700">
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

						{profileToSubscribe ? (
							<div className="mt-8 flex justify-center">
								<Button onClick={requestEntry} loading={subscribing} disabled={hasEntered}>
									{hasEntered ? 'Already participating!' : 'Subscribe to raffle'}
								</Button>
							</div>
						) : (
							<div className="mt-8 text-center">
								<p>Looks like you don&apos;t have a verified Lens profile yet, fren 😢</p>
								<div className="mt-4">
									<a href="https://human.withlens.app" target="_blank" rel="noopener noreferrer">
										<Button>Verify my profile now ➡️</Button>
									</a>
								</div>
								<div className="mt-4">
									<a
										href="https://twitter.com/worldcoin"
										target="_blank"
										rel="noopener noreferrer"
										className="text-neutral-300"
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
