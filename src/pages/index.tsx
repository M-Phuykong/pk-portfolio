import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import "../styles/index.scss"

import Background from "../components/Background"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
        <Background>
            <div className="flex w-full h-screen p-20 items-center">
                <div className="w-full h-96 overlay">
                  <h1 className="text-white">
                    Hi! I'm Phuykong Meng
                  </h1>

                </div>
            </div>
        </Background>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
