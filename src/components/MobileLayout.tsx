import React from 'react'
import { motion } from 'framer-motion'

import Background from './Background'
import { PhoneAccordion } from './PhoneAccordion'

import self_photo from "../images/self_photo.jpg"
import resume from "../download/Phuykong_Meng_Resume.pdf"

import { GithubFill, LinkedinBoxFill, File } from 'akar-icons'

import "../styles/phoneLayout.scss"

export default function MobileLayout({}: Props) {

  const variant = {
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      }
    },

    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        
      }
    }

  }


  return (
    <main>
      <Background>

        <motion.div

        initial = "hidden"
        animate = "show"

        variants={variant}
        id="overlay"
        className="relative">

          <motion.div className="
          flex
          min-h-fit
          h-fit
          w-full
          pt-10
          justify-center"
          id='photo_container'>
            <img src={self_photo}
                      alt="Phuykong_Meng_photo"
                      className="
                      h-32
                      w-auto
                      border border-solid border-black border-4
                      shadow-xl
                      rounded-full" />

          </motion.div>
          <div className="
          flex
          h-fit
          w-full
          px-10
          pb-5
          "
          id = "name_text_container">
            <p className="
            text-4xl
            font-semibold
            ">
              Hello, <br/>I'm Phuykong Meng.
            </p>
          </div>

          <div className="
          h-fit
          w-full
          pb-9
          "
          id = "links_container">
            <hr />
            <div className="
            flex
            p-5
            justify-around
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
          </div>

          <PhoneAccordion />
        </motion.div>
      </Background>
    </main>
  )
}