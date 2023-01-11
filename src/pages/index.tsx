import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import "../styles/index.scss"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <div className="second_div">
        {/* <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div> */}


        <div className="introduction"> I'm Phuykong Meng</div>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
