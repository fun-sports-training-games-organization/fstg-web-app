import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
    onSubmit?: () => void;
    isCreate?: boolean;
    createTranslationKey?: string;
    saveTranslationKey?: string;
    variant?: 'text' | 'contained' | 'outlined' | undefined;
    isFullWidth?: boolean;
    testId?: string;
};

const SubmitButton = ({
    onSubmit = () => console.log('SubmitButton Clicked'),
    isCreate = true,
    createTranslationKey = 'global.create',
    saveTranslationKey = 'global.save',
    variant = 'contained',
    isFullWidth = true,
    testId = 'submit_button'
}: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Button data-testid={testId} variant={variant} fullWidth={isFullWidth} onClick={onSubmit}>
            {t(isCreate ? createTranslationKey : saveTranslationKey)}
        </Button>
    );
};

export default SubmitButton;
