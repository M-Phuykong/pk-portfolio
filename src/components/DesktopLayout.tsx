import React, { useEffect, useRef, useState } from 'react'
import self_photo from '../images/self_photo.jpg'
import gsap from 'gsap'
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Download, TriangleRightFill } from 'akar-icons';

import "../styles/index.scss"
import "../styles/desktopLayout.scss"

// components
import ThemeDropdown from './ThemeDropdown'
import Footer from './Footer'
import ProjectCards from './ProjectCards'
import ExperienceMenu from './ExperienceMenu'

// Hook
import { useTheme } from '../context/ThemeContext'


function ProfileTitleHeader({ theme } : {theme : any}) {

  const container = useRef(null);
  const q = gsap.utils.selector(container)

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(q("span"), {
      duration: 1,
      y: 100,
      ease: "power4.out",
      delay: 0.5,
      skewY: 7,
      stagger: {
        amount: 0.3
      },
      autoAlpha: 0,
    })

  }, [])

  return(
    <div ref = {container}  style={{color: theme.text_color}}
    className='text-lg md:text-4xl font-medium'>

      <div className='line relative h-16 overflow-hidden'>
        <span className='text absolute invisible'>
          Hello,
        </span>
      </div>

      <div className='line relative h-16 overflow-hidden'>
        <span style={{color: theme.main_color}}
        className='text absolute overflow-hidden invisible'>
          <span style={{color: theme.text_color}}>I'm </span>
          Phuykong Meng
          <span style={{color: theme.text_color}}>.</span>
          <span className='hover:animate-handwave origin-[70%_70%] inline-block'>👋</span>
        </span>
      </div>

    </div>
    )
}

function ProfileDescription({ theme } : {theme : any}) {
  const container = useRef(null);
  const q = gsap.utils.selector(container)

  useEffect(() => {
    const tl = gsap.timeline();


    tl.fromTo(q("span"),
      {autoAlpha: 0},
      { autoAlpha: 1,
        delay: 1.2,
        duration: 0.5
      });

  }, []);

  return(
      <div ref={container} style={{color: theme.sub_color}}
          className='
          text-sm
          lg:text-base
          2xl:text-lg'>
          <span className='invisible'>
            A junior at Temple University, PA pursuing a degree in Computer Science.
            I have a keen interest in Machine Language and Front-End Development.
          </span>
      </div>
    );
}

function ProfileLink({ theme } : {theme : any}) {

  const container = useRef(null);
  const q = gsap.utils.selector(container)

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(q("a"),
    { autoAlpha: 0, x: -80 },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.05 * 4,
      ease: "power2.inOut",
      stagger: 0.3,
      delay: 1.5
    },
    0);

  }, [])

  return(
    <div ref={container} style={{color: theme.main_color}}
    className='flex gap-10
      text-sm 2xl:text-sm'>
      <a className='flex items-center'>
        Resume
        <Download strokeWidth={2} size={20} className='ml-2'/>
      </a>
      <a className='flex items-center' href="https://www.linkedin.com/in/phuykong-meng/" target="_blank">
        Linked In
        <TriangleRightFill strokeWidth={2} size={20}  className='ml-1'/>
      </a>
      <a className='flex items-center' href="https://github.com/M-Phuykong" target="_blank">
        Github
        <TriangleRightFill strokeWidth={2} size={20} className='ml-1'/>
      </a>
      <a className='flex items-center'>
        Email
        <TriangleRightFill strokeWidth={2} size={20} className='ml-1'/>
      </a>
    </div>
    )
}

function  Accordion(
  { i,
    expanded,
    setExpanded,
    title,
    theme,
    order,
    children} : any) {

  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header initial={false}
        animate={{ color: isOpen ? theme.main_color : theme.main_color }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className='flex items-center justify-between
        text-5xl 2xl:text-5xl
        font-bold '>

            {title}

            <motion.span
            key = "button"
            animate = { {
                rotate: isOpen ? 90 : 0,
            }}
            transition={ { duration : 0.5}}
            >
                <TriangleRightFill strokeWidth={2} size={32} id="label_button"/>
            </motion.span>
      </motion.header>

      <AnimatePresence mode='wait'>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"

            variants={{
              open: { opacity: 1, height: "auto"},
              collapsed: { opacity: 0, height: 0}
            }}
            transition={{ duration: 1.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{order: order}}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};


const resumeData = [
    {
        company : "NEDC",
        position : "Software Developer",
        period : "Aug 2021 - Present",
        details: [
          "Developed a common data structure using Python that unifies several input data into one, which cuts down development time by half and improved code maintainability and reusability",
          "Supervised 3 team members with weekly standup and code reviews using emails and Zoom, speeding up progress and maintaining the group’s standard",
          "Evaluated, and refactored two machine learning systems for production to ensure results reproducibility on other machines",
          "Redesigned, and built the main webpage using Figma, HTML, CSS, and Javascript,  which improved users flow and content organization",
        ]
    },
        {
        company : "Strados Labs",
        position : "Software Developer Intern",
        period : "June 2023 - August 2023",
        details: [
        "Created a web application using HTML, SCSS, Javascript, D3.js that visualizes UMAP data mapping which cuts down QA time by 50%",
        "Integrated API calls to the backend server which connects to an Amazon S3 bucket that fetches and uploads files, adding a layer of security in protecting patients’ data"]
    },

];

export default function DesktopLayout() {

  const { theme, updateTheme } = useTheme();
  const [expanded, setExpanded] = useState<false | number>(0);

  const leftContainer = useRef<React.RefObject<HTMLDivElement>>();
  const rightContainer = useRef<React.RefObject<HTMLDivElement>>();

  useEffect(() => {

  }, [])

  return (
    <div
    style={{background: theme.background,
          transition: "all .5s ease",
          WebkitTransition: "all .5s ease",
          MozTransition: "all .5s ease"
    }}
    className='
    min-h-screen
    h-full
    w-screen
    flex
    flex-col
    '
    >
      <div
      style={{color: theme.main_color}}
      className='basis-10 p-3'>
        <ThemeDropdown />
      </div>

      <motion.div
      id="content_container"
      className='
      lg:max-w-[75%]
      min-h-screen
      h-full
      self-center
      flex
      flex-col lg:flex-row
      lg:grow
      items-center justify-center
      2xl:mx-56
      gap-10 2xl:gap-20'>

        <div
        className='flex flex-1 flex-col gap-10'>
          <img
          style={{borderColor: theme.main_color}}
          src={self_photo}
          draggable={false}
          alt="Phuykong_Meng_photo"
          id="self_photo"
          className={`
          2xl:h-56
          2xl:w-56
          w-2/5
          h-2/5
          self-start
          border border-solid border-4
          rounded-full`} />

          <ProfileTitleHeader theme={theme} />

          <ProfileDescription theme={theme} />

          <ProfileLink theme={theme} />

        </div>

        <div
        className='flex flex-1 flex-col text-center h-fit justify-center'>

            <Accordion i = {0}
            expanded={expanded}
            setExpanded = {setExpanded}
            title="EXPERIENCES"
            theme={theme}
            order = {0}  >
              <ExperienceMenu data={resumeData}/>
            </Accordion>

            <Accordion i = {1}
              expanded={expanded}
              setExpanded = {setExpanded}
              title="PROJECTS"
              theme={theme}
              order = {0} >
                <ProjectCards />
            </Accordion>
        </div>

      </motion.div>

      <div
      style={{color: theme.main_color}}
      className='basis-10 p-3'>
        <Footer />
      </div>

    </div>
  )
}

