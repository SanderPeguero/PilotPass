import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import classNamees from "./Result.module.css"
import { Box } from "@mui/material";
import TableResult from "../../components/Table/TableResult";
import { serverTimestamp } from "firebase/database";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

let quizaerodinamica = [

    {
        id: 1,
        subject: 'Aerodinámica',
        intentos: 12,
        pregunta: [
            {
                id: 1,
                question: "Qué condiciones puede provocar que el altímetro indique una altura menor que la altitud verdadera?",
                answer1: "Una altitud más alta que la altitud normal.",
                answer2: "Una presión atmosférica más baja que la normal",
                answer3: "Una temperatura más caliente que la normal",
                righanswer: "Una temperatura más caliente que la normal",
                answerselect: "Una temperatura más caliente que la normal",
                questioncorrect: true
            },
            {
                id: 2,
                question: "Si un vuelo es hecho desde un área de alta presión, hasta un área de baja presión sin haber ajustado el altímetro, este podría indicar:",
                answer1: "Más baja que la altitud actual sobre el nivel del mar.",
                answer2: "Más alta que la altura sobre el nivel del mar.",
                answer3: "La altura actual sobre el nivel del mar.",
                righanswer: "Más alta que la altura sobre el nivel del mar.",
                answerselect: "2",
                questioncorrect: false
            },
            {
                id: 3,
                question: "El ángulo entre la línea de cuerda de un perfil aerodinámico y el viento relativo se conoce como el ángulo de:",
                answer1: "Sustentación.",
                answer2: "Ataque.",
                answer3: "Incidencia.",
                righanswer: "Ataque.",
                answerselect: "Ataque.",
                questioncorrect: true
            },
        ]
    },

    {
        id: 2,
        subject: 'Controles de Vuelos',
        intentos: 4,
        pregunta: [
            {
                id: 1,
                question: "Qué condiciones puede provocar que el altímetro indique una altura menor que la altitud verdadera?",
                answer1: "Una altitud más alta que la altitud normal.",
                answer2: "Una presión atmosférica más baja que la normal",
                answer3: "Una temperatura más caliente que la normal",
                righanswer: "Una temperatura más caliente que la normal",
                answerselect: "Una temperatura más caliente que la normal",
                questioncorrect: false
            },
            {
                id: 2,
                question: "Si un vuelo es hecho desde un área de alta presión, hasta un área de baja presión sin haber ajustado el altímetro, este podría indicar:",
                answer1: "Más baja que la altitud actual sobre el nivel del mar.",
                answer2: "Más alta que la altura sobre el nivel del mar.",
                answer3: "La altura actual sobre el nivel del mar.",
                righanswer: "Más alta que la altura sobre el nivel del mar.",
                answerselect: "2",
                questioncorrect: false
            },
            {
                id: 3,
                question: "El ángulo entre la línea de cuerda de un perfil aerodinámico y el viento relativo se conoce como el ángulo de:",
                answer1: "Sustentación.",
                answer2: "Ataque.",
                answer3: "Incidencia.",
                righanswer: "Ataque.",
                answerselect: "Ataque.",
                questioncorrect: true
            },
        ]
    },


]



const Result = (props) => {

    const findquestions = quizaerodinamica.find((person) => person.id ==  props.match.params.id)

    return (
        <div className="row cards col-lg-4 col-md-7 col-sm-12 pl-2" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
            <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', margin: "2%" }}>
                <h2 className="col-lg-4 col-md-7 col-sm-12">Quiz: {findquestions.subject}</h2>
            </div>

            <div className="card col-lg-4 col-md-7 col-sm-12">
                <div className="card-header">
                    <p className="row" style={{ color: 'white' }}>
                        <span className="">Questions</span>
                        
                         <span className="" style={{ float: 'right' }}>
                            27 Jan, 2023
                        </span> 
                    </p>
                </div>
                <hr />
                <div className="pt-8">
                    {
                        findquestions.pregunta.map((pre) => {
                            return (
                                <div key={pre.id} className="text-white pt-3">
                                    <div className="text-[1rem]">
                                        <span className="flex  flex-row font-bold ">
                                            {pre.id}. {pre.question}
                                            {pre.questioncorrect == true &&  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 pl-2 fill-green-500">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg> }
                                           {pre.questioncorrect == false &&    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 pl-2 fill-red-500">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg> }

                                         
                                        </span>
                                    </div>
                                    <div className="pt-4 pl-6">

                                        <p className=" ">1. {pre.answer1}</p>
                                        <p className="">2. {pre.answer2}</p>
                                        <p className="">3. {pre.answer3}</p>

                                     
                                        
                                        <span className="pt-2 pb-8 flex  flex-row">
                                           Correct answer: {pre.righanswer}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 pl-2 fill-green-500">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg> 



                                        </span>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className=" flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 whitespace-normal">
                            Showing 1 to {findquestions.intentos < 10 && <span>{findquestions.intentos}</span>} {findquestions.intentos > 10 && 10} of {findquestions.intentos} attempts
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <a href="#" className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span className="sr-only">Previous</span>
                           
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </a>
                              
                                <a href="#" aria-current="page" className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                                <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                                <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>
                                <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>
                                <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a>
                                <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">9</a>
                                <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">10</a>
                                <a href="#" className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}

export default withRouter(Result)

{/* {
                    findquestions.pregunta.map((pregu) => {

                        return(
                            <div key={pregu.id}>
                                <h4>{pregu.question}</h4>
                            </div>
                        )
                    })
                      } */}

{/* <TableResult/> */ }
{/*Aqui mostrar todos los resultado del quiz */ }
{/* <div className="card-header">
<p className="row" style={{color:'white'}}> 
<span className="">Question</span>  
                       
</p>
</div> */}

//     <Box className={classNamees.Quiz}>
//     <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem' , paddingBottom: '100px'}}>
//         <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{color:'white', margin: "2%"}}>
//             <h2 className="col-lg-4 col-md-7 col-sm-12">Grades: </h2>
//         </div>
//         <div className="card col-lg-4 col-md-7 col-sm-12">
//             <hr />
//             <div>

//             </div>
//         </div>
//     </div>
// </Box>


{/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                        <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                    </div>

                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing
                            <span className="font-medium">1</span>
                                to
                            <span className="font-medium">10</span>
                                of
                            <span className="font-medium">97</span>
                                results
                        </p>
                     </div>
                    <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span className="sr-only">Previous</span>
          
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </a>
      
                    <a href="#" aria-current="page" className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                    <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                    <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">...</span>
                    <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">8</a>
                    <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">9</a>
                    <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">10</a>
                    <a href="#" className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                    <span className="sr-only">Next</span>
         
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                    </a>
                    </nav>
                    </div>
                    </div>
</div>*/}