import { useTranslation } from 'react-i18next';
import { TypographyOverrideable } from './TypographyOverridable';

type Props = {
    translationKey: string;
};

const Title = ({ translationKey }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <TypographyOverrideable fontSize={'twentySix'} fontWeight={'sixHundred'} variant="h5">
            {t(translationKey)}
        </TypographyOverrideable>
    );
};

export default Title;
