import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

// import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',
    ),
    createData(
        1,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',
    ),
    createData(
        2,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',),
    createData(
        3,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',),
    createData(
        4,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',),
    createData(
        5,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',),
    createData(
        6,
        'Aerodynamics',
        '7/12',
        '7',
        '5',
        '27 Jan, 2023',),

];

function preventDefault(event) {
    event.preventDefault();
}

export default function RatingStatistics({ setVer }) {

    const onClickVer = () => {
        setVer(true)
    }
    return (
        <React.Fragment>
            {/* <Title>Recent RatingStatistics</Title> */}
            <div className='table-responsive'>
                <Table size="small" className='table table-bordered'>
                    <TableHead >
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Course</TableCell>
                            <TableCell style={{ color: 'white' }}>Grades</TableCell>
                            <TableCell style={{ color: 'white' }}>Correct</TableCell>
                            <TableCell style={{ color: 'white' }}>Incorrect</TableCell>
                            <TableCell style={{ color: 'white' }}>Fecha</TableCell>
                            <TableCell style={{ color: 'white' }}>Revisar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ color: 'white' }}>{row.date}</TableCell>
                                <TableCell style={{ color: 'white' }}>{row.name}</TableCell>
                                <TableCell style={{ color: 'white' }}>{row.shipTo}</TableCell>
                                <TableCell style={{ color: 'white' }}>{row.paymentMethod}</TableCell>
                                <TableCell style={{ color: 'white' }}>{`${row.amount}`}</TableCell>
                                <TableCell style={{ color: 'white' }}><Button style={{ color: 'white' }} size="small" onClick={onClickVer}>Ver</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 
                </Table>
                <div >
                Total attempts: 7
                </div>
            </div>

            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more RatingStatistics
            </Link> */}
        </React.Fragment>
    );
}