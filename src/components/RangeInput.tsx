import React from 'react'
import styled from '@emotion/styled'

const SliderContainer = styled.div`
  width: 100%;
`

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--black);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: var(--black);
    cursor: pointer;
  }
`

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const RangeInput = (props: Props) => {
  return (
    <SliderContainer>
      <Slider {...props} type="range" />
    </SliderContainer>
  )
}
