import React from "react";
import './End.scss'
import { useAppDispatch, useAppSelector } from "../hooks";
import {Props} from '../../types'

const End : React.FC<Props> = (props) => {
    const questions = useAppSelector((state) => state.questions.questions)
    const answers = useAppSelector((state) => state.questions.answers)
    const correct_answers = useAppSelector((state) => state.score.score)
    console.log(questions)
    return(
        <>
            <div className={`end ${props.className === "hidden" ? "hidden" : "show"}`}>
                <p className="end_text text-center text-5xl pb-5 pt-20 uppercase">Score - {correct_answers}/10</p>
                {questions.map((question,id) => (
                    <div className={`block_with_info mx-auto flex align-center  justify-center text-center py-5 ${answers[id] === question.correct_answer ? "right" : "wrong" }`}>
                        {/* <div className="block_wrap"> */}
                            <p className="end_text">Question - {atob(question.question)}</p>
                            
                            <p className="end_text">Correct answer - {atob(question.correct_answer)}</p>
                            <p className="end_text">Your answer - {answers[id]} </p>
                        {/* </div>   */}
                        
                    </div>
                ))}
                
            </div>
        
        </>
    )
}

export default End