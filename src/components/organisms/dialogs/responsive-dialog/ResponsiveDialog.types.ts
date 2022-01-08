/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogProps } from '@mui/material';
import { ResponsiveStyleValue, Theme } from '@mui/system';
import { ReactNode } from 'react';

export interface OwnProps {
    title?: string | JSX.Element | ReactNode;
    message?: string;
    messageFontWeight?:
        | ResponsiveStyleValue<string | (number & any) | undefined>
        | ((theme: Theme) => ResponsiveStyleValue<string | (number & any) | undefined>);
    content?: string | JSX.Element | ReactNode;
    dialogActions?: JSX.Element;
    dialogActionsJustifyContent?: string;
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
