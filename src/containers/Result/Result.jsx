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
import { useState } from "react";

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
                questioncorrect: false
            },
            {
                id: 4,
                question: "El ángulo entre la línea de cuerda de un perfil aerodinámico y el viento relativo se conoce como el ángulo de:",
                answer1: "Sustentación.",
                answer2: "Ataque.",
                answer3: "Incidencia.",
                righanswer: "Ataque.",
                answerselect: "Ataque.",
                questioncorrect: true
            },
            {
                id: 5,
                question: "El ángulo entre la línea de cuerda de un perfil aerodinámico y el viento relativo se conoce como el ángulo de:",
                answer1: "Sustentación.",
                answer2: "Ataque.",
                answer3: "Incidencia.",
                righanswer: "Ataque.",
                answerselect: "Ataque.",
                questioncorrect: false
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




    const findquestions = quizaerodinamica.find((person) => person.id == props.match.params.id)

    return (
        <div>

            <div className="row cards pl-4 pr-4" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                <div className="card-header col-lg-4 col-md-7 col-sm-16" style={{ color: 'white', margin: "2%" }}>
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

                    <div className="pt-4">


                        {
                            findquestions.pregunta.map((pre) => {
                                return (
                                    <div key={pre.id} className="text-white">
                                        <div className="text-[1rem] ">
                                            <span className="flex  flex-row font-bold  ">
                                                {pre.id}. {pre.question}

                                                {/* Mostrar icono verde si es correcta */}

                                                {pre.questioncorrect == true &&
                                                    <span className="w-[20px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8  pl-2 fill-green-500">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                }

                                                {/* Mostrar icono rojo si es incorrecta*/}
                                                {pre.questioncorrect == false &&
                                                    <span className="w-[20px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 pl-2 fill-red-500">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>

                                                }


                                            </span>
                                        </div>
                                        <div className="pt-4 pl-6">

                                            <p className=" ">1. {pre.answer1}</p>
                                            <p className="">2. {pre.answer2}</p>
                                            <p className="">3. {pre.answer3}</p>



                                            <span className="pt-2 pb-8 flex   flex-row">
                                                Correct answer: {pre.righanswer}
                                                <span className="w-[20px]">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 pl-2 fill-green-500">
                                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                    </svg>
                                                </span>


                                            </span>
                                        </div>

                                    </div>
                                )
                            })
                        }

                       

                        <nav className="max-w-md" aria-label="Page navigation example">
                            <ul className="inline-flex -space-x-px">
                                <li>
                                    <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                                </li>
                            </ul>
                        </nav>

                    </div>




                </div>
            </div>

        </div>

    )
}

export default withRouter(Result)

