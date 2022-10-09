import Modal from './Modal'
import confetti from 'canvas-confetti'
import { useToggle } from '@/hooks/useToggle'
import { FC, memo, useEffect, useRef } from 'react'
import { CheckCircleIcon } from '@heroicons/react/outline'

type Props = {
	modalState: ReturnType<typeof useToggle>
}

const SuccessModal: FC<Props> = ({ modalState }) => {
	const confettiCanvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (!modalState.isOn || !confettiCanvas.current) return

		shotConfetti()
	}, [modalState.isOn])

	const shotConfetti = () => {
		if (!confettiCanvas.current) return

		const end = Date.now() + 1 * 1000
		const colors = ['#84cc16', '#10b981', '#14b8a6']
		const confettiSource = confetti.create(confettiCanvas.current, { resize: true, disableForReducedMotion: true })

		const frame = () => {
			confettiSource({ particleCount: 3, angle: 120, spread: 55, colors: colors, shapes: ['circle'] })
			confettiSource({ particleCount: 3, angle: 60, spread: 55, colors: colors, shapes: ['circle'] })

			if (Date.now() < end) requestAnimationFrame(frame)
		}

		frame()
	}

	return (
		<Modal modalState={modalState} backdrop={<canvas className="w-full h-full" ref={confettiCanvas} />}>
			<div className="relative py-4 sm:pt-0">
				<h2 className="mb-8 text-2xl font-bold flex justify-center">
					<CheckCircleIcon className="text-green-600 w-8 mr-1" /> You&apos;re in!
				</h2>
				<p className="text-center">
					You&apos;ve been entered into the raffle. Winners will be announced in{' '}
					<a
						href="https://lenster.xyz/u/worldcoin.lens"
						target="_blank"
						rel="noopener noreferrer"
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
					<i>&#8212; Your frens at</i> 👻 x 🌱 x 🪩
				</p>
			</div>
		</Modal>
	)
}

export default memo(SuccessModal)
