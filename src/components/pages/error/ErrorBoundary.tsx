import React, { ErrorInfo, ReactNode } from 'react';
import { toErrorPage } from '../../../util/navigation-util';

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component {
    constructor(props: ErrorBoundaryState) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.log(error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can also log the error to an error reporting service
        console.error(error);
        console.error(errorInfo);
        toErrorPage();
    }

    render(): ReactNode {
        return this.props.children;
    }
}

export default ErrorBoundary;
