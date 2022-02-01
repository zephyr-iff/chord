import styled from '@emotion/styled'
import * as React from 'react'
import { memo, MutableRefObject, useEffect, useRef } from 'react'
import { ChordSettings, Orientation, SVGuitarChord } from 'svguitar'
import { Chart } from '../domain/chart'
import Button from 'react-bootstrap/Button'
import { RotateCcw, RotateCw } from 'react-feather'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

interface IProps {
  chart: Chart
  chartRef: MutableRefObject<HTMLDivElement | null>
  onSize: (size: { width: number; height: number }) => void
  onChangeOrienation?: (orientation: Orientation) => void
}

const ChordChartDiv = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  max-height: 40rem;
  padding-top: 2rem;

  svg {
    height: 100%;
    width: 100%;
  }
`

const RotateButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  color: var(--black);
`

const defaultSVGuitarSettings: Partial<ChordSettings> = {
  fretSize: 1.75,
  barreChordRadius: 0.5
}

export const ChordResult = memo(({ chart, chartRef, onSize, onChangeOrienation }: IProps) => {
  const svguitarRef = useRef<SVGuitarChord>()

  useEffect(() => {
    if (chartRef.current && !svguitarRef.current) {
      svguitarRef.current = new SVGuitarChord(chartRef.current)
    }

    if (svguitarRef.current) {
      const size = svguitarRef.current
        .configure({
          ...defaultSVGuitarSettings,
          ...chart.settings
        })
        .chord(chart.chord)
        .draw()

      onSize(size)
    }
  }, [chart, chartRef, onSize])

  return (
    <>
      {onChangeOrienation && (
        <OverlayTrigger overlay={<Tooltip id="rotate-chord-button-tooltip">Rotate chord diagram</Tooltip>}>
          <RotateButton
            variant="link"
            title="Rotate chord diagram"
            onClick={() =>
              onChangeOrienation(chart.settings?.orientation === Orientation.horizontal ? Orientation.vertical : Orientation.horizontal)
            }
          >
            {chart.settings?.orientation === Orientation.horizontal ? <RotateCw /> : <RotateCcw />}
          </RotateButton>
        </OverlayTrigger>
      )}
      <ChordChartDiv id="chord-result" ref={chartRef} />
    </>
  )
})
