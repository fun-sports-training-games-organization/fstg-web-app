import React, { useCallback, useEffect /*, useRef*/ } from 'react';
import useScript from '../hooks/useScript';
import firebase from 'firebase';
const FIREBASEUI_CONTAINER_ID = 'firebaseui_container';

type Props = {
    auth: firebase.auth.Auth;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: any;
    lang: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    firebase: any;
};

function FirebaseUIAuth({ auth, config, lang, firebase }: Props): JSX.Element {
    const state = useScript(`scripts/firebase/firebase-ui-auth__${lang}.js`);
    // const container = useRef<any>();
    // const app = useRef<any>();

    useEffect(() => {
        if (firebase) {
            window.firebase = firebase;
        }
    }, [firebase]);

    const loadFirebaseUI = useCallback(async () => {
        // () => {
        const firebaseUI = window.firebaseui.auth.AuthUI.getInstance() || new window.firebaseui.auth.AuthUI(auth);

        firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
        state.value = 'reset';
    }, [auth, config, state]);
    useEffect(() => {
        /* if (state.value === 'loading') {
            return;
        }
        if (state.value === 'error') {
            throw state.payload;
        }*/

        switch (state.value) {
            case 'loading':
                return;
            case 'error':
                throw state.payload;
            case 'loaded':
                loadFirebaseUI().catch(console.error);
        }
        // loadFirebaseUI().catch(console.error);
        // console.log(i18n.language);
        // (async () => {
        //     try {
        //         if (app.current) {
        //             await app.current.delete();
        //         }
        //     } catch (e) {
        //         // ignore
        //     }
        //     if (container.current) {
        //         container.current = '';
        //     }
        //     const firebaseUI = window.firebaseui.auth.AuthUI.getInstance() || new window.firebaseui.auth.AuthUI(auth);
        //     firebaseUI.start(`#${FIREBASEUI_CONTAINER_ID}`, config);
        //     try {
        //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //         // @ts-ignore
        //         app.current = window.firebase.app('[DEFAULT]-firebaseui-temp');
        //     } catch (e) {
        //         //ignore
        //     }
        // })();
    }, [state, loadFirebaseUI]);

    return (
        <>
            <link
                type="text/css"
                rel="stylesheet"
                href={`https://www.gstatic.com/firebasejs/ui/5.0.0/firebase-ui-auth.css`}
            />
            <div
                // ref={container}
                id={FIREBASEUI_CONTAINER_ID}
            />
        </>
    );
}

export default FirebaseUIAuth;
