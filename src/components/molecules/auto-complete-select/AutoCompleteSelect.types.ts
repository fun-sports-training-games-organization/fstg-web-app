import * as React from 'react';
import { AutocompleteChangeDetails, AutocompleteChangeReason, FilterOptionsState } from '@mui/material';
import { TextFieldProps } from '../../atoms/text-field/TextField';

export interface SelectorProps<T> {
    options: T[];
    multiple?: boolean;
    getOptionLabel: (option: T) => string;
    filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
    defaultValues?: T | T[]; // in single, use Option, in multiple use Option[]
    noOptionsText?: string;
    id?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    value?: T | T[] | null; // in single, use Option, in multiple use Option[]
    inverted?: boolean;
    onChange?: (
        event: React.SyntheticEvent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<unknown>
    ) => void;
    label: string;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AutoCompleteSelectorProps = Omit<TextFieldProps, 'onChange'> & SelectorProps<any>;
