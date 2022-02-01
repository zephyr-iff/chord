import * as React from 'react'
import { Link } from 'gatsby'

import IndexLayout from '../layouts'

const NotFoundPage = (props: { location: Location }) => (
  <IndexLayout location={props.location}>
    <h1>404: This page does not exist, sorry.</h1>
    <p>Here's a random cat gif to cheer you up:</p>
    <img src="https://cataas.com/cat/gif" alt="Random Cat Gif" />

    <p>
      <Link to="/">Go back home</Link>
    </p>
  </IndexLayout>
)

export default NotFoundPage
