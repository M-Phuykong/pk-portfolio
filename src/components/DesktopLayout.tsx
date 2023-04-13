import React from 'react'
import { color, delay, motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Around } from "@theme-toggles/react"

import "../styles/index.scss"

// Hook
import { useTheme } from '../context/ThemeContext'

// Components
import Background from './Background'
import { MainCard } from './MainCard'

const cameraProps = {
  enablePan: false,
  enableZoom: false,
}

const mainVariant = {
  light: {
    backgroundColor: "white",

  },
  dark: {
    backgroundColor: "black",

  }
}



export default function DesktopLayout() {

  const { darkMode, setDarkMode } = useTheme()

  return (
    <motion.main
    className="md:overflow-hidden min-w-fit"
    variants = {mainVariant}
    animate = {darkMode ? "dark" : "light"}
    >

        <Around duration={500} toggle={setDarkMode} toggled={darkMode}
        className='p-2' style={{color: darkMode ? "white" : "black"}}/>

        <Background>

          <motion.div
            initial = {{
              opacity: 0,
            }}
            animate = {{
              opacity :1
            }}
            transition={{ delay : 0.3}}

            id = "main_container"

            className="
            flex
            w-screen h-screen
            items-center">

              <Canvas camera={{position: [0, 0, 18]}} id="main_canvas">

                <MainCard />

                {/* <OrbitControls {...cameraProps}/> */}
              </Canvas>

          </motion.div>
        </Background>
    </motion.main>
  )
}

