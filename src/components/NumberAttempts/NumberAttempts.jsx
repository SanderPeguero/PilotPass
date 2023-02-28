import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <h4 style={{color: 'white'}}>Number of Attemptss</h4>
      <Typography style={{color: 'white'}} component="p" variant="h4">
        7
      </Typography>
      <Typography style={{color: 'white'}}  sx={{ flex: 1 }}>
      Last attempt made on 27 January, 2023
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}