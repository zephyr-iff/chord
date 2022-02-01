/* eslint-disable max-len */

import styled, { CreateStyled } from '@emotion/styled'

type Theme = {
  colors: {
    text: string
    background: string
  }
  inverted: {
    text: string
    link: string
    background: string
  }
  fonts: {
    body: string
  }
}

export const theme: Theme = {
  colors: {
    text: '#000',
    background: '#fff'
  },
  inverted: {
    text: '#fff',
    link: '#fff',
    background: '#000'
  },
  fonts: {
    body: `'Indie Flower', sans-serif;`
  }
}

export default styled as CreateStyled<Theme>
