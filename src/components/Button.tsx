import cn from 'classnames'
import LoaderIcon from './Icons/LoaderIcon'
import { ComponentPropsWithoutRef, ElementType, FC, memo } from 'react'

interface ButtonInterface<C extends ElementType = 'button'> {
	size?: 'default' | 'large' | 'medium'
	disabled?: boolean
	loading?: boolean
	component?: C
}

type Props<C extends ElementType = 'button'> = ButtonInterface<C> & ComponentPropsWithoutRef<C>

const Button: FC<Props> = ({
	disabled,
	className,
	loading,
	size = 'default',
	component: Component = 'button',
	children,
	...restProps
}) => {
	return (
		<Component
			className={cn(
				{
					'hover:bg-primary/70': !disabled && !loading,
				},
				'bg-primary text-inverse transition-colors font-bold rounded-full shadow-md uppercase',
				{ 'opacity-50': disabled || loading },
				{ 'px-5 py-3': size === 'default' },
				{ 'px-8 py-5': size === 'medium' },
				{ 'px-8 py-6': size === 'large' },
				{ 'cursor-not-allowed': disabled || loading },
				{ 'flex items-center': loading },
				className
			)}
			{...restProps}
			disabled={disabled || loading}
		>
			{loading && <LoaderIcon />}
			{children}
		</Component>
	)
}

export default memo(Button)
