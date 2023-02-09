import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import DesktopLayout from "../components/DesktopLayout"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <DesktopLayout></DesktopLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>


  
