import type { GatsbyConfig } from 'gatsby'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
})
const config: GatsbyConfig = {
	siteMetadata: {
		title: `ChatHub | Live chat`,
	},
	graphqlTypegen: true,
	trailingSlash: 'always',
	flags: {
		DEV_SSR: true,
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				start_url: '/',
				display: `standalone`,
				icon: 'src/assets/logo.png',
				description:
					'ChatHub is a web-based chat application that enables users to connect with each other instantly and chat in real-time using a simple and user-friendly interface.',
			},
		},
		{
			resolve: 'gatsby-plugin-alias-imports',
			options: {
				alias: {
					'@assets': path.resolve(__dirname, 'src/assets'),
					'@containers': path.resolve(__dirname, 'src/containers'),
					'@modules': path.resolve(__dirname, 'src/modules'),
					'@services': path.resolve(__dirname, 'src/services'),
					'@utils': path.resolve(__dirname, 'src/utils'),
					'@components': path.resolve(__dirname, 'src/components'),
				},
				extensions: ['js'],
			},
		},
		{
			resolve: '@chakra-ui/gatsby-plugin',
			options: {
				resetCSS: true,
				isUsingColorMode: true,
			},
		},
	],
}

export default config
