import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { MotionConfig } from "framer-motion"
import { useMediaQuery } from "react-responsive"

import DesktopLayout from "../components/DesktopLayout"
import MobileLayout from "../components/Mobile/MobileLayout";

import { ThemeProvider, useTheme } from "../context/ThemeContext";

const IndexPage: React.FC<PageProps> = () => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const { theme, updateTheme } = useTheme();

  return (

      <ThemeProvider>

        <MotionConfig reducedMotion="user">
            {isDesktopOrLaptop && <DesktopLayout/>}
            {isTabletOrMobile && <MobileLayout/>}

        </MotionConfig>

      </ThemeProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
 <title>Phuykong Meng</title>
)


