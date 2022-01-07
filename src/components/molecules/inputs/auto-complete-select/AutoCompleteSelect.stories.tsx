import React from 'react';
import AutoCompleteSelect from './AutoCompleteSelect';
import { AutoCompleteSelectorProps } from './AutoCompleteSelect.types';
import { Stack } from '@mui/material';

export default {
    title: 'atoms/AutoCompleteSelect',
    component: AutoCompleteSelect,
    args: {
        label: 'Auto Complete Select',
        options: [
            { key: 1, value: 'Hello' },
            { key: 2, value: 'World' },
            { key: 3, value: 'How' },
            { key: 4, value: 'Are' },
            { key: 5, value: 'You' },
            { key: 6, value: 'Today' }
        ],
        getOptionLabel: (option: { value: string }): unknown => option && option.value,
        defaultValues: { key: 1, value: 'Hello' },
        noOptionsText: 'keine Optionen',
        noBorder: false
    }
};

export const autoCompleteSingleSelect = (args: AutoCompleteSelectorProps): JSX.Element => (
    <Stack>
        <AutoCompleteSelect {...args} />
    </Stack>
);

export const autoCompleteMultiSelect = (args: AutoCompleteSelectorProps): JSX.Element => (
    <AutoCompleteSelect multiple {...args} />
);
autoCompleteMultiSelect.args = { defaultValues: [] };
