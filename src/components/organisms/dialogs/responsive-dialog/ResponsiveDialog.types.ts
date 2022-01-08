import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

export interface OwnProps {
    title?: string | JSX.Element | ReactNode;
    message?: string;
    content?: string | JSX.Element | ReactNode;
    dialogActions?: JSX.Element;
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    onClose?: () =>
        | void
        | {
              bivarianceHack(event: Record<string, unknown>, reason: 'backdropClick' | 'escapeKeyDown'): void;
          }['bivarianceHack'];
    autoFocus?: 'confirm' | 'cancel';
    showCloseButton?: boolean;
    fullScreenOverride?: boolean;
}

export type ResponsiveDialogProps = Omit<DialogProps, 'onClose' | 'title'> & OwnProps;
