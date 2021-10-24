import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

import * as fs from 'fs';

test('renders learn react link', async () => {
    await initializeTestEnvironment({
        projectId: 'demo-project-1234',
        firestore: {
            rules: fs.readFileSync('firestore.rules', 'utf8')
        }
    });
    const renderComponent = () => render(<App />);
    it('should render app component without crashing', () => {
        const { container } = renderComponent();
        expect(container).toBeInTheDocument();
    });
});
