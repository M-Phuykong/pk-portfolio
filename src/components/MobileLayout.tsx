import React from 'react'

import Background from './Background'
import { PhoneAccordion } from './PhoneAccordion'

import self_photo from "../images/self_photo.jpg"
import resume from "../download/Phuykong_Meng_Resume.pdf"

import { GithubFill, LinkedinBoxFill, File } from 'akar-icons'

import "../styles/phoneLayout.scss"

export default function MobileLayout({}: Props) {
  return (
    <main>
      <Background>

        <div className="
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

        </div>
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
        pb-5
        "
        id = "links_container">
          <hr />
          <div className="
          flex
          p-5
          justify-around
          "
          id = "icon_container">
            <GithubFill size = {24}></GithubFill>
            <File size = {24} strokeWidth = {2} ></File>
            <LinkedinBoxFill size={24}></LinkedinBoxFill>
          </div>
          <hr />
        </div>

        <PhoneAccordion />

      </Background>
    </main>
  )
}