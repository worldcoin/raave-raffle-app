import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import SubscribeModal from '@/components/SubscribeModal'
import { useToggle } from '@/hooks/useToggle'

const Home: FC = () => {
	const subscribeModal = useToggle(true)
	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>

			<SubscribeModal modalState={subscribeModal} />
		</div>
	)
}

export default Home
