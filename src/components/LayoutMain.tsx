import * as React from 'react'
import Container from 'react-bootstrap/Container'

const LayoutMain: React.FC<{}> = ({ children }) => <Container className="mt-5">{children}</Container>

export default LayoutMain
