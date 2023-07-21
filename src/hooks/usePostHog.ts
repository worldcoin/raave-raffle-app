import posthog from 'posthog-js'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const usePostHog = (): void => {
	const router = useRouter()

	useEffect((): (() => void) => {
		// Track $pageview
		const handleRouteChange = (_: any, { shallow }: { shallow: boolean }) => {
			if (!shallow) {
				posthog.capture('$pageview')
			}
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [])
}
