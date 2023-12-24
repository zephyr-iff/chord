import * as React from 'react'
import { useRef, useState } from 'react'
import IndexLayout from '../layouts'
import { ChordEditor } from '../components/ChordEditor'
import { ChordResult } from '../components/ChordResult'

import DownloadButtons from '../components/DownloadButtons'
import { Frame } from '../components/Frame'
import { Chart } from '../domain/chart'
import '../styles/index.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ChordForm } from '../components/ChordForm'
import styled from '@emotion/styled'
import ShareButtons from '../components/ShareButtons'
import { useResizeHandler } from '../hooks/use-resize-handler'
import { usePersistedState } from '../hooks/persisted-state'
import { ChordStyle, Orientation } from 'svguitar'

const initialSettings = Object.freeze({
  orientation: Orientation.vertical,
  style: ChordStyle.normal,
  strings: 6,
  frets: 5,
  position: 1,
  nutSize: 0.65,
  titleFontSize: 48,
  color: '#000',
  strokeWidth: 2,
  fretSize: 1.5,
  backgroundColor: 'none',
  fixedDiagramPosition: false
})

const ColCenterContent = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const IndexPage = (props: { location: Location }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  const [chart, setChart] = usePersistedState<Chart>('chart_v1', {
    chord: {
      fingers: [],
      barres: []
    },
    settings: initialSettings
  })
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const { width, height } = useResizeHandler()

  const resetSettings = () => setChart({ ...chart, settings: initialSettings })

  const {
    settings: { frets, strings }
  } = chart

  return (
    <IndexLayout location={props.location}>
      <h1>Guitar Chord Diagram Creator</h1>
      {/* <p>
        It's never been easier to create guitar chord diagrams! Start by clicking anywhere on the{' '}
        <a href="#editor">
          <i>editor</i>
        </a>{' '}
        fret board and immediately see the result on the{' '}
        <a href="#result">
          <i>result</i>
        </a>{' '}
        fret board. Then <a href="#download">download</a> and <a href="#share">share</a> your chord diagram.
      </p> */}

      <ChordForm onResetSettings={resetSettings} settings={chart.settings} onSettings={(settings) => setChart({ ...chart, settings })} />

      <Row className="my-5">
        <ColCenterContent md={6}>
          <Frame text="Editor" id="editor">
            <ChordEditor
              width={width * 0.75}
              height={height * 0.6}
              numFrets={frets || initialSettings.frets}
              numStrings={strings || initialSettings.strings}
              settings={chart.settings}
              chord={chart.chord}
              onChart={(chart) => setChart(chart)}
            />
          </Frame>
        </ColCenterContent>
        <ColCenterContent md={6}>
          <Frame text="Result" stretch={true} id="result">
            <ChordResult
              chart={chart}
              chartRef={chartRef}
              onSize={setSize}
              orientation={chart.settings.orientation ?? initialSettings.orientation}
              onChangeOrienation={(orientation) => {
                setChart({
                  ...chart,
                  settings: {
                    ...chart.settings,
                    orientation
                  }
                })
              }}
            />
          </Frame>
        </ColCenterContent>
      </Row>
      <Row>
        <Col md={12}>
          <DownloadButtons chartRef={chartRef} size={size} title={chart.settings.title} />
        </Col>
        {/* <Col md={6}>
          <ShareButtons chart={chart} />
        </Col> */}
      </Row>
    </IndexLayout>
  )
}

export default IndexPage
