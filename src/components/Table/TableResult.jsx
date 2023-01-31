import React from "react";
import styletable from './table.css'
import './table.css'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import NumberAttempts from "../NumberAttempts/NumberAttempts";
import RatingStatistics from "../RatingStatistics/RatingStatistics";


import { Route, Routes, Navigate } from 'react-router-dom'
import AnswerResult from "../AnswerResult/AnswerResult";
import Layout from "../../hoc/Layout/Layout";
import { useState } from "react";










const TableResult = () => {

    const [ver, setVer] = useState(false)

  
    return (
        <Box
            component="main"
            sx={{
                // backgroundColor: (theme) =>
                //     theme.palette.mode === 'dark'
                //         ? theme.palette.grey[100]
                //         : theme.palette.grey[900],
                flexGrow: 1,
                height: '70vh',
                overflow: 'auto',
            }}

            className="cardall"
        >
            {/* <Toolbar /> */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8}  >
                        <Paper style={{backgroundColor: 'transparent'}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <RatingStatistics setVer={setVer}/>

                        </Paper>
                    </Grid>
                    {/* Recent NumberAttempts */}
                    {/* <Grid item xs={12} md={4} lg={3}>
                        <Paper
                        style={{backgroundColor: 'transparent'}}
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <NumberAttempts />
                        </Paper>
                    </Grid> */}
                    {ver == true &&
                        <Grid item xs={12}>
                            <Paper style={{backgroundColor: 'transparent'}} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <AnswerResult/>

                            </Paper>
                        </Grid>
                    }

                </Grid>
            </Container>
        </Box>

    )
}

export default TableResult

{/* <div className="bodyresult">
                                <div>
                                    <h1>Aerodynamics Rating</h1>
                                    

                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope="col">Course</th>
                                                <th scope="col">Grades</th>
                                                <th scope="col">Correct</th>
                                                <th scope="col">Incorrect</th>
                                                <th scope="col">Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td data-label="Course">Aerodynamics</td>
                                                <td data-label="Grades">7/12</td>
                                                <td data-label="Correct">5</td>
                                                <td data-label="Incorrect">5</td>
                                                <td data-label="Fecha">1/26/2023</td>
                                            </tr>
                                            <tr>
                                                <td data-label="Course">Aerodynamics</td>
                                                <td data-label="Grades">10/12</td>
                                                <td data-label="Correct">10</td>
                                                <td data-label="Incorrect">2</td>
                                                <td data-label="Fecha">1/27/2023</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}