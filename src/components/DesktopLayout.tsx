import React from 'react'
import { motion } from "framer-motion"

import "../styles/index.scss"

import Background from './Background'
import { CardGroup } from './CardGroup'

import self_photo from "../images/self_photo.jpg"

type Props = {

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
            px-36 2xl:px-48
            py-36 2xl:py-44
            items-center">

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
            </motion.div>
        </Background>
    </main>
  )
}