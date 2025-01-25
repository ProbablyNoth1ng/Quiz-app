import React from "react";
import './Start.scss'
import {Props} from '../../types'
import { useAppDispatch } from "../hooks";
import { NextPage } from "../../Store/currentPageSlice";

const Start : React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    
    return (
        <>
        <div className={`start ${props.className === 'hidden' ? 'hidden' : 'show'}`}>
            <p className="text-7xl uppercase text-white title flex justify-center  ">do u brave enough? Take a quiz</p>
            <button className="btn text-white beg_start mt-20 mx-auto flex justify-center text-3xl" onClick={() => dispatch(NextPage())}>Start</button>
        </div>
        </>
    )
}

export default Start    