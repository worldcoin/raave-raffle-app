import Modal from './Modal'
import { FC, memo } from 'react'
import { useToggle } from '@/hooks/useToggle'
import { CheckCircleIcon } from '@heroicons/react/outline'

type Props = {
	modalState: ReturnType<typeof useToggle>
}

const SuccessModal: FC<Props> = ({ modalState }) => {
	return (
		<Modal modalState={modalState}>
			<div className="relative py-4 sm:pt-0">
				<h2 className="mb-8 text-2xl font-bold flex justify-center">
					<CheckCircleIcon className="text-green-600 w-8 mr-1" /> You're in!
				</h2>
				<p className="text-center">
					You've been entered into the raffle. Winners will be announced in{' '}
					<a
						href="https://lenster.xyz/u/worldcoin.lens"
						target="_blank"
						rel="noopener"
						className="text-indigo-400"
					>
						@worldcoin
					</a>{' '}
					and on{' '}
					<a
						href="https://twitter.com/worldcoin"
						target="_blank"
						rel="noopener noreferrer"
						className="text-indigo-400"
					>
						Twitter
					</a>{' '}
					(<i>or you can of course check the smart contract</i>).
				</p>
				<p className="text-center mt-4">Keep an eye out for our post. Good luck!</p>
				<p className="text-center mt-4">
					<i>&#8212; Your frens at</i> 👻 x 🍃 x 🪩
				</p>
			</div>
		</Modal>
	)
}

export default memo(SuccessModal)
