import { type ThemeConfig, extendTheme } from '@chakra-ui/react'

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
			primary: {
				main: '#3390ec',
			},

			red: '#E53835',
			yellow: '#FDD764',
		},
		semanticTokens: {
			colors: {
				primary: {
					default: '#3290EC',
					dark: '#2E84D9',
					light: '#33A7F4',
					transparent: 'rgb(51 144 236 / 10%)',
					transparent2: 'rgb(51 144 236 / 3%)',
				},
			},
		},
		styles: {
			global: () => ({
				'*': {
					WebkitTapHighlightColor: 'transparent',
				},
			}),
		},
	}
)

export default theme
