import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Background from './Background'
import { PhoneAccordion } from './PhoneAccordion'
import { Around } from "@theme-toggles/react"
import { GithubFill, LinkedinBoxFill, File } from 'akar-icons'

// Hook
import { useTheme } from '../context/ThemeContext'

// Resources
import self_photo from "../images/self_photo.jpg"
import resume from "../download/Phuykong_Meng_Resume.pdf"

// Styles
import "../styles/phoneLayout.scss"

export default function MobileLayout({}: Props) {

  const { darkMode, setDarkMode } = useTheme()

  const variant = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
      }
    }

  }
  const itemVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const mainVariant = {
    light: {
      backgroundColor: "white",

    },
    dark: {
      backgroundColor: "black",

    }
  }

  return (

      <motion.main
      variants={mainVariant}
      animate={darkMode ? "dark" : "light"}
      className={"min-h-screen min-w-screen " + (darkMode ? "dark" : "") }
      >
        <Background>
          <AnimatePresence>

            <motion.div
            layout
            variants={variant}
            initial = "hidden"
            animate = "show"

            id="overlay"

            key = "main_container"
            className="relative">

              <motion.div>
                <Around duration={500} toggle={setDarkMode} toggled={darkMode}
                  className='p-2' style={{color: darkMode ? "white" : "black"}}/>
              </motion.div>

              <motion.div className="
              flex
              min-h-fit
              h-fit
              w-full

              justify-center"
              variants={itemVariant}

              key = "photo_container"
              id='photo_container'>
                <img src={self_photo}
                          alt="Phuykong_Meng_photo"
                          className="
                          h-32
                          w-auto
                          border border-solid border-black dark:border-white border-4

                          shadow-xl
                          rounded-full" />

              </motion.div>

              <motion.div className="
              flex
              h-fit
              w-full
              px-10
              pb-5
              "
              variants={itemVariant}
              key = "name_text_container"
              id = "name_text_container">
                <p className="
                text-3xl  dark:text-white
                font-semibold
                font-sans
                ">
                  Hello, <br/>I'm Phuykong Meng.
                </p>
              </motion.div>

              <motion.div

              className="
              h-fit
              w-full
              pb-9
              "
              variants={itemVariant}

              key = "links_container"
              id = "links_container">
                <hr />
                <div className="
                flex
                p-5
                justify-around
                dark:text-white
                "
                id = "icon_container">
                  <a href="https://github.com/M-Phuykong" target="_blank">
                    <GithubFill size = {26}></GithubFill>
                  </a>

                  <a href={resume} download="Phuykong_Meng_Resume.pdf">
                    <File size = {26} strokeWidth = {2} ></File>
                  </a>

                  <a href="https://www.linkedin.com/in/phuykong-meng/" target="_blank">
                    <LinkedinBoxFill size={26}></LinkedinBoxFill>
                  </a>
                </div>
                <hr />
              </motion.div>

              <motion.div
              variants={itemVariant}
              key="phone_accordion_container"
              className="">
                <PhoneAccordion />

              </motion.div>

            </motion.div>
          </AnimatePresence>
        </Background>
      </motion.main>
  )
}