import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
    onClick?: () => void;
    isCreate?: boolean;
    createTranslationKey?: string;
    saveTranslationKey?: string;
    variant?: 'text' | 'contained' | 'outlined' | undefined;
    isFullWidth?: boolean;
    testId?: string;
    color?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
};

const SubmitButton = ({
    onClick,
    isCreate = true,
    createTranslationKey = 'global.create',
    saveTranslationKey = 'global.save',
    variant = 'contained',
    isFullWidth = true,
    testId = 'submit_button',
    color = 'primary'
}: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Button
            data-testid={testId}
            variant={variant}
            fullWidth={isFullWidth}
            onClick={onClick}
            type={'submit'}
            color={color}
        >
            {t(isCreate ? createTranslationKey : saveTranslationKey)}
        </Button>
    );
};

export default SubmitButton;
