import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { AnimatePresence, MotionConfig } from "framer-motion"
import { createMedia } from "@artsy/fresnel";

import DesktopLayout from "../components/DesktopLayout"
import MobileLayout from "../components/MobileLayout";


const { MediaContextProvider, Media } = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
})


const IndexPage: React.FC<PageProps> = () => {

  return (
    <MediaContextProvider>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>

          <Media lessThan="lg">
            <MobileLayout />
          </Media>

          <Media greaterThanOrEqual="lg">
            <DesktopLayout />
          </Media>
          {/* <MobileView>
            <MobileLayout />
          </MobileView>

          <BrowserView>
            <DesktopLayout />
          </BrowserView> */}

        </AnimatePresence>
      </MotionConfig>
    </MediaContextProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>



