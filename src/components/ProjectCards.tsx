import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence, delay, Reorder } from "framer-motion";

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

function GithubCard({ind, data} : {ind : number, data : any}) {

    const { theme, updateTheme } = useTheme()

    return (
    <Reorder.Item
        value={data}
        key={data}

        style={{
            borderColor: theme.main_color,
            color: theme.text_color
        }}
        className="flex flex-1 flex-col
        min-w-96 p-3 my-2
        border border-solid
        rounded-lg text-start "
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


const baseURL = (repo : string) => {
    return `https://api.github.com/repos/M-Phuykong/${repo}`
}

function ProjectList() {
    const [repoData, setRepoData] = useState<any>([]);

    //TODO: remove token and add to env file
    const repos = [
        baseURL("pk-portfolio"),
        baseURL("TokiniAndyBot"),
        baseURL("synthboard-react"),
        baseURL("OwlHack2023"),
        baseURL("Hamming_Code_Correction_Detection"),
    ]

        function fetchRepo(repo: string) {
        fetch(repo, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`
            }
        })
        .then(res => res.json())
        .then(json =>
            setRepoData((prevData : any) => [...prevData, json])
        )

        .catch(error => {
            console.log(error);
        });

    }

    useEffect(() => {
        repos.forEach((repo) => fetchRepo(repo))
    }, [])

    return (
        <>
            {
                repoData.map((data: any, ind : number) => {
                    return <GithubCard key={ind} ind={ind} data={data} />
                })
            }
        </>
        )
}

const projectsItems = [
    {
        id: 0,
        name: "pk-portfolio",
        html_url: "https://github.com/M-Phuykong/pk-portfolio",
        description: "Personal Portfolio",
        language: "TypeScript"
    },
    {
        id: 1,
        name: "TokiniAndyBot",
        html_url: "https://github.com/M-Phuykong/TokiniAndyBot",
        description: null,
        language: "Python"
    },
    {
        id: 2,
        name: "Synthboard",
        html_url: "https://github.com/M-Phuykong/synthboard-react",
        description: null,
        language: "TypeScript"
    },
    {
        id: 3,
        name: "Fit-tastic (OwlHacks 2023)",
        html_url: "https://github.com/M-Phuykong/OwlHack2023",
        description: null,
        language: "Javascript"
    },
    {
        id: 4,
        name: "ISIP Picone Press Website",
        html_url: "https://isip.piconepress.com/",
        description: "I created a website from scratch for the research lab \"ISIP Picone Press.\" The site features valuable research findings and updates. It's a user-friendly platform for sharing their work with the world.",
        language: "HTML / CSS / Javascript"
    }

]

export default function ProjectCards() {

    const [items, setItems] = useState(projectsItems)
    return (
        <Reorder.Group
        axis='y'
        values={items}
        onReorder={setItems}
        style={{  }}
        >
            {items.map((item) => (
                <GithubCard
                    key = {item.id}
                    ind= {item.id}
                    data={item}
                />
            ))}
        </Reorder.Group>

    );
}
