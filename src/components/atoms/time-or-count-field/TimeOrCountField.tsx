import { FormLabel, Stack } from '@mui/material';
import { AmountValue, RecordType, ResultValue } from '../../../model/Basics.model';
import CountField from '../../molecules/inputs/count-field/CountField';
import TimeField from '../../molecules/inputs/time-field/TimeField';

type TimeOrCountFieldProps = {
    show?: boolean;
    resultType?: RecordType;
    label?: string;
    value?: number;
    itemToUpdate?: ResultValue | AmountValue;
    propertyToUpdate?: 'resultValue' | 'amountValue';
    updateItem?: (item: ResultValue | AmountValue) => void;
    countFieldMin?: number;
    countFieldMax?: number;
};

const TimeOrCountField = ({
    show = true,
    resultType = 'COUNT_BASED',
    label = 'Label',
    value = 0,
    itemToUpdate,
    propertyToUpdate = 'resultValue',
    updateItem,
    countFieldMin = 0,
    countFieldMax = 99999
}: TimeOrCountFieldProps): JSX.Element => {
    const formLabel = <FormLabel sx={{ mr: '1rem' }}>{label}</FormLabel>;

    return (
        <>
            {show && (
                <Stack spacing={2}>
                    {label && formLabel}
                    <Stack direction={'row'} alignItems={'center'}>
                        {resultType === 'COUNT_BASED' ? (
                            <>
                                <CountField
                                    min={countFieldMin}
                                    max={countFieldMax}
                                    value={value}
                                    setValue={(value: number) => {
                                        itemToUpdate &&
                                            updateItem &&
                                            updateItem({ ...itemToUpdate, [propertyToUpdate]: value });
                                    }}
                                />
                            </>
                        ) : (
                            <TimeField
                                value={value}
                                setValue={(seconds: number) => {
                                    itemToUpdate &&
                                        updateItem &&
                                        updateItem({ ...itemToUpdate, [propertyToUpdate]: seconds });
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
            )}
        </>
    );
};

export default TimeOrCountField;
