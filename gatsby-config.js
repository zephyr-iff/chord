'use strict'

module.exports = {
  siteMetadata: {
    title: 'ChordPic | Easily Create Guitar Chord Charts',
    description: 'Easily create guitar chords charts online for free.',
    keywords: 'easy guitar chords svg png image export online free',
    siteUrl: 'https://chordpic.com',
    author: {
      name: 'Raphael Voellmy',
      url: 'https://raphaelvoellmy.ch',
      email: 'r.voellmy@gmail.com'
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'UA-146422804-1' // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true
        },
        pluginConfig: {
          head: false,
          respectDNT: false
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://chordpic.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ChordPic`,
        short_name: `ChordPic`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `./src/images/icon.png`
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/chord/*`] }
    }
  ]
}
