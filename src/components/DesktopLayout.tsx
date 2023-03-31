import React from 'react'
import { motion } from "framer-motion"
import { Canvas, useFrame } from '@react-three/fiber'

import "../styles/index.scss"

import Background from './Background'
import { CardGroup } from './CardGroup'

import self_photo from "../images/self_photo.jpg"
import { Html, OrbitControls } from '@react-three/drei'

type Props = {

}

function MainCard() {

  const cardRef = React.useRef<THREE.Mesh>(null)

  useFrame((state, delta) =>{
    // cardRef.current!.rotation.x += delta
  })


  return (

    <Html
    transform
    
    >
      <div className="
        overlay
        relative
        w-full
        h-full
        grid grid-rows-5
        ">

          <img src={self_photo}
          alt="Phuykong_Meng_photo"
          className="
          absolute
          -top-[6rem]
          left-[2rem]
          h-2/5
          w-auto
          border border-solid border-white border-8
          shadow-xl
          rounded-full" />

          <div className="

          mt-5 2xl:mt-10
          ml-[15rem] 2xl:ml-[20rem]
          ">
            <h1 className='text-3xl lg:text-5xl 2xl:text-6xl'> Hello, I'm Phuykong Meng.</h1>
          </div>

          <CardGroup></CardGroup>

      </div>
    </Html>
  )
}




export default function DesktopLayout({}: Props) {
  return (
    <main
    className="md:overflow-hidden">
        <Background>
          <motion.div
            initial = {{
              opacity: 0,
            }}
            animate = {{
              opacity :1
            }}
            transition={{ delay : 0.3}}
            className="
            flex
            w-full h-screen

            items-center">

              {/* <div className="
                overlay
                relative
                w-full
                h-full
                grid grid-rows-5
                ">

                  <img src={self_photo}
                  alt="Phuykong_Meng_photo"
                  className="
                  absolute
                  -top-[6rem]
                  left-[2rem]
                  h-2/5
                  w-auto
                  border border-solid border-white border-8
                  shadow-xl
                  rounded-full" />

                  <div className="

                  mt-5 2xl:mt-10
                  ml-[15rem] 2xl:ml-[20rem]
                  ">
                    <h1 className='text-3xl lg:text-5xl 2xl:text-6xl'> Hello, I'm Phuykong Meng.</h1>
                  </div>

                  <CardGroup></CardGroup>

              </div> */}

              <Canvas camera={{position: [0, 0, 18]}} >
                <OrbitControls />

                <MainCard />

              </Canvas>

          </motion.div>
        </Background>
    </main>
  )
}

