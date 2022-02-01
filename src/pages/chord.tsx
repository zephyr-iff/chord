import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Chart } from '../domain/chart'
import { ChordResult } from '../components/ChordResult'
import { Link } from 'gatsby'
import IndexLayout from '../layouts'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DownloadButtons from '../components/DownloadButtons'
import ShareButtons from '../components/ShareButtons'
import Helmet from 'react-helmet'
import { decompress } from '../hooks/compressed-state'

export default (props: { '*': string; location: Location }) => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [chart, setChart] = useState<Chart | null | undefined>(undefined)

  useEffect(() => {
    const loadedChart = decompress<Chart>(props['*'])
    setChart(loadedChart)
  }, [])

  const chartRef = useRef(null)

  return (
    <IndexLayout location={props.location}>
      {chart ? (
        <>
          <Helmet title={`ChordPic.com ${chart.settings.title ? ` | ${chart.settings.title}` : ''}`} />
          <Row>
            <Col sm={6}>
              <ChordResult chart={chart} chartRef={chartRef} onSize={setSize} />
            </Col>
            <Col sm={{ span: 5, offset: 1 }} className="pt-5">
              <DownloadButtons chartRef={chartRef} size={size} />
              <ShareButtons chart={chart} />

              <h2>Create</h2>
              <Link to="/">Create a new Chart</Link>
            </Col>
          </Row>
        </>
      ) : chart === null ? (
        <>
          <h2>Invalid Sharing Link</h2>
          <p>Sorry but this link does not seem to be a valid sharing link. Are you sure you have the complete link?</p>

          <p>
            Anyway, all you can do now is <Link to="/">go back and create a new guitar chord chart</Link>.
          </p>
        </>
      ) : (
        <p>Loading chord...</p>
      )}
    </IndexLayout>
  )
}
