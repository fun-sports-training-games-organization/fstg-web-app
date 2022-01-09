import * as React from 'react';
import { FC } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponsiveDialog from '../../organisms/dialogs/responsive-dialog';

type NotYetImplementedDialogProps = {
    open?: boolean;
    onClose: () => void;
};
const NotYetImplementedDialog: FC<NotYetImplementedDialogProps> = ({
    onClose,
    open = false
}: NotYetImplementedDialogProps) => {
    const { t } = useTranslation();

    return (
        <ResponsiveDialog
            open={open}
            content={<Typography mt="1rem">{t('global.notYetImplemented')}</Typography>}
            onClose={onClose}
            showCloseButton={true}
        ></ResponsiveDialog>
    );
};

export default NotYetImplementedDialog;
