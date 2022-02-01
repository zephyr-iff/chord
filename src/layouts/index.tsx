import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

import 'modern-normalize'
import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const IndexLayout: React.FC<{ location: Location }> = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'keywords', content: data.site.siteMetadata.keywords },
            { name: 'description', content: data.site.siteMetadata.description }
          ]}
        >
          <html lang="en" />
          <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet" />
        </Helmet>
        <Header location={location} />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
