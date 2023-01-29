import React from "react";
import { useParams } from "react-router-dom";
import classes from "./Result.module.css"
import { Box } from "@mui/material";
import TableResult from "../../components/Table/TableResult";

export function withRouter(Children) {
    return (props) => {
        const match = {params:useParams() };
        return <Children {...props} match={match}/>
    }
}

const Result = (props) => {

    return(
        <Box className={classes.Quiz}>
        <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem' , paddingBottom: '100px'}}>
            <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{color:'white', margin: "2%"}}>
                <h2 className="col-lg-4 col-md-7 col-sm-12">Grades: </h2>
            </div>

            <div className="card col-lg-4 col-md-7 col-sm-12">
                {/* <div className="card-header">
                    <p className="row" style={{color:'white'}}> 
                        <span className="">Question</span>  
                       
                    </p>
                </div> */}
                <hr />

                <div>
                    <TableResult/>
                 {/*Aqui mostrar todos los resultado del quiz */}
                </div>
            </div>
        </div>
    </Box>
    )
}

export default withRouter(Result)