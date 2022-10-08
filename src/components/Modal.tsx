import ModalBase, { Props as BaseProps } from './ModalBase'
import { FC, memo, PropsWithChildren, ReactNode } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/outline'

type Props = PropsWithChildren<{ header?: ReactNode; onReturn?: () => void } & BaseProps>

const Modal: FC<Props> = ({ header, children, onReturn, ...baseProps }) => {
	return (
		<ModalBase {...baseProps}>
			<div className="w-[calc(100vw_-_8px)] md:w-[500px] bg-ffffff rounded-2xl">
				<div className="flex items-center justify-between py-8 px-6 border-b border-bbbec7/30">
					{onReturn ? (
						<button onClick={onReturn}>
							<ArrowLeftIcon className="h-6 w-auto" />
						</button>
					) : (
						<>temp</>
					)}
					{header}
				</div>
				<div className="p-8">{children}</div>
			</div>
		</ModalBase>
	)
}

export default memo(Modal)
