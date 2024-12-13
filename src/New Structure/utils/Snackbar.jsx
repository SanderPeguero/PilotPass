//dependencies
import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import AlertTitle from '@mui/material/AlertTitle'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />
})

const SnackbarAlert = ({ severity, title, detail }) => {

    const [open, setOpen] = React.useState(true)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false)
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
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                {
                  Alerts()  
                }
            </Snackbar>
        </Stack>
    );
}

export default SnackbarAlert