import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { BrowserView, MobileView } from 'react-device-detect';

import DesktopLayout from "../components/DesktopLayout"
import MobileLayout from "../components/MobileLayout";


const IndexPage: React.FC<PageProps> = () => {

  return (
    <div className="">
      <BrowserView>
        <DesktopLayout></DesktopLayout>
      </BrowserView>
      <MobileView>
        <MobileLayout></MobileLayout>
      </MobileView>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Phuykong Meng</title>



