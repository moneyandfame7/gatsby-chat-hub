import type { GatsbyConfig } from 'gatsby'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})
const config: GatsbyConfig = {
  siteMetadata: {
    title: `ChatHub | Live chat`
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ChatHub - online web chat',
        short_name: 'ChatHub',
        start_url: '/',
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: 'src/images/logo.png',
        descriptions:
          'ChatHub is a web-based chat application that enables users to connect with each other instantly and chat in real-time using a simple and user-friendly interface.'
      }
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@hooks': path.resolve(__dirname, 'src/hooks'),
          '@images': path.resolve(__dirname, 'src/images'),
          '@assets': path.resolve(__dirname, 'src/assets'),
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@animations': path.resolve(__dirname, 'src/animations'),
          '@services': path.resolve(__dirname, 'src/services'),
          '@store': path.resolve(__dirname, 'src/store')
        },
        extensions: ['js']
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap`
          }
        ]
      }
    },
    'gatsby-plugin-sass',
    'gatsby-theme-material-ui'
  ]
}

export default config
