import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import DescriptionAlert from './Alert.jsx'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({ severity, title, detail }) => {

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const Alerts = () => {
        if(severity == 1){
            return(
                <Alert onClose={handleClose} variant='filled' severity="success">
                    <AlertTitle>{title}</AlertTitle>
                    {detail}
                </Alert>
            )
        }else if(severity == 2){
            return(
                <Alert onClose={handleClose} variant='filled' severity="info">
                    <AlertTitle>{title}</AlertTitle>
                    {detail}
                </Alert>
            )
        }else if(severity == 3){
            return(
                <Alert onClose={handleClose} variant='filled' severity="warning">
                    <AlertTitle>{title}</AlertTitle>
                    {detail}
                </Alert>   
            )
        }else{
            return(
                <Alert onClose={handleClose} variant='filled' severity="error">
                    <AlertTitle>{title}</AlertTitle>
                    {detail}
                </Alert>
            )
        }
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
                </Alert> */}
                {/* <DescriptionAlert severity={severity} title={title} detail={detail} onClose={handleClose}/> */}
                {
                  Alerts()  
                }
                {/* <div>Hola Mundo</div> */}
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}

export default SnackbarAlert