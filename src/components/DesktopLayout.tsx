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
            py-44 px-36 xl:px-48
            items-center">
                {/* <div className="overlay
                w-full
                h-full h-max-full
                grid grid-cols-12 grid-rows-12">

                  <div className="
                  h-full h-max-full
                  grid col-span-9 grid-rows-12
                  ">

                    <div
                    className="
                    flex
                    items-center

                    p-8 px-16

                    text-white font-bold
                    text-5xl

                    row-span-1
                    "
                    id="intro_text_box">
                      <p>
                        Hello, <br />
                        I'm Phuykong Meng!
                      </p>

                    </div>

                    <div className="

                    p-16 pt-2
                    justify-evenly
                    row-span-4
                    grid grid-cols-2 gap-x-10
                    ">
                      <Card
                      text="Projects">
                      </Card>

                      <Card
                      text="Experience">

                      </Card>

                    </div>

                  </div>

                  <div className="
                  grid col-span-3 grid-rows-12
                  ">
                    <div
                    className="
                    w-full
                    content-center
                    border border-solid border-white border-2
                    row-span-6
                    p-5
                    "
                    id="top_container">

                      <img src={self_photo}
                      alt="Phuykong_Meng_photo"
                      className="
                      block
                      mx-auto mt-5
                      h-72 w-72
                      border border-solid border-white border-2
                      rounded-full" />
                    </div>

                    <div
                    className="
                    relative
                    h-full
                    grid grid-rows-3 row-span-6
                    border border-solid border-white border-2
                    "
                    id="bottom_container">

                      <div
                        className="
                        flex
                        items-center
                        row-span-2
                        text-white
                        text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                          <p>
                            I'm a sophomore at Temple University, PA pursuing Computer Science. <br />
                            I work as a software developer at the Neural Engineer Data Consortium Research Lab (NEDC).
                          </p>
                      </div>

                      <div
                      className="
                      flex
                      h-fit
                      justify-evenly
                      p-6
                      "
                      id="link_container">
                        <a href={resume} download>
                          <Download strokeWidth={2} size={36} className="h-fit w-fit text-white "/>
                        </a>

                        <a href="https://github.com/M-Phuykong" target="_blank">
                          <GithubFill strokeWidth={2} size={36} className="h-fit w-fit text-white"/>
                        </a>

                        <a href="https://www.linkedin.com/in/phuykong-meng/" target="_blank">
                          <LinkedinBoxFill strokeWidth={2} size={36} className="h-fit w-fit text-white"/>
                        </a>
                      </div>


                    </div>

                  </div>

                </div> */}
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
                  -top-28
                  left-16
                  h-2/6 l:h-2/5
                  w-auto
                  border border-solid border-white border-8
                  shadow-xl
                  rounded-full" />

                  <div className="
                  col-span-7 lg:col-span-12
                  row-span-1
                  p-8
                  ml-64
                  ">
                    <h1 className='text-5xl'> Hello, I'm Phuykong Meng.</h1>
                  </div>

                  <div className="
                  flex
                  col-span-7 lg:col-span-12
                  row-span-5
                  p-12
                  ">
                    <Card text="info">

                      <div
                        className="
                        flex
                        items-center
                        text-sm xl:text-base 2xl:text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                        <p>
                            A sophomore at Temple University, PA pursuing Computer Science. <br />
                            I work as a software developer at the Neural Engineer Data Consortium Research Lab (NEDC).
                        </p>
                      </div>

                      <div
                      className="
                      flex
                      h-fit
                      justify-evenly
                      p-6
                      "
                      id="link_container">
                          <a href={resume} download>
                          <Download strokeWidth={2} size={30} className="
                          h-6 xl:h-fit
                          w-6 xl:w-fit"/>
                          </a>

                          <a href="https://github.com/M-Phuykong" target="_blank">
                          <GithubFill strokeWidth={2} size={30} className="
                          h-6 xl:h-fit
                          w-6 xl:w-fit"/>
                          </a>

                          <a href="https://www.linkedin.com/in/phuykong-meng/" target="_blank">
                          <LinkedinBoxFill strokeWidth={2} size={30} className="
                          h-6 xl:h-fit
                          w-6 xl:w-fit"/>
                          </a>
                      </div>

                    </Card>

                    <Card
                      text="Experience">

                    </Card>

                    <Card
                      text="Projects">

                    </Card>

                  </div>

                </div>
            </div>
        </Background>
    </main>
  )
}