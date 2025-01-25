import React, { useState } from "react";
import './Survey.scss'
import { useAppSelector,useAppDispatch } from "../hooks";

import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { NextPage } from "../../Store/currentPageSlice";
import { setAnswers } from "../../Store/questionsSlice";
import { increaseScore } from '../../Store/scoreSlice'

import Button from '@mui/material/Button';
import {Props} from '../../types'

const Survey : React.FC<Props> = (props) => {
    const [currentId, setCurrentId] = useState<number>(0)
    const [textAnswer, setTextAnswer] = useState<string>("")
    const [score, setScore] = useState<number>(0);
    const questions = useAppSelector((state) => state.questions.questions)

    const dispatch = useAppDispatch()
    function nextQuestion(type){
 
    
      if(type === "textArea"){
        //dispatch textAnswer
        dispatch(setAnswers(textAnswer))
        atob(questions[currentId].correct_answer) ===  textAnswer ? dispatch(increaseScore()) : ''
        setTextAnswer("")
      } else {
        
        dispatch(setAnswers(type))
        console.log(questions[currentId].correct_answer)
        console.log(type)
        atob(questions[currentId].correct_answer) ===  type ? dispatch(increaseScore()) : ''
   
      }
      currentId !== 9 ? setCurrentId((cur) => cur+1) : dispatch(NextPage())
     
    }
    return(
        <>
            <div className={`survey ${props.className === "hidden" ? "hidden" : "show"}`}>
                <div className="question_block">
                       {questions.map((question,id) =>(
                                <p className={` question flex justify-center text-white text-2xl font-medium ${currentId === id ? "show" : "hidden"}`}  >{atob(question.question)}</p>
                        ))}
                    {
                      
                     questions.length !==0  ? 
                        atob(questions[0].type) === "multiple" ? (
                          <>
                              
                              <TextField label="InputText"  className="input_question " variant="standard" value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} />
                              {/* <button className=" mt-10 mx-auto " ></button> */}
                              <Button variant="contained" onClick={() => nextQuestion("textArea")} className="input_send mx-auto mt-10" >{currentId !== 9 ? "NEXT" : "END QUIZ"}</Button>
                          </>
                      )
                      : 
                      (
                          <>
                              
                              <div className="variants_block flex justify-evenly pt-20">
                                  <button className="answer_variant true text-white text-2xl font-bold"  onClick={() => nextQuestion("True")}>True</button>
                                  <button className="answer_variant false text-white text-2xl font-bold" onClick={() => nextQuestion("False")} >False</button>
                              </div>
                          </>
                      )
                    : ""
                  
                }
                </div>
                <p className="text-5xl text-white ttt font-bold">{currentId+1}/10</p>
            </div>
        
        </>
    )
}

export default Survey

const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#E0E3E7',
              '--TextField-brandBorderHoverColor': '#B2BAC2',
              '--TextField-brandBorderFocusedColor': '#6F7E8C',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&::before, &::after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });