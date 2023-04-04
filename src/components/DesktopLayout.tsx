import React from 'react'
import { motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import "../styles/index.scss"

import Background from './Background'
import { MainCard } from './MainCard'


type Props = {

}

const cameraProps = {
  enablePan: false,
  enableZoom: false,
}


export default function DesktopLayout({}: Props) {
  return (
    <main
    className="md:overflow-hidden min-w-fit">
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

                <OrbitControls {...cameraProps}/>
              </Canvas>

          </motion.div>
        </Background>
    </main>
  )
}

