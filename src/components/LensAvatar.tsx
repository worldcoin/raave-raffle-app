import { FC, useMemo } from 'react'
import { Profile } from '@/types/lens'
import { routeIPFSToGateway } from '@/lib/utils'

const LensAvatar: FC<{ profile: Profile; className?: string }> = ({ profile, className = '' }) => {
	const avatarUrl = useMemo<string | null>(() => {
		if (!profile) return
		if (!profile?.picture) return `https://avatar.tobi.sh/${profile.handle}.png`

		if (profile.picture?.__typename == 'NftImage') return routeIPFSToGateway(profile.picture?.uri)
		return routeIPFSToGateway(profile.picture.original.url)
	}, [profile])

	if (!avatarUrl) return

	return <img src={avatarUrl} className={className} alt={profile?.name ?? profile?.handle} />
}

export default LensAvatar
