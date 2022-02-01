import * as React from 'react'
import { MutableRefObject } from 'react'
import { ImageService } from '../services/image-service'
import { Download } from 'react-feather'
import { IconButton } from './IconButton'

const downloadPng = (chartDom: HTMLDivElement | null, width = 400, title?: string) => () => {
  if (!chartDom || !chartDom.firstChild) {
    return
  }

  const svg = chartDom.firstChild as SVGElement
  ImageService.downloadPng(svg, width, title)
}

const downloadSvg = (chartDom: HTMLDivElement | null, title?: string) => () => {
  if (!chartDom) {
    return
  }

  const svg = chartDom.innerHTML
  ImageService.downloadSvg(svg, title)
}

interface IProps {
  chartRef: MutableRefObject<HTMLDivElement | null>
  size: { height: number; width: number }
  title?: string
}

export const DownloadButtons = ({ chartRef, size, title }: IProps) => {
  // size multipliers (1 => original size)
  const pngSizeMultipliers: { multiplier: number; name: string }[] = [
    {
      multiplier: 0.5,
      name: 'Small'
    },
    {
      multiplier: 1,
      name: 'Medium'
    },
    {
      multiplier: 2,
      name: 'Large'
    },
    {
      multiplier: 4,
      name: 'Huge'
    }
  ]

  return (
    <>
      <h2 id="download">Download</h2>
      <IconButton size="sm" variant="outline-dark" onClick={downloadSvg(chartRef.current, title)}>
        <Download />
        SVG
      </IconButton>

      {pngSizeMultipliers.map(({ multiplier, name }, i) => {
        const width = Math.round(size.width * multiplier)
        const height = Math.round(size.height * multiplier)

        return (
          <IconButton size="sm" variant="outline-dark" key={i} onClick={downloadPng(chartRef.current, width, title)}>
            <Download />
            {name} PNG ({width} x {height})
          </IconButton>
        )
      })}
    </>
  )
}

export default DownloadButtons
