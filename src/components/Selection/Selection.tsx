import React,{useState, useEffect} from "react";
import './Selection.scss'
import clsx from 'clsx';
import { Menu as BaseMenu, MenuProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton, MenuButtonProps } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, MenuItemProps } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { useAppSelector,useAppDispatch } from "../hooks";
import { setQuestions } from "../../Store/questionsSlice";
import { NextPage } from "../../Store/currentPageSlice";
import {Props} from '../../types'
import Button from '@mui/material/Button';


type Category = {
    "id":number,
    "name":string,
}
// type Questions = {
//   "question":string,
//    "correct_answer":string,
//    "category":string,

// }




const Selection : React.FC<Props> = (props) => {
    
    const [category,setCategory] = useState<string>("")
    const [difficulty,setDifficulty] = useState<string>("")
    const [type,setType] = useState<string>("")
    const [categories,setCategories] = useState<Category[]>([])
    const [isLoading,setIsLoading] = useState(true)
    // const [questions,setQuestions] = useState<Questions[]>([])

    const questions = useAppSelector((state) => state.questions.questions)
    const dispatch = useAppDispatch()
    console.log(questions)
    useEffect(() =>{
      async function fetchCategories() {

        try{
          setIsLoading(true)
          const response = await fetch("https://opentdb.com/api_category.php")
          const data = await response.json()
          console.log(data)
          setCategories(data.trivia_categories)
        } catch(error){
          console.error("Error fetching categories:", error);
        } finally{
          setIsLoading(false)
        }
        

      }
   
      fetchCategories()
    },[])

    
    const createHandleMenuClick = (menuItem: string,category: string) => {
        return () => {

        switch(category){
            case "Category":
            setCategory(menuItem)
            break;

            case "Difficulty":
            setDifficulty(menuItem)
            break;

            case "Type":
            setType(menuItem)
            break;
        }
          console.log(`Clicked on ${menuItem}`);
        };
      };

      async function handleStart(){
        if(category.length !==0 && difficulty.length !==0 && type.length !==0 ){
         let response;
            for (const key in categories) {
              if(categories[key].name === category){

                 console.log(categories)
                 console.log(key)
                 console.log(`https://opentdb.com/api.php?amount=10&category=${categories[key].id}&difficulty=${difficulty.toLowerCase() }&type=${type === "True / False" ? "boolean" : "multiple"}&encode=base64`)
                 response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categories[key].id}&difficulty=${difficulty.toLowerCase() }&type=${type === "True / False" ? "boolean" : "multiple"}&encode=base64`)
                 
        
                 const data = await response.json();
                 console.log(data.results)
                
                 if (data.results.length !== 0  ) {
                  dispatch(setQuestions(data.results));
                  dispatch(NextPage())
                } else {
                  alert(`Sorry but we don't have this type of questions`);
                  break
                }
                 console.log(questions)
              }
            }
            

            
            
            
            // console.log(data)
            
        } 
      }
    return (
        <>
        { !isLoading ?
        <div className={`selection ${props.className === "hidden" ? "hidden" : "show"}`}>
                    {/* <div className={`${isDarkMode ? 'dark' : ''}`}> */}
                    <div className="wrap   mx-auto">
                      <div className="select_container flex justify-evenly  mx-auto">
                          <Dropdown >
                              <MenuButton>{category.length === 0 ? "Select Category" : category}</MenuButton>
                              <Menu className="scroll">
                                {categories.map((category) =>(
                                  <MenuItem className="category text-white text-2xl font-medium " key={category.id} onClick={createHandleMenuClick(category.name,'Category')}>{category.name}</MenuItem>
                                ))}
                              </Menu>
                          </Dropdown>
                          <Dropdown>
                              <MenuButton>{difficulty.length === 0 ? "Select Difficulty" : difficulty}</MenuButton>
                              <Menu>
                              <MenuItem className="text-2xl font-medium" onClick={createHandleMenuClick('Easy','Difficulty')}>Easy</MenuItem>
                              <MenuItem className="text-2xl font-medium" onClick={createHandleMenuClick('Medium','Difficulty')}>
                                  Medium
                              </MenuItem>
                              <MenuItem className="text-2xl font-medium" onClick={createHandleMenuClick('Hard','Difficulty')}>Hard</MenuItem>
                              </Menu>
                          </Dropdown>
                          <Dropdown>
                              <MenuButton>{type.length === 0 ? "Select Type" : type}</MenuButton>
                              <Menu>
                              <MenuItem className="text-2xl font-medium" onClick={createHandleMenuClick('Multiple Choice','Type')}>Multiple Choice </MenuItem>
                              <MenuItem className="text-2xl font-medium" onClick={createHandleMenuClick('True / False','Type')}>
                              True / False
                              </MenuItem>
                              </Menu>
                          </Dropdown>
                          
                      </div>
                     
                      <Button variant="contained" color="success" onClick={handleStart} className="beg_start" >Start</Button>       
                    </div>
                    
                 
                </div>

            : 
            <>
            
            </>
            
          }
        </>


    )
}

export default Selection


const resolveSlotProps = (fn: any, args: any) =>
    typeof fn === 'function' ? fn(args) : fn;
  
  const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    // Replace this with your app logic for determining dark modes
    // const isDarkMode = useIsDarkMode();
  
    return (
      <BaseMenu
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.root,
              ownerState,
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                `{isDarkMode ? 'dark' : ''} z-10`,
                resolvedSlotProps?.className,
              ),
            };
          },
          listbox: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.listbox,
              ownerState,
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                'text-sm box-border font-sans p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 min-w-listbox shadow-md dark:shadow-slate-900',
                resolvedSlotProps?.className,
              ),
            };
          },
        }}
      />
    );
  });
  
  const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
    (props, ref) => {
      const { className, ...other } = props;
      return (
        <BaseMenuButton
          ref={ref}
          className={clsx(
            'cursor-pointer text-3xl font-sans box-border rounded-lg font-semibold px-8 py-4 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none shadow-sm active:shadow-none',
            className,
          )}
          {...other}
        />
      );
    },
  );
  
  const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseMenuItem
        ref={ref}
        className={clsx(
          'list-none px-8 py-4 rounded-lg cursor-default select-none last-of-type:border-b-0 focus:shadow-outline-purple focus:outline-0 focus:bg-slate-100 focus:dark:bg-slate-800 focus:text-slate-900 focus:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700',
          className,
        )}
        {...other}
      />
    );
  });



