import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../redux/slice/alert.slice';

function Alert(props) {
    const { color, message } = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    useEffect(() => {
        if (message !== '') {
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
            });
            const timeRef = setTimeout(()=>{
                dispatch(resetAlert)
            },2000)
            return ()=> clearInterval(timeRef);
          
        }
    }, [message]);



            return (
                <div>

                </div>
            );
        }

        export default Alert;