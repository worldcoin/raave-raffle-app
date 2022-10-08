import { useToggle } from '@/hooks/useToggle'
import { FC, memo, PropsWithChildren, ReactNode, useCallback, useEffect } from 'react'

export type Props = PropsWithChildren<{
	backdrop?: ReactNode
	dismissible?: boolean
	modalState: ReturnType<typeof useToggle>
}>

const ModalBase: FC<Props> = ({ modalState, backdrop, dismissible = true, children }) => {
	// ANCHOR: remove scrollbar if show
	useEffect(() => {
		document.documentElement.style.overflow = modalState.isOn ? 'hidden' : ''
		return () => {
			document.documentElement.style.overflow = ''
		}
	}, [modalState.isOn])

	// ANCHOR: bind escape for close modal
	useEffect(() => {
		if (!dismissible) return

		const handlePressEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') modalState.toggleOff()
		}

		window.addEventListener('keyup', handlePressEsc)

		return () => {
			window.removeEventListener('keyup', handlePressEsc)
		}
	}, [dismissible, modalState])

	const handleClickOverlay = useCallback(() => dismissible && modalState.toggleOff(), [dismissible, modalState])

	if (!modalState.isOn) return null

	return (
		<div className="fixed inset-0 z-10">
			<div className="absolute inset-0 grid place-items-center z-10 pointer-events-none">
				<div className="pointer-events-auto">{children}</div>
			</div>

			<div className="absolute inset-0 z-0 bg-202124/50" onClick={handleClickOverlay}>
				{backdrop}
			</div>
		</div>
	)
}

export default memo(ModalBase)
