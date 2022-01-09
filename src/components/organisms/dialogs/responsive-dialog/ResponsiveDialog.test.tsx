import React from 'react';
import { render } from '@testing-library/react';

import ResponsiveDialog from './ResponsiveDialog';
import { ResponsiveDialogProps } from './ResponsiveDialog.types';
import userEvent from '@testing-library/user-event';
import { Button, Typography } from '@mui/material';

describe('<ResponsiveDialog> component test with React Testing Library', () => {
    let props: ResponsiveDialogProps;
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const onClose = jest.fn();

    beforeEach(() => {
        props = {
            title: 'Hello',
            content: 'World',
            open: true,
            onConfirm,
            onCancel,
            onClose,
            confirmText: 'Confirm',
            cancelText: 'Cancel'
        };
    });

    const renderComponent = () => render(<ResponsiveDialog data-testid={'responsive-dialog'} {...props} />);

    it('should render ResponsiveDialog correctly and pressing the actions should trigger events', () => {
        const { getByTestId } = renderComponent();
        const confirmButton = getByTestId('responsive-dialog-confirm-button');
        userEvent.click(confirmButton);
        expect(onConfirm).toBeCalledTimes(1);
        const cancelButton = getByTestId('responsive-dialog-cancel-button');
        userEvent.click(cancelButton);
        expect(onCancel).toBeCalledTimes(1);
        userEvent.keyboard('{esc}');
        expect(onClose).toBeCalledTimes(1);
    });

    it('should render Dialog correctly with custom content element and custom button actions', async () => {
        props.content = <Typography>Custom Text Element</Typography>;
        props.dialogActions = (
            <>
                <Button onClick={onCancel}>Custom Cancel Button</Button>
                <Button onClick={onConfirm}>Custom Confirm Button</Button>
            </>
        );
        const { findByText } = renderComponent();
        expect(await findByText('Custom Text Element')).toBeInTheDocument();
        expect(await findByText('Custom Cancel Button')).toBeInTheDocument();
        expect(await findByText('Custom Confirm Button')).toBeInTheDocument();
    });

    it('should render Dialog correctly with custom content element and close icon button', async () => {
        props.content = <Typography>Custom Text Element</Typography>;
        props.showCloseButton = true;
        const { findByText, findByTestId } = renderComponent();
        expect(await findByText('Custom Text Element')).toBeInTheDocument();
        expect(await findByTestId('CloseIcon')).toBeInTheDocument();
    });
});
