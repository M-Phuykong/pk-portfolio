import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { MotionConfig } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import AnimatedCursor from "react-animated-cursor"

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
            <AnimatedCursor
              innerSize={8}
              outerSize={35}
              innerScale={1}
              outerScale={2}
              outerAlpha={0}
              hasBlendMode={true}
              innerStyle={{
                backgroundColor: theme.main_color,
              }}
              outerStyle={{
                border: `3px solid ${theme.text_color}`
              }}
            />
            {isDesktopOrLaptop && <DesktopLayout/>}
            {isTabletOrMobile && <MobileLayout/>}

        </MotionConfig>

      </ThemeProvider>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>



