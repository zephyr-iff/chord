import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import styled from '../styles/theme'
import { getLink } from '../hooks/url-state'
import { Chart } from '../domain/chart'
import { EmailShareButton, FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Clipboard, Facebook, Mail, MessageSquare, Send, Share2, Twitter } from 'react-feather'
import { IconButton } from './IconButton'
import InputGroup from 'react-bootstrap/InputGroup'

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface IProps {
  chart: Chart
}

export const ShareButtons = ({ chart }: IProps) => {
  const [link, setLink] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    setLink(null)
  }, [JSON.stringify(chart)])

  function share() {
    const url = getLink(chart, '/chord')

    setLink(url)

    return new Promise((resolve) => {
      setTimeout(resolve, 300)
    })
  }

  const title = `ChordPic.com | ${chart.settings.title || 'Unnamed Chord'}`

  const copyLink = () => {
    if (inputRef.current) {
      inputRef.current.select()
      document.execCommand('copy')
    }
  }

  return (
    <>
      <h2 id="share">Share</h2>
      <IconButton variant="outline-dark" onClick={share}>
        <Share2 />
        Generate Sharing Link
      </IconButton>

      {link && (
        <>
          <InputGroup className="my-3">
            <input className="form-control" ref={inputRef} aria-label="Sharing Link" type="text" value={link} readOnly={true} />
            <InputGroup.Append>
              <IconButton variant="outline-dark" onClick={copyLink}>
                <Clipboard />
                Copy
              </IconButton>
            </InputGroup.Append>
          </InputGroup>

          <ButtonContainer>
            <FacebookShareButton url={link}>
              <IconButton size="sm" variant="outline-dark">
                <Facebook />
                Facebook
              </IconButton>
            </FacebookShareButton>

            <TelegramShareButton url={link} title={title}>
              <IconButton size="sm" variant="outline-dark">
                <Send />
                Telegram
              </IconButton>
            </TelegramShareButton>

            <TwitterShareButton url={link} title={title} via="https://chordpic.com" hashtags={['guitar', 'chord']}>
              <IconButton size="sm" variant="outline-dark">
                <Twitter />
                Twitter
              </IconButton>
            </TwitterShareButton>

            <WhatsappShareButton url={link} title={title}>
              <IconButton size="sm" variant="outline-dark">
                <MessageSquare />
                WhatsApp
              </IconButton>
            </WhatsappShareButton>

            <EmailShareButton subject={title} url={link} body="Here's a chord chart I created on ChordPic.com">
              <IconButton size="sm" variant="outline-dark">
                <Mail />
                Email
              </IconButton>
            </EmailShareButton>
          </ButtonContainer>
        </>
      )}
    </>
  )
}

export default ShareButtons
