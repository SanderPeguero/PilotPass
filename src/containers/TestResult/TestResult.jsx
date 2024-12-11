import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./TestResult.module.css";
import Loader from "../../components/UI/Loader/Loader";
import Alert from '../../components/Alert/Snackbar'
import styles from '../../pages/Tests/QuizList/Card.module.css'
import result1 from '../../Images/result1.jpg'
import Navbar from "../../components/Navigation/navbar"

const result = [

    {
        id: 1,
        subject: 'Aerodinámica',
        grade: 7,
        totalquestions: 12,
        correct: 7,
        incorrect: 5,
        fecha: '6 Jan, 2023',
    },

    {
        id: 2,
        subject: 'Controles de vuelo',
        grade: 6,
        totalquestions: 6,
        correct: 6,
        incorrect: 0,
        fecha: '13 Jan, 2023',
    },

    {
        id: 3,
        subject: 'Estructura de Avion',
        grade: 4,
        totalquestions: 4,
        correct: 4,
        incorrect: 0,
        fecha: '20 Jan, 2023',
    },

    {
        id: 4,
        subject: 'Factores Aero-Médicos',
        grade: 9,
        totalquestions: 12,
        correct: 9,
        incorrect: 3,
        fecha: '27 Jan, 2023',
    },

    {
        id: 5,
        subject: 'Instrumentos de Vuelo',
        grade: 12,
        totalquestions: 12,
        correct: 12,
        incorrect: 0,
        fecha: '3 Feb, 2023',
    },

    {
        id: 6,
        subject: 'Operaciones en Aeropuertos',
        grade: 75,
        totalquestions: 141,
        correct: 75,
        incorrect: 66,
        fecha: '10 Feb, 2023',
    },

    {
        id: 7,
        subject: 'Perfomance de Aeronaves',
        grade: 15,
        totalquestions: 17,
        correct: 15,
        incorrect: 2,
        fecha: '17 Feb, 2023',
    },

    {
        id: 8,
        subject: 'Peso y Balance',
        grade: 3,
        totalquestions: 3,
        correct: 3,
        incorrect: 0,
        fecha: '24 Feb, 2023',
    },

    {
        id: 9,
        subject: 'Principios de Vuelo',
        grade: 4,
        totalquestions: 4,
        correct: 4,
        incorrect: 4,
        fecha: '3 Mar, 2023',
    },

    {
        id: 10,
        subject: 'Reglamento Aeronauticos Dominicano',
        grade: 78,
        totalquestions: 93,
        correct: 78,
        incorrect: 15,
        fecha: '10 Mar, 2023',
    },

    {
        id: 11,
        subject: 'Servicio de Meteorologia',
        grade: 25,
        totalquestions: 42,
        correct: 25,
        incorrect: 17,
        fecha: '24 Mar, 2023',
    },

    {
        id: 12,
        subject: 'Sistema de Aeronave',
        grade: 4,
        totalquestions: 4,
        correct: 4,
        incorrect: 0,
        fecha: '7 Apr, 2023',
    },

    {
        id: 13,
        subject: 'Teoria del Clima',
        grade: 50,
        totalquestions: 65,
        correct: 50,
        incorrect: 15,
        fecha: '14 Apr, 2023',
    },

    {
        id: 14,
        subject: 'Test Final',
        grade: 0,
        totalquestions: 90,
        correct: 0,
        incorrect: 0,
        fecha: '14 Apr, 2023',
    },


];


const TestResult = () => {

    const renderResult = () => {

        return (
            <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pl-2">
            <table className="w-[580px] text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3  text-left">Courses</th>
                            <th scope="col" className="px-6 py-3  text-left">Grades</th>
                            <th scope="col" className="px-6 py-3  text-left">Correct</th>
                            <th scope="col" className="px-6 py-3  text-left">Incorrect</th>
                            <th scope="col" className="px-6 py-3  text-left">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            result.map((res) => {
                                return (
                                  
                                    <tr key={res.id}     className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th  scope="row" className="px-6 py-4 font-medium w-[20px] text-left text-gray-900 whitespace-nowrap dark:text-white">{res.subject}</th>
                                        <th  scope="row" className="px-6 py-4 font-medium w-[20px] text-left text-gray-900 whitespace-nowrap dark:text-white">{res.grade}/{res.totalquestions}</th>
                                        <th  scope="row" className="px-6 py-4 font-medium w-[20px] text-left text-gray-900 whitespace-nowrap dark:text-white">{res.correct}</th>
                                        <th  scope="row" className="px-6 py-4 font-medium w-[20px] text-left text-gray-900 whitespace-nowrap dark:text-white">{res.incorrect}</th>
                                        <th  scope="row" className="px-6 py-4 font-medium w-[20px] text-left text-gray-900 whitespace-nowrap dark:text-white">{res.fecha}</th>
                                        <td  scope="row" className="px-6 py-4 text-left ">
                                            <NavLink to={"/result/" + res.id}  className="font-medium w-[20px]   text-blue-600 dark:text-blue-500 hover:underline">Ver</NavLink>
                                        </td>
                                    </tr>
                                )
                            })
                         }
                    </tbody>
                </table>

            </div>
            </div>
        )
    }

    return (
        <>
          <Navbar className="mt-[-4rem] z-[1]"/>
            <div>
                <div className="cards">
                    <div className=" " style={{ paddingTop: '4rem', paddingBottom: '100px' }}>
                        <h1 className="flex justify-center md:justify-start pl-6 text-[1.5rem] text-white">Private Pilot Result</h1>

                        <div className="">
                            <div className=" col-lg-4 col-md-12 col-sm-12"  >
                                {/* <h2 className="card-title col-lg-4 col-md-7 col-sm-12 text-[1.5rem]" style={{ color: 'white', fontWeight: '300' }}>Private Pilot Result</h2> */}
                                <div className={""}>
                                    {renderResult()}
                                 </div>
                            </div>
                        </div>
                        {/* <hr style={{margin:'30px 0'}}/> */}     
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestResult


  // <NavLink key={res.id} to={"/result/" + res} style={{ width: '100%', height: '100%', textDecoration: 'none' }}>
                        //     <div >
                        //         <div className={styles.card}>
                        //             <img className={styles.cardImage} src={res.image} />

                        //             <div className={styles.cardInfoContainer}>

                        //                 <h3 className={styles.cardInfoh3}>
                        //                     {res.subject} Rating
                                            
                        //                 </h3>

                        //                 <div style={{ width: "278px", textAlign: 'left', color: 'gray' }}>
                        //                     <div >  Right Answered: {res.RightAnswered}/{res.questionquantity}</div>
                        //                     <br />
                        //                 </div>

                        //             </div>
                        //         </div>
                        //     </div>
                        // </NavLink>