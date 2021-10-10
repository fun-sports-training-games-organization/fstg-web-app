import { useState, useEffect, useRef } from 'react';

const useScript = (src: string): { value: string; payload?: HTMLScriptElement | ErrorEvent | undefined } => {
    const [state, setState] = useState<{ value: string; payload?: HTMLScriptElement | ErrorEvent | undefined }>({
        value: 'loading',
        payload: undefined
    }); // value { loading | loaded | error }
    const script = useRef<HTMLScriptElement>();

    useEffect(() => {
        script.current = document.createElement('script');
        script.current.src = src;
        script.current.async = true;

        const onScriptLoad = () => setState({ value: 'loaded' });

        const onScriptError = (e: ErrorEvent) => {
            script.current?.remove();
            setState({ value: 'error', payload: e });
        };

        script.current.addEventListener('load', onScriptLoad);
        script.current.addEventListener('error', onScriptError);

        document.body.appendChild(script.current);
        return () => {
            script.current?.removeEventListener('load', onScriptLoad);
            script.current?.removeEventListener('error', onScriptError);
        };
    }, [src]);

    return state;
};

export default useScript;
