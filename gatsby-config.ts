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
  trailingSlash: 'always',
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: 'src/images/logo.png',
        description:
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
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `uk`],
        trailingSlash: 'always',
        redirect: '/'
      }
    }
  ]
}

export default config
