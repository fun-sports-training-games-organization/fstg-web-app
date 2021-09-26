import { FC, useState } from 'react';
import { auth } from '../../config/firebase';
import PasswordField from '../../components/PasswordField';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/TextField';
import { Button } from '@material-ui/core';
import AuthContainer from '../../components/AuthContainer';

const LoginPage: FC = () => {
    // const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signInWithEmailAndPassword = () => {
        if (error !== '') {
            setError('');
        }
        // setAuthenticating(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                // logging.info(result);
                console.log(result);
                // setAuthenticating(false);
                history.push('/home');
            })
            .catch((error) => {
                console.error(error);
                // TODO : error handling...
                // setAuthenticating(false);
            });
    };

    return (
        <AuthContainer header={'Login'}>
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
            <Button onClick={signInWithEmailAndPassword} variant={'contained'} color={'primary'} fullWidth>
                LOGIN
            </Button>
        </AuthContainer>
    );
};

export default LoginPage;
