import React from 'react'
import { Download, GithubFill, LinkedinBoxFill } from "akar-icons"

import "../styles/index.scss"

import Background from './Background'
import Card from './Card'

import self_photo from "../images/self_photo.jpg"
import resume from "../download/Phuykong_Meng_Resume.pdf"

type Props = {

}

export default function DesktopLayout({}: Props) {
  return (
    <main className="md:overflow-hidden">
        <Background>
            <div className="
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
                grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12
                grid-rows-1 md:grid-rows-3 lg:grid-rows-6
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
                  col-span-7 lg:col-span-12
                  row-span-1
                  mt-5 2xl:mt-10
                  ml-[15rem] 2xl:ml-[20rem]
                  ">
                    <h1 className='text-5xl 2xl:text-6xl'> Hello, I'm Phuykong Meng.</h1>
                  </div>

                  <div className="
                  flex
                  relative
                  w-full
                  justify-between
                  col-span-7 lg:col-span-12
                  row-span-5
                  p-5 2xl:p-12
                  ">
                    <Card text="About Me">

                      <div
                        className="
                        flex
                        items-center
                        text-sm 2xl:text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                        <p className="
                        text-base 2xl:text-2xl
                        ">
                            A sophomore at Temple University, PA pursuing a degree Computer Science. <br />
                            I work as a software developer at the Neural Engineer Data Consortium Research Lab (NEDC).
                        </p>
                      </div>

                      <div
                      className="
                      flex
                      left-0
                      h-fit
                      absolute
                      bottom-0
                      w-full
                      justify-evenly
                      p-6
                      "
                      id="link_container">
                          <a href={resume} download>
                          <Download strokeWidth={2} size={30} className="
                          h-6 2xl:h-fit
                          w-6 2xl:w-fit"/>
                          </a>

                          <a href="https://github.com/M-Phuykong" target="_blank">
                          <GithubFill strokeWidth={2} size={30} className="
                          h-6 2xl:h-fit
                          w-6 2xl:w-fit"/>
                          </a>

                          <a href="https://www.linkedin.com/in/phuykong-meng/" target="_blank">
                          <LinkedinBoxFill strokeWidth={2} size={30} className="
                          h-6 2xl:h-fit
                          w-6 2xl:w-fit"/>
                          </a>
                      </div>

                    </Card>

                    <Card
                      text="Experience">
                      <div
                        className="
                        flex
                        items-center
                        text-sm 2xl:text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                        <p className="
                        text-base 2xl:text-2xl
                        ">
                            Experience section
                        </p>
                      </div>

                    </Card>

                    <Card
                      text="Projects">

                      <div
                        className="
                        flex
                        items-center
                        text-sm 2xl:text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                        <p className="
                        text-base 2xl:text-2xl
                        ">
                            projects section
                        </p>
                      </div>

                    </Card>

                  </div>

                </div>
            </div>
        </Background>
    </main>
  )
}