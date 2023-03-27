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
        };
        onChange.mockReset();
    });

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
        expect(container).toHaveTextContent('Test Date Picker');
        const inputElement = container.querySelector('#custom-date-picker-input');
        await act(async () => {
            inputElement && userEvent.type(inputElement, '31.12.2020');
            await wait();
            const input = container.querySelector('input');
            input && fireEvent.change(input, { target: { value: '31.12.2020' } });
            await wait();
        });
    });

    it('should render Date Picker component expect handle date change to be called with specific datetime format', () => {
        props.withTime = true;
        props.inputFormat = 'yyyy-MM-dd hh:mm';
        const { container } = renderComponent();
        expect(container).toHaveTextContent('Test Date Picker');
        const input = container.querySelector('input');
        input && fireEvent.change(input, { target: { value: '2021-12-31 13:00' } });
    });

    it('should render DaysPicker Calendar when calendar icon is clicked', () => {
        initTestWithSpecifiedScreenWidth(800);
        const { getByTestId, debug, getByRole } = renderComponent();
        const calendarIcon = getByTestId('CalendarIcon');
        fireEvent.click(calendarIcon);
        // here expect the calendar popup to show up
        expect(getByRole('presentation')).toBeInTheDocument();
    });
});
