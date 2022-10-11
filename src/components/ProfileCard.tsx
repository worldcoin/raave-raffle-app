import cn from 'classnames'
import classNames from 'classnames'
import LensAvatar from './LensAvatar'
import { Profile } from '@/types/lens'
import { useContractRead } from 'wagmi'
import { FC, memo, useMemo } from 'react'
import VerifiedIcon from './VerifiedIcon'
import LensHumanRaffle from '@/abi/LensHumanRaffle.abi.json'

type Props = {
	profile: Profile
	className?: string
	verified: boolean
}

const ProfileCard: FC<Props> = ({ profile, verified, className }) => {
	const { data, status } = useContractRead({
		enabled: !!profile,
		args: [profile?.id],
		functionName: 'isParticipating',
		contractInterface: LensHumanRaffle,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
	})

	const hasEntered = useMemo<boolean>(() => status == 'success' && (data as unknown as boolean), [status, data])

	return (
		<div
			className={cn(
				'flex items-stretch p-5',
				'transition-colors',
				{
					'cursor-not-allowed bg-white/10': !verified,
				},
				className
			)}
		>
			<span className="relative w-20 h-20 mr-4">
				<LensAvatar
					className={classNames('absolute inset-0 rounded-full', { grayscale: !verified })}
					profile={profile}
				/>
				{verified && (
					<span className="p-1 rounded-full absolute bottom-0 right-0 grid transition">
						<VerifiedIcon width={20} height={20} border="text-black" />
					</span>
				)}
			</span>

			<div className="flex flex-col justify-between">
				<div>
					<div className="flex items-center gap-x-1">
						<p className="font-semibold text-20 text-white">{profile.name}</p>
					</div>
					<p className="text-white/60 text-sm">
						<span>@{profile.handle}</span>
						{verified && (
							<>
								<span>&nbsp;&bull;&nbsp;</span>
								<span className={`bg-gradient-to-b from-4940e0 to-7c74fb bg-clip-text`}>
									Verified Human
								</span>
							</>
						)}
					</p>
				</div>

				<div className="text-sm">
					{hasEntered ? (
						<p className="text-blue-500">You&apos;re in! Stay tuned for the results 😁</p>
					) : verified ? (
						<p className="text-green-500">Eligible to participate 🎉🎉🎉</p>
					) : (
						<p className="text-orange-500 italic">Verify with World ID first</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default memo(ProfileCard)
