import { useEffect, useRef } from 'react'

type HookHandler = VoidFunction

/**
 *
 * https://stackoverflow.com/a/34345634/20954848
 * Потрібен контейнер, і inner елемент, e.g:
 * <div className="container" ref={scrollRef}>
 *   <div className="scroll">
 *   </div>
 * </div>
 *
 */
export const useStickyHeightScroll = () => {
	const scrollRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handler = (e: WheelEvent) => {
			if (e.deltaY && scrollRef.current) {
				e.preventDefault()
				scrollRef.current.scrollTop -= e.deltaY
			}
		}
		document.addEventListener('wheel', handler, { passive: false })

		return () => {
			document.removeEventListener('wheel', handler, false)
		}
	}, [])

	return scrollRef
}
