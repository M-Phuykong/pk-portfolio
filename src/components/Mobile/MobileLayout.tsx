import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GithubFill, LinkedinBoxFill, File } from 'akar-icons'

// Components
import { PhoneAccordion } from './PhoneAccordion'
import ThemeDropdown from '../ThemeDropdown'

// Hook
import { useTheme } from '../../context/ThemeContext'

// Resources
import self_photo from "../../images/self_photo.jpg"
import resume from "../../download/Phuykong_Meng_Resume.pdf"

// Styles
import "../../styles/mobileLayout.scss"

export default function MobileLayout({}: Props) {

  const { theme, updateTheme } = useTheme();

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
      className={"min-h-screen min-w-screen "}
      style={{backgroundColor: theme.background}}
      >
        {/* <Background> */}
          <AnimatePresence>

            <motion.div
            layout
            variants={variant}
            initial = "hidden"
            animate = "show"

            id="overlay"

            key = "main_container"
            className="relative">

              <motion.div style={{color: theme.main_color}}>
                <ThemeDropdown />
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
              h-fit
              w-full
              px-10
              pb-5
              text-3xl
              font-semibold
              "
              style={{color: theme.text_color}}
              variants={itemVariant}
              key = "name_text_container"
              id = "name_text_container">
                Hello, <br/>
                I'm
                <span style={{color: theme.main_color}}> Phuykong Meng</span>
                .
                <span className='hover:animate-handwave origin-[70%_70%] inline-block'>👋</span>
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
                <hr style={{background: theme.text_color}} />

                <div className="
                flex
                p-5
                justify-around
                "
                style={{color: theme.main_color}}
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

                <hr style={{background: theme.text_color}}/>
              </motion.div>

              <motion.div
              variants={itemVariant}
              key="phone_accordion_container"
              className="">
                <PhoneAccordion />
              </motion.div>

            </motion.div>
          </AnimatePresence>
        {/* </Background> */}
      </motion.main>
  )
}

