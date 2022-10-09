import ProfileCard from '@/components/ProfileCard'
import useProfiles from '@/hooks/useProfiles'
import { useToggle } from '@/hooks/useToggle'
import { FC, memo, useState } from 'react'
import Button from './Button'
import Modal from './Modal'

type Props = {
	modalState: ReturnType<typeof useToggle>
	onSuccess: () => void
}

const SubscribeModal: FC<Props> = ({ modalState, onSuccess }) => {
	const { profiles, loading } = useProfiles()
	const profileToSubscribe = profiles?.find(profile => profile.onChainIdentity.worldcoin.isHuman)
	const [subscribing, setSubscribing] = useState(false)

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
								<Button onClick={onSuccess} loading={subscribing}>
									Subscribe to raffle
								</Button>
							</div>
						) : (
							<div className="mt-8 text-center">
								<p>Looks like you don't have a verified Lens profile yet, fren</p>
								<div className="mt-4">
									<a href="https://human.withlens.app" target="_blank" rel="noopener">
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
