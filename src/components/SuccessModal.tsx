import Modal from './Modal'
import confetti from 'canvas-confetti'
import { useToggle } from '@/hooks/useToggle'
import { FC, memo, useEffect, useRef } from 'react'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/outline'

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
				<div className="flex items-center justify-center mb-4">
					<div className="w-16 h-16 flex items-center justify-center bg-green-50 flex-shrink-0 rounded-full">
						<div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
							<CheckIcon className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>
				<p>
					You&apos;ve been entered into the raffle. Winners will be announced from{' '}
					<a
						href="https://lenster.xyz/u/worldcoin.lens"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400"
					>
						@worldcoin.lens
					</a>{' '}
					and on{' '}
					<a
						href="https://twitter.com/worldcoin"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400"
					>
						Twitter
					</a>{' '}
					(<i>or check the chain!</i>).
				</p>
				<p className="mt-4">Keep an eye out for the post. Good luck!</p>
				<p className="text-right mt-6">
					<i>&#8212; Your frens at</i> 👻 x 🌱 x 🪩
				</p>
			</div>
		</Modal>
	)
}

export default memo(SuccessModal)
