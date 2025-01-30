import React from "react";
import './Start.scss'
import {Props} from '../../types'
import { useAppDispatch } from "../hooks";
import { NextPage } from "../../Store/currentPageSlice";
import Button from '@mui/material/Button';

const Start : React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    
    return (
        <>
        <div className={`start ${props.className === 'hidden' ? 'hidden' : 'show'}`}>
            <p className="min-w-screen text-6xl 2xl:text-5xl xl:text-3xl lg:text-2xl uppercase text-white title flex justify-center  passion  ">do u brave enough? Take a quiz</p> 
            <Button variant="contained" onClick={() => dispatch(NextPage())} className="beg_start" >Start</Button>
        </div>
        </>
    )
}

export default Start    