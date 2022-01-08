import React from 'react';
import DatePicker from './DatePicker';
import { DatePickerProps } from './DatePicker.types';

export default {
    title: 'atoms/DatePicker',
    component: DatePicker,
    args: {
        disabled: false,
        label: 'Date Picker',
        invalidDateMessage: 'Invalid Date',
        fullWidth: true,
        loading: false,
        locale: 'de',
        // clearable: true,
        hideClearButton: false,
        // openTo: 'year',
        withTime: false,
        disableFuture: false,
        disablePast: false,
        noBorder: false,
        inputFormat: 'dd.MM.yyyy',
        mask: '__.__.____'
        // minDate: new Date('1000-01-01'),
        // maxDate: new Date('9999-12-31')
        // handleDateChange: (date) => console.log(date),
        // selectedDate: new Date()
    },
    argTypes: {
        locale: {
            name: 'locale',
            options: ['en', 'de', 'fr', 'it'],
            type: { control: 'select' }
        },
        openTo: {
            name: 'openTo',
            options: ['year', 'date'],
            type: { control: 'select' }
        }
    }
};

export const datePicker = (args: DatePickerProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
    const { value, onChange, onError, ...rest } = args;
    const [val, setVal] = React.useState<unknown>([new Date(2022, 0, 1), new Date(2022, 0, 1)]);

    return <DatePicker value={val} onChange={(date: unknown) => setVal(date)} {...rest} />;
};
