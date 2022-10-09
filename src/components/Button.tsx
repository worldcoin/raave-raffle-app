import { ComponentPropsWithoutRef, ElementType, FC, memo } from 'react'
import cn from 'classnames'

interface ButtonInterface<C extends ElementType = 'button'> {
	size?: 'default' | 'large' | 'medium'
	disabled?: boolean
	uppercase?: boolean
	component?: C
}

type Props<C extends ElementType = 'button'> = ButtonInterface<C> & ComponentPropsWithoutRef<C>

const Button: FC<Props> = ({
	disabled,
	className,
	uppercase,
	size = 'default',
	component: Component = 'button',
	...restProps
}) => {
	return (
		<Component
			className={cn(
				{
					'bg-indigo-600 hover:bg-183c4a hover:text-ffffff transition-colors': !disabled,
				},

				'font-medium rounded-xl',
				{ 'opacity-20': disabled },
				{ 'px-5 py-3': size === 'default' },
				{ 'px-8 py-5': size === 'medium' },
				{ 'px-8 py-6': size === 'large' },
				{ uppercase },
				className
			)}
			{...restProps}
			disabled={disabled}
		/>
	)
}

export default memo(Button)
