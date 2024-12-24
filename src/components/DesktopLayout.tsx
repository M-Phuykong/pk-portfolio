import React, { useEffect, useRef, useState, forwardRef, MouseEventHandler } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence} from "framer-motion";
import { Download, TriangleRightFill } from 'akar-icons';
import { StaticImage } from "gatsby-plugin-image"
import type { Icon } from 'akar-icons';

import "../styles/index.scss"
import "../styles/desktopLayout.scss"

// components
import ThemeDropdown from './ThemeDropdown'
import Footer from './Footer'
import ProjectCards from './ProjectCards'
import ExperienceMenu from './ExperienceMenu'
import Divider from './Divider';
import ChessPlayer from './ChessPlayer';

// hook
import { useTheme } from '../context/ThemeContext'

// data
import projectsData from '../data/projects.json'
import experiencesData from '../data/experiences.json'
import resume from "../download/Phuykong_Meng_Resume.pdf"

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
            A senior at Temple University, PA pursuing a degree in Computer Science.
            I have a keen interest in Machine Language and Front-End Development.
          </span>
      </div>
    );
}

function MagneticButton({children} : {children: any}) {

    const ref = useRef<any>(null);
    const [position, setPosition] = useState({x:0,y:0});

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const {height, width, left, top} = ref.current?.getBoundingClientRect();
        const middleX = clientX - (left + width/2)
        const middleY = clientY - (top + height/2)
        setPosition({x: middleX, y: middleY})

    }

    const reset = () => {
        setPosition({x:0, y:0})
    }

    const { x, y } = position;

    return (
        <motion.div
            className='flex items-center relative w-full'
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{x, y}}
            transition={{type: "spring", stiffness: 150, damping: 15, mass: 0.1}}
        >
            {children}
        </motion.div>
    )
}

const ProfileLinkItem = function (props : any) {

    const { text, link, icon} = props;

    return (
      <div className='flex cursor-pointer'>
        <a href={link} aria-label={props.text} target='_blank'>
          <MagneticButton>
            {text}
            {icon}
          </MagneticButton>
        </a>
      </div>
  );
};


function ProfileLink({ theme } : {theme : any}, ref : any) {

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

      <a className='flex items-center' download="Phuykong Meng Resume" href={resume} aria-label='resume' target='_blank'>
        Resume <Download strokeWidth={2} size={20} className='ml-2'/>
      </a>

      <ProfileLinkItem
      text='Linked In'
      link = "https://www.linkedin.com/in/phuykong-meng/"
      icon={<TriangleRightFill strokeWidth={2} size={20}  className='ml-1'/>}
      />

      <ProfileLinkItem
      text='Github'
      icon={<TriangleRightFill strokeWidth={2} size={20}  className='ml-1'/>}
      link="https://github.com/M-Phuykong"
      />

      <a className='flex items-center' aria-label='email' href='mailto: m.phuykong@gmail.com' target='_blank'>
        Email <TriangleRightFill strokeWidth={2} size={20}  className='ml-1'/>
      </a>

    </div>
    )
}

function Accordion(
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
      <motion.header
        style={{color: theme.main_color}}
        onClick={() => setExpanded(isOpen ? false : i)}

        variants={{
          open: { scale: 1, top: i * 100 + 100},
          collapsed: { scale: 0, top: -100 * i}
        }}
        initial="collapsed"
        animate="open"

        className='flex items-center justify-between
        text-5xl 2xl:text-5xl
        font-bold'>

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
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{order: order}}
            className='overflow-y-scroll max-h-[20rem] 2xl:max-h-[30rem]'
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default function DesktopLayout() {

  const { theme, updateTheme } = useTheme();
  const [projectItems, setProjectItems] = useState([])

  const [expanded, setExpanded] = useState<false | number>(0);


  const leftContainer = useRef<React.RefObject<HTMLDivElement>>();
  const rightContainer = useRef<React.RefObject<HTMLDivElement>>();


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
        <ChessPlayer theme={theme}/>
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

          <div
          className='
          h-56
          w-56
          '>
            <StaticImage
              src='../images/self_photo.jpg'
              alt='Phuykong Meng photo'
              placeholder="blurred"
              layout='constrained'
              style={{borderColor: theme.main_color}}
              className='
              h-full
              w-full
              self-start
              object-cover
              border border-solid border-4
              rounded-full'
            />
          </div>

          <ProfileTitleHeader theme={theme} />

          <Divider theme={theme} />

          <ProfileDescription theme={theme} />

          <ProfileLink theme={theme}/>
        </div>

        <motion.div
        variants= {{
          open: {
              transition: {
                  staggerChildren: 200,
                  delayChildren: 100,
              }
            }
        }}
        animate="open"
        className='flex flex-1 flex-col text-center h-fit justify-center overflow-hidden'>

            <Accordion i = {0}
            expanded={expanded}
            setExpanded = {setExpanded}
            title="EXPERIENCES"
            theme={theme}
            order = {0}  >
              <ExperienceMenu data={experiencesData}/>
            </Accordion>

            <Accordion i = {1}
              expanded={expanded}
              setExpanded = {setExpanded}
              title="PROJECTS"
              theme={theme}
              order = {0} >
                <ProjectCards data = {projectsData}/>
            </Accordion>

            <Accordion i = {2}
              expanded={expanded}
              setExpanded = {setExpanded}
              title="PUBLICATIONS"
              theme={theme}
              order = {0} >
                <div className='text-left' style={{color: theme.text_color}}>
                  <a
                  href='https://ieeexplore.ieee.org/abstract/document/10372731'
                  target='_blank' >
                    Thai, B., McNicholas, S., Shalamzari, S. S., Meng, P., & Picone, J. (2023). Towards a More Extensible Machine Learning Demonstration Tool. Proceedings of the IEEE Signal Processing in Medicine and Biology Symposium, 1–4.
                  </a>
                </div>
            </Accordion>

        </motion.div>

      </motion.div>

      <div
      style={{color: theme.main_color}}
      className='basis-10 p-3'>
        <Footer />
      </div>

    </div>
  )
}

