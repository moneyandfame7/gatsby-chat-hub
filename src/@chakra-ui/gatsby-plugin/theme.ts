import { type ThemeConfig, extendTheme } from '@chakra-ui/react'

import gradient from '@assets/gradient.png'

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
}

const theme = extendTheme(
	{ config },
	{
		colors: {
			brand: {
				100: '#674188',
				200: '#C3ACD0',
				300: '#674188',
			},
			blue: {
				100: '#0E172A',
				200: '#6d498d',
				300: '#0B1322',
				alpha: '#0c1423a8',
			},
			white: {
				// default: '#fff',
				100: '#FFFBF5',
				alpha: '#ffffffbb',
			},
			text: {
				primary: 'rgb(0,0,0)',
				secondary: '#707579',
				icon: 'rgb(112,117,121)',
			},

			red: '#E53835',
			yellow: '#FDD764',
		},
		semanticTokens: {
			colors: {
				primary: {
					default: '#8774E1',
				},
			},
		},
		styles: {
			global: () => ({
				body: {
					// bgImage: `${gradient}`,
					// bgSize: 'cover',
				},
				'*': {
					WebkitTapHighlightColor: 'transparent',
					overflowX: 'hidden',
				},
			}),
		},
	}
)

export default theme
