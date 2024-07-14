import React, {useState, useEffect, useRef} from 'react'
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image"
import gsap from 'gsap';

import { useTheme } from '../context/ThemeContext'

export const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
    },
};

export const dropUpVariants = {
    hidden: {
        x: -100,
        display:"none",
    },
    visible:  (i : number) => ({
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 6,
            stiffness: 75,
            delay: i * 0.1 + 0.2,
        }
    }),
    exit : {
        x: "100vw",
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    }
};

const scaleAnimation = {

    initial: {scale: 0, x:"-50%", y:"-50%"},

    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},

    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

function Modal({modal, projects } : {modal: any, projects: any}) {

    const { active, ind } = modal;
    const { theme, updateTheme } = useTheme()

    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);

    useEffect( () => {
        //Move Container
        let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
        let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
        //Move cursor
        let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
        let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
        //Move cursor label
        let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
        let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})

        window.addEventListener('mousemove', (e) => {
        const { pageX, pageY } = e;
            xMoveContainer(pageX)
            yMoveContainer(pageY)
            xMoveCursor(pageX)
            yMoveCursor(pageY)
            xMoveCursorLabel(pageX)
            yMoveCursorLabel(pageY)
        })
    }, [])

    return (
        <>
            <motion.div
            ref={modalContainer}
            className="absolute flex bg-white items-center justify-center
            pointer-events-none overflow-hidden h-[250px] w-[400px]"
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}>

                <div style={{top: ind * -100 + "%"}}
                className="absolute transition-[top] duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)];">
                {
                    projects.map( (project: any, index: number) => {
                    return <div
                    className="flex items-center justify-center h-full w-full"
                    key={`modal_${index}`}>
                        <img
                        src={`/projects/${project.img_name}`}
                        alt='project photo'
                        // placeholder="blurred"
                        // layout='constrained'
                        className='h-[250px] w-[400px]'/>
                    </div>
                    })
                }
                </div>
            </motion.div>
            <motion.div ref={cursor}
            style={{
                color: theme.text_color,
                background: theme.main_color
            }}
            className='w-[80px] h-[80px] rounded-full absolute flex items-center
            justify-center pointer-events-none z-10 font-bold text-lg'
            variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}
            ></motion.div>

            <motion.div ref={cursorLabel}
            style={{
                color: theme.text_color,
                background: theme.main_color
            }}
            className='w-[80px] h-[80px] rounded-full absolute flex items-center
            justify-center pointer-events-none z-10 font-bold text-lg bg-transparent'
            variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}
            >
                View
            </motion.div>
        </>
    );
}

function GithubCard({ind, data, setModal} : {ind : number, data : any, setModal: any}) {

    const { theme, updateTheme } = useTheme()

    return (
    <Reorder.Item
        value={data}
        key={data.id}

        style={{
            borderColor: theme.main_color,
            color: theme.text_color
        }}
        className="flex flex-1 flex-col
        min-w-96 p-3 my-2
        border border-solid
        rounded-lg text-start "

        onMouseEnter={() => setModal({active: true, ind})}
        onMouseLeave={() => setModal({active: false, ind})}

    >
        <div className='text-base'>
            <svg className='inline-block h-5 w-5 mr-2' viewBox='0 0 16 16'>
                <path style={{fill: theme.main_color}}
                d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
            <a
            style={{color: theme.main_color}}
            href={data.html_url} target="_blank">
                {data.name}
            </a>
        </div>
        <div
        style={{color: theme.sub_color}}
        className='min-h-5 my-[5px] text-sm'>
            {data.description}
        </div>
        <div className='flex text-sm'>
            <svg className='inline-block h-full w-5 mr-1' viewBox='0 0 16 16' xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="65%" r="5" style={{ fill : theme.sub_color}} />
            </svg>
            {data.language}
        </div>
    </Reorder.Item>
    )
}


interface ProjectInterface extends Object {
    id: number;
    name: string;
    description: string;
    language: string;
    html_url: string;
}

export default function ProjectCards({data} : {data : [ProjectInterface]}) {

    const [projects, setProjects] = useState<ProjectInterface[]>(data)
    const [modal, setModal] = useState({active: false, ind: 0})

    return (
        <>
            <Reorder.Group
            axis='y'
            values={projects}
            onReorder={setProjects}
            style={{  }}
            >
                {projects.map((project) => (
                    <GithubCard
                        key = {project.id}
                        ind= {project.id}
                        data={project}
                        setModal={setModal}
                    />
                ))}
            </Reorder.Group>

            <Modal modal={modal} projects={projects}/>
        </>

    );
}
