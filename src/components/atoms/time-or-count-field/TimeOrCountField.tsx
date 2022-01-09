import { RecordType, ResultValue } from '../../../model/Basics.model';
import CountField from '../../molecules/inputs/count-field/CountField';
import TimeField from '../../molecules/inputs/time-field/TimeField';

type TimeOrCountFieldProps = {
    show?: boolean;
    resultType?: RecordType;
    timeLabel?: string;
    value?: number;
    itemToUpdate?: ResultValue;
    updateItem?: (item: ResultValue) => void;
    countFieldMin?: number;
    countFieldMax?: number;
};

const TimeOrCountField = ({
    show = true,
    resultType = 'COUNT_BASED',
    timeLabel: label = 'Time label',
    value = 0,
    itemToUpdate,
    updateItem,
    countFieldMin = 0,
    countFieldMax = 99999
}: TimeOrCountFieldProps): JSX.Element => {
    return (
        <>
            {show &&
                (resultType === 'COUNT_BASED' ? (
                    <CountField
                        min={countFieldMin}
                        max={countFieldMax}
                        value={value}
                        setValue={(value: number) => {
                            itemToUpdate && updateItem && updateItem({ ...itemToUpdate, resultValue: value });
                        }}
                    />
                ) : (
                    <TimeField
                        label={label}
                        value={value}
                        setValue={(seconds: number) => {
                            itemToUpdate && updateItem && updateItem({ ...itemToUpdate, resultValue: seconds });
                        }}
                    />
                ))}
        </>
    );
};

export default TimeOrCountField;
