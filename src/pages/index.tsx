import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { BrowserView, MobileView } from 'react-device-detect';
import { MotionConfig } from "framer-motion"

import DesktopLayout from "../components/DesktopLayout"
import MobileLayout from "../components/Mobile/MobileLayout";

import { ThemeProvider } from "../context/ThemeContext";



const IndexPage: React.FC<PageProps> = () => {

  return (

      <ThemeProvider>

        <MotionConfig reducedMotion="user">

            <MobileView>
              <MobileLayout />
            </MobileView>

            <DesktopLayout />
              <BrowserView>
            </BrowserView>

        </MotionConfig>

      </ThemeProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>



