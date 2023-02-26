import React from 'react'

import Background from './Background'
import { PhoneAccordion } from './PhoneAccordion'

type Props = {
}

export default function MobileLayout({}: Props) {
  return (
    <main>
      <Background>
        <PhoneAccordion />

      </Background>
    </main>
  )
}