import { FC, useCallback } from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import SubscribeModal from '@/components/SubscribeModal'
import { useToggle } from '@/hooks/useToggle'
import SuccessModal from '@/components/SuccessModal'

const Home: FC = () => {
	const subscribeModal = useToggle(true)
	const successModal = useToggle()

	const handleSuccess = useCallback(() => {
		subscribeModal.toggleOff()
		successModal.toggleOn()
	}, [])

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<div className="absolute top-6 right-6">
				<ConnectWallet />
			</div>

			<SubscribeModal modalState={subscribeModal} onSuccess={handleSuccess} />
			<SuccessModal modalState={successModal} />
		</div>
	)
}

export default Home
