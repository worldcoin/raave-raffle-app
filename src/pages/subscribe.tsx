import ConnectWallet from '@/components/ConnectWallet'
import ProfileCard from '@/components/ProfileCard'
import useProfiles from '@/hooks/useProfiles'
import { useToggle } from '@/hooks/useToggle'
import { FC } from 'react'

type Props = {
	modalState: ReturnType<typeof useToggle>
}

const Subscribe: FC = () => {
	const { profiles } = useProfiles()
	const profileToSubscribe = profiles?.find(profile => profile.onChainIdentity.worldcoin.isHuman)
	return (
		<div className="relative flex items-top justify-center min-h-screen dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>

			<div className="grid w-100 max-w-full">
				<div className="rounded-xl border border-slate-700 overflow-clip divide-y divide-slate-700">
					{profiles?.map(profile => (
						<ProfileCard
							key={profile.id}
							profile={profile}
							verified={profile.onChainIdentity.worldcoin.isHuman}
						/>
					))}
				</div>
			</div>

			{!profileToSubscribe && (
				<div>
					<p>Looks like you don't have a verified Lens profile yet, fren</p>
				</div>
			)}
			<div></div>
		</div>
	)
}

export default Subscribe
