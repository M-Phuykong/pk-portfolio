import React from 'react';
import { ReactFill } from 'akar-icons';

function getCurrentYear(){
    return new Date().getFullYear()
}

export default function Footer() {

    return (
        <div
        className="
        text-center
        w-full
        ">
            <p>
                © {getCurrentYear()} Phuykong Meng.
                Made with <ReactFill className="inline align-text-bottom" strokeWidth={2} size={20} />.
            </p>
        </div>
    );
}

