import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

function VListTab(props : any) {

    const { theme, updateTheme } = useTheme();

    const handleClick =  () => {
        props.onClick(props.index);
    };

    return (
        <li key={props.index}
        className='list-none text-left p-0'>
            <button
            className='
            h-10
            border-l-2 border-solid
            text-left
            py-0 px-3'
            onClick={handleClick}
            style={
            props.activeTabId === props.index
                ? { color: theme.main_color }
                : { color: theme.sub_color }
        }>
                {props.data.company}
            </button>
        </li>
    );
}

function VListContent(props : any) {
    let data = props.data;

    const { theme, updateTheme } = useTheme();

    return (
        <div
        key={props.index}
        className='text-left'
        style={
            props.activeTabId === props.index
                ? { display: "block" }
                : { display: "none" }
        }>
            <h4 className=''
            style={{ color : theme.text_color}}>
                {data.position}
            </h4>
            <h5 className=''
            style={{ color : theme.main_color}}>
                {data.period}
            </h5>

            {data.details.map((detail: string) => (
                <p className='mb-5'
                style={{color: theme.sub_color}}
                >
                    {detail}
                </p>
            ))}
        </div>
    );
}




export default function ExperienceMenu(props : any) {

    const [activeTabId, setActiveTabId] = useState(0);

    function onClick(id : number){
        setActiveTabId(id);
    }

    return (
        <div
        className="container relative max-w-full min-h-[30rem] mt-5">
            <div className='row'>
                <div className='col sm:col-3'>
                    <div>
                        <ul className='p-0'>
                            {props.data.map((job : any, index: number) => (
                                            <VListTab
                                            key={index}
                                            onClick={onClick}
                                            data={job}
                                            index={index}
                                            activeTabId={activeTabId}
                                            />
                                ))}
                        </ul>
                    </div>
                </div>
                <div className='col sm:col-9'>
                    {props.data.map((job: any, index: number) => (
                                <VListContent
                                data={job}
                                key={index}
                                index={index}
                                activeTabId={activeTabId}
                                />
                            ))}
                </div>
            </div>
            <span
                className={
                activeTabId === 0
                    ? "index1-chosen"
                    : activeTabId === 1
                    ? "index2-chosen"
                    : "index3-chosen"
                }
            >
                &nbsp;
            </span>
        </div>
        );
}