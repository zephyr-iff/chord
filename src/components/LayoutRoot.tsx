import * as React from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { theme } from '../styles/theme'

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 5rem;
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <ThemeProvider theme={theme}>
    <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
  </ThemeProvider>
)

export default LayoutRoot
