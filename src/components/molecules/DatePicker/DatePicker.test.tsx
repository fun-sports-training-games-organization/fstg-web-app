import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker from './DatePicker';
import { DatePickerProps } from './DatePicker.types';
import { wait } from '@testing-library/user-event/dist/utils';
import initTestWithSpecifiedScreenWidth from '../../../__tests__/util/InitTestWithSpecifiedScreenWidth';

describe('<DatePicker> component test with React Testing Library', () => {
    let props: DatePickerProps;
    const onChange = jest.fn();
    beforeEach(() => {
        props = {
            locale: 'de',
            label: 'Test Date Picker',
            onChange,
            value: null
            // invalidDateMessage: 'test invalid message'
        };
        onChange.mockReset();
    });

    // potentially related issue? But this fix does not work...
    // https://github.com/mui-org/material-ui-pickers/issues/2073
    // beforeEach(() => {
    //     // add window.matchMedia
    //     // this is necessary for the date picker to be rendered in desktop mode.
    //     // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    //     Object.defineProperty(window, 'matchMedia', {
    //         writable: true,
    //         value: (query: string): MediaQueryList => ({
    //             media: query,
    //             // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
    //             matches: query === '(pointer: fine)',
    //             onchange: () => {},
    //             addEventListener: () => {},
    //             removeEventListener: () => {},
    //             addListener: () => {},
    //             removeListener: () => {},
    //             dispatchEvent: () => false
    //         })
    //     });
    // });

    // afterEach(() => {
    //     delete window.matchMedia;
    // });

    // const RenderedDatePicker = (props: DatePickerProps): JSX.Element => {
    //     const [value, setValue] = React.useState<Date | null>(new Date());
    //     const { onChange, ...rest } = props;
    //     return (
    //         <DatePicker
    //             value={value}
    //             onChange={(newValue: Date | null) => {
    //                 setValue(newValue);
    //             }}
    //             {...rest}
    //             // views={['year', 'month', 'day']}
    //             // openTo="year"
    //         />
    //     );
    // };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderComponent = () => render(<DatePicker {...(props as any)} />);

    it('should render Date Picker component with label correctly', () => {
        props.value = new Date();
        props.mask = '__.__.____ __:__';
        props.withTime = true;
        const { container } = renderComponent();
        expect(container).toHaveTextContent('Test Date Picker');
    });

    it('should render Date Picker component expect handle date change to be called', async () => {
        props.value = new Date();
        props.mask = '__.__.____';
        delete props.locale;
        const { container, debug } = renderComponent();
        // const component = getByTestId('date-picker');
        expect(container).toHaveTextContent('Test Date Picker');
        // const input = container.querySelector('input');
        const inputElement = container.querySelector('#custom-date-picker-input');
        await act(async () => {
            inputElement && userEvent.type(inputElement, '31.12.2020');
            await wait();
            const input = container.querySelector('input');
            input && fireEvent.change(input, { target: { value: '31.12.2020' } });
            await wait();
        });
        debug();
    });

    it('should render Date Picker component expect handle date change to be called with specific datetime format', () => {
        props.withTime = true;
        props.inputFormat = 'yyyy-MM-dd hh:mm';
        const { container } = renderComponent();
        // const component = getByTestId('date-picker');
        expect(container).toHaveTextContent('Test Date Picker');
        const input = container.querySelector('input');
        input && fireEvent.change(input, { target: { value: '2021-12-31 13:00' } });
        // expect(getByDisplayValue('2021-12-31 13:00')).toBeInTheDocument();
        // expect(onChange).toBeCalledTimes(1);
    });

    it('should render DaysPicker Calendar when calendar icon is clicked', () => {
        initTestWithSpecifiedScreenWidth(800);
        const { getByTestId, debug, getByRole } = renderComponent();
        const calendarIcon = getByTestId('CalendarIcon');
        fireEvent.click(calendarIcon);
        // here expect the calendar popup to show up
        expect(getByRole('presentation')).toBeInTheDocument();
        debug();
    });
});
