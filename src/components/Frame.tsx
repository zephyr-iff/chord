import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from '@emotion/styled'

const FramedDiv = styled.div<{ bottomAlign?: boolean; stretch?: boolean }>`
  border: 2px solid var(--black);
  border-radius: 15px;
  padding: 2rem 1rem;
  margin-top: 1rem;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.stretch ? 'stretch' : 'center')};
  justify-content: ${(props) => (props.bottomAlign ? 'flex-end' : 'center')};

  position: relative;
`

const LabelDiv = styled.div`
  position: absolute;

  @media screen and (min-width: 1240px) {
    max-width: 11rem;
    left: 10px;
    top: 20px;
    transform: rotate(-35deg);
  }

  @media screen and (max-width: 1240px) {
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }
`

interface Props {
  text: string
  id: string
  bottomAlign?: boolean
  stretch?: boolean
}

export const Frame: FunctionComponent<Props> = ({ text, id, bottomAlign, stretch, children }) => (
  <FramedDiv bottomAlign={bottomAlign} stretch={stretch}>
    <LabelDiv id={id}>{text}</LabelDiv>
    {children}
  </FramedDiv>
)
