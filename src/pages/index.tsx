import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import "../styles/index.scss"

import Background from "../components/Background"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <div className="main_container">

        <Background>
            <h1 className="text-white ">ABC</h1>
        </Background>

      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
