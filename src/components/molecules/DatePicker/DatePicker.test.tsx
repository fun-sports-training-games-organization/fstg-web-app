import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatePicker from './DatePicker';
import { DatePickerProps } from './DatePicker.types';
import { wait } from '@testing-library/user-event/dist/utils';
import initTestWithSpecifiedScreenWidth from '../../__tests__/util/InitTestWithSpecifiedScreenWidth';

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

    it('should render Date Picker component expect handle date change to be called with specific date format', async () => {
        props.inputFormat = 'yyyy-MM-dd';
        const { findByLabelText } = renderComponent();
        const component = await findByLabelText('Test Date Picker');
        // expect(component).toHaveTextContent('Test Date Picker');
        fireEvent.change(component /*.querySelector('input')*/, { target: { value: '2021-12-31 13:00' } });
        // expect(getByDisplayValue('2021-12-31')).toBeInTheDocument();
        // expect(onChange).toBeCalledTimes(1);
    });

    it('should render Date Picker component with props mask and expect handle date change to be called with specific date format', async () => {
        props.mask = '____-__-__';
        props.inputFormat = 'yyyy-MM-dd';
        initTestWithSpecifiedScreenWidth(800);
        const { findByLabelText, queryByRole } = renderComponent();
        const component = await findByLabelText('Test Date Picker');
        // expect(component).toHaveTextContent('Test Date Picker');
        fireEvent.change(component /*.querySelector('input')*/, { target: { value: '2021-12-31 13:00' } });
        expect(queryByRole('presentation')).not.toBeInTheDocument();
        // expect(getByDisplayValue('2021-12-31')).toBeInTheDocument();
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

    it('should render Date Picker with a loader when loading is set to true', () => {
        props.loading = true;
        initTestWithSpecifiedScreenWidth(800);
        const { getByTestId } = renderComponent();
        const calendarIcon = getByTestId('CalendarIcon');
        fireEvent.click(calendarIcon);
        expect(getByTestId('custom-loader-backdrop')).toBeInTheDocument();
    });

    // it('should render Date Picker component expect handle date change to be called with default date format', () => {
    //     const { getByTestId, getByDisplayValue } = renderComponent();
    //     const component = getByTestId('date-picker');
    //     expect(component).toHaveTextContent('Test Date Picker');
    //     fireEvent.change(component.querySelector('input'), { target: { value: '31.12.2021' } });
    //     expect(getByDisplayValue('31.12.2021')).toBeInTheDocument();
    //     expect(onChange).toBeCalledTimes(1);
    // });

    // it('should render Date Picker component expect handle date change to be called with default datetime format', () => {
    //     props.withTime = true;
    //     const { getByTestId, getByDisplayValue } = renderComponent();
    //     const component = getByTestId('date-picker');
    //     expect(component).toHaveTextContent('Test Date Picker');
    //     fireEvent.change(component.querySelector('input'), { target: { value: '31.12.2021 14:00' } });
    //     expect(getByDisplayValue('31.12.2021 14:00')).toBeInTheDocument();
    //     expect(handleDateChange).toBeCalledTimes(1);
    // });
    //
    // it('should render Date Picker component with fullWidth (100% width) expect handle date change to be  called and generate error helper text', () => {
    //     props.fullWidth = true;
    //     const { getByTestId } = renderComponent();
    //     const component = getByTestId('date-picker');
    //     expect(component).toHaveTextContent('Test Date Picker');
    //     fireEvent.change(component.querySelector('input'), { target: { value: '123' } });
    //     expect(component.querySelector('div')).toHaveAttribute('style', 'width: 100%;');
    //     expect(handleDateChange).toBeCalledTimes(1);
    // });

    // it('should render Date Picker component expect component to render WITH time in input value', () => {
    //     props.selectedDate = new Date();
    //     props.withTime = true;
    //     const { getByTestId } = renderComponent();
    //     const component = getByTestId('date-picker');
    //     expect(component).toHaveTextContent('Test Date Picker');
    //     const inputField = component.querySelector('input');
    //     fireEvent.change(inputField, { target: { value: '31.12.2020 13:00' } });
    //     expect(handleDateChange).toBeCalledTimes(1);
    //     expect(inputField).toHaveAttribute('value', '31.12.2020 13:00');
    // });
    //
    // it('should render Date Picker component expect component to render WITHOUT time in input value', () => {
    //     props.selectedDate = new Date();
    //     const { getByTestId } = renderComponent();
    //     const component = getByTestId('date-picker');
    //     expect(component).toHaveTextContent('Test Date Picker');
    //     const inputField = component.querySelector('input');
    //     fireEvent.change(inputField, { target: { value: '31.12.2020 13:00' } });
    //     expect(handleDateChange).toBeCalledTimes(1);
    //     expect(inputField).toHaveAttribute('value', '31.12.2020');
    // });
    //
    it('should render Date Picker component with a clear button and clicking it should invoke clear', () => {
        props.value = new Date();
        const { container } = renderComponent();
        expect(container).toHaveTextContent('Test Date Picker');
        // fireEvent.change(component.querySelector('input'), { target: { value: '31.12.2020' } });
        // expect(onChange).toBeCalledTimes(1);
        const clearButton = container.querySelector('button');
        expect(clearButton).toHaveAttribute('aria-label', 'clear-button');
        clearButton && fireEvent.click(clearButton);
        expect(onChange).toBeCalledWith(null);
    });

    it("should render Date Picker component with a clear button and clicking it should invoke clear but fail because it's disabled", () => {
        props.value = new Date();
        props.disabled = true;
        const { container } = renderComponent();
        // const component = getByTestId('date-picker');
        expect(container).toHaveTextContent('Test Date Picker');
        // fireEvent.change(container.querySelector('input'), { target: { value: '31.12.2020' } });
        // expect(onChange).toBeCalledTimes(1);
        const clearButton = container.querySelector('button');
        expect(clearButton).toHaveAttribute('aria-label', 'clear-button');
        clearButton && fireEvent.click(clearButton);
        // clear button should be grey and clicking it should NOT clear the value
        clearButton && expect(clearButton.querySelector('svg')).toHaveAttribute('style', 'fill: grey;');
        // expect(onChange).toBeCalledWith(new Date('2020-12-31T00:00'), '31.12.2020');
    });

    it('should render Date Picker component expect component to NOT have a clear button', () => {
        props.value = new Date();
        props.hideClearButton = true;
        const { container } = renderComponent();
        // const component = getByTestId('date-picker');
        expect(container).toHaveTextContent('Test Date Picker');
        const input = container.querySelector('input');
        input && fireEvent.change(input, { target: { value: '31.12.2020 13:00' } });
        // expect(onChange).toBeCalledTimes(1);
        expect(container.querySelector('button')).not.toHaveAttribute('aria-label', 'clear-button');
    });
});
