import ModalBase, { Props as BaseProps } from './ModalBase'
import { FC, memo, PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{ header?: ReactNode; onReturn?: () => void } & BaseProps>

const Modal: FC<Props> = ({ header, children, onReturn, ...baseProps }) => {
	return (
		<ModalBase {...baseProps}>
			<div className="md:w-[500px] bg-white rounded-t-3xl md:rounded-xl md:drop-shadow-lg">
				<div className="px-8 py-6">{children}</div>
			</div>
		</ModalBase>
	)
}

export default memo(Modal)
