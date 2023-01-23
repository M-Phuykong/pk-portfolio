import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Download, GithubFill, LinkedinBoxFill } from "akar-icons"

import "../styles/index.scss"

import Background from "../components/Background"

import self_photo from "../images/self_photo.jpg"
import resume from "../download/Phuykong_Meng_Resume.pdf"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main className="overflow-hidden">
        <Background>
            <div className="
            flex
            w-full h-screen
            py-28 px-36
            items-center">
                <div className="overlay w-full h-full grid grid-cols-4">
                  <div className="grid col-span-3">
                    <div
                    className="
                    p-6
                    mt-5
                    text-white font-bold
                    text-5xl
                    "
                    id="intro_text_box">
                        Hello, <br />
                        I'm Phuykong Meng!


                    </div>

                  </div>

                  <div className="
                  grid grid-rows-2
                  ">
                    <div
                    className="
                    w-full
                    content-center
                    border border-solid border-white border-2
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
                    border border-solid border-white border-2
                    "
                    id="bottom_container">

                      <div 
                        className="
                        text-white
                        text-xl
                        p-4
                        "
                        id="sub_intro_text_box">
                          I am a Computer Science student at Temple University, PA. <br />
                          Currently, I work as a software developer at the Neural Engineer Data Consortium Research Lab (NEDC). 
                          I have an interest in full stack development that focuses on interactive UX/UI design and also Machine Learning. 
                      </div>

                      <div 
                      className="
                      flex
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

                </div>
            </div>
        </Background>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>


  
