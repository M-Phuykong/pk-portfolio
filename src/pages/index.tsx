import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { AnimatePresence, MotionConfig } from "framer-motion"

import DesktopLayout from "../components/DesktopLayout"
import MobileLayout from "../components/MobileLayout";



const IndexPage: React.FC<PageProps> = () => {

  return (
      <MotionConfig reducedMotion="user">
          <MobileView>
            <MobileLayout />
          </MobileView>

          <BrowserView>
            <DesktopLayout />
          </BrowserView>

      </MotionConfig>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>



