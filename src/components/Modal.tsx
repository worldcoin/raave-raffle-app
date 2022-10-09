import ModalBase, { Props as BaseProps } from './ModalBase'
import { FC, memo, PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{ header?: ReactNode; onReturn?: () => void } & BaseProps>

const Modal: FC<Props> = ({ header, children, onReturn, ...baseProps }) => {
	return (
		<ModalBase {...baseProps}>
			<div className="w-[calc(100vw_-_8px)] md:w-[500px] bg-gray-900 rounded-xl drop-shadow-lg">
				<div className="px-8 py-12">{children}</div>
			</div>
		</ModalBase>
	)
}

export default memo(Modal)
