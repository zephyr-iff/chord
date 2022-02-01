import React, { useMemo } from 'react'
import { Alert } from 'react-bootstrap'

interface ReferralsProps {}

const links = [
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1011l66115" rel="sponsored">
    Take 50% Off Annual Plan with code learntoplay50
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1011l22176" rel="sponsored">
    Try Fender Play free for 14 days
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1101l21999" rel="sponsored">
    Fender Play - Hear it. Learn It. Play it.
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1101l22000" rel="sponsored">
    Fender Play - Easiest way to learn guitar
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1100l21975" rel="sponsored">
    Fender Play - Track your progress as you go
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1011l22175" rel="sponsored">
    Fender Play - Learn with easy lessons & track your progress
  </a>,
  <a href="https://prf.hn/click/camref:1101lfvVp/creativeref:1101l39966" rel="sponsored">
    Learn to Play. Get 10% Off Gear!
  </a>
]

export const Referrals: React.FunctionComponent<ReferralsProps> = ({}) => {
  const link = useMemo(() => links[Math.floor(Math.random() * links.length)], [])

  return <Alert variant="primary">Learning how to play the guitar? {link}</Alert>
}
