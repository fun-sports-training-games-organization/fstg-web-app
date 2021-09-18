import { FC, useState } from 'react';
import { auth } from '../../config/firebase';
import PasswordField from '../../components/PasswordField';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/TextField';
import { Button } from '@material-ui/core';
import logger from '../../logging/logger';
import AuthContainer from '../../components/AuthContainer';

const RegistrationPage: FC = () => {
    // const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signUpWithEmailAndPassword = () => {
        if (error !== '') {
            setError('');
        }
        // setRegistering(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                // logging.info(result);
                console.log(result);
                // setRegistering(false);
                history.push('/login');
            })
            .catch((error) => {
                console.error(error);
                // TODO : error handling...
                // setRegistering(false);
            });
    };

    return (
        <AuthContainer header={'Registration Page'}>
            <TextField
                id={'email-field'}
                label={'Email'}
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <PasswordField
                id={'password-field'}
                label={'Password'}
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <PasswordField
                id={'confirm-password-field'}
                label={'Confirm Password'}
                value={confirmPassword}
                onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    logger.warn('hello warn');
                }}
            />
            <Button variant={'contained'} color={'primary'} fullWidth onClick={() => signUpWithEmailAndPassword()}>
                Sign Up
            </Button>
        </AuthContainer>
    );
};

export default RegistrationPage;
