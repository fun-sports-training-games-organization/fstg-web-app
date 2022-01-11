import React, { ErrorInfo } from 'react';
import history from '../../../history';

class ErrorBoundary extends React.Component {
    constructor(props: { hasError: boolean }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        history.push('/server-error-500');
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
