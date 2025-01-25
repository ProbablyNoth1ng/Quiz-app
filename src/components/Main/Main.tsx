import React from "react";
import './Main.scss'


import Start from '../Start/Start'
import Selection from '../Selection/Selection'
import Survey from '../Survey/Survey'
import End from '../End/End'

import { NextPage } from "../../Store/currentPageSlice";
import { useAppSelector,useAppDispatch } from "../hooks";
// function useIsDarkMode() {
//     const theme = useTheme();
//     return theme.palette.mode === 'dark';
//   }

export default function Main(){
    const currentPage = useAppSelector((state) => state.currentPage.currentPage)    
    return (
        <>
            <main className="main">
                <Start className={currentPage === 0 ? "" : 'hidden'}/>
                <Selection className={currentPage === 1 ? "" : 'hidden'}/>
                <Survey className={currentPage === 2 ? "" : 'hidden'}/>
                <End className={currentPage === 3 ? "" : 'hidden'}/>
            </main>
        </>
    )
}
