import * as React from 'react';
import { ReactNode } from 'react';
import { AutocompleteChangeDetails, AutocompleteChangeReason, FilterOptionsState } from '@mui/material';

export interface SelectorProps<T> {
    options: T[];
    multiple?: boolean;
    getOptionLabel: (option: T) => string;
    filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
    defaultValues?: T | T[]; // in single, use Option, in multiple use Option[]
    noOptionsText?: string | ReactNode;
    isOptionEqualToValue?: ((option: unknown, value: unknown) => boolean) | undefined;
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
    onTextChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    label: string;
    placeholder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    startAdornment?: JSX.Element | React.ReactNode;
    endAdornment?: JSX.Element | React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AutoCompleteSelectorProps = SelectorProps<any>;
