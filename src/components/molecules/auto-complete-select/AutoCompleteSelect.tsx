import React from 'react';

import { AutoCompleteSelectorProps } from './AutoCompleteSelect.types';
import { Autocomplete as MUIAutocomplete, AutocompleteRenderInputParams, Stack } from '@mui/material';
import TextField from '../../atoms/text-field/TextField';

const AutoCompleteSelect: React.FC<AutoCompleteSelectorProps> = (props) => {
    const {
        id,
        value,
        options,
        getOptionLabel,
        defaultValues,
        onChange,
        onTextChange,
        filterOptions,
        fullWidth,
        disabled,
        multiple,
        noOptionsText,
        isOptionEqualToValue,
        startAdornment,
        endAdornment,
        ...inputFieldProps
    } = props;

    return (
        <MUIAutocomplete
            className="auto-complete-selector"
            multiple={multiple}
            id={id || 'single-autocomplete'}
            key={id}
            options={options}
            noOptionsText={noOptionsText}
            isOptionEqualToValue={isOptionEqualToValue}
            value={value}
            defaultValue={defaultValues}
            getOptionLabel={getOptionLabel}
            onChange={onChange}
            filterOptions={filterOptions}
            fullWidth={fullWidth}
            renderInput={(params: AutocompleteRenderInputParams): JSX.Element => {
                return (
                    <TextField
                        inputRef={params.InputProps.ref}
                        fullWidth={params.fullWidth}
                        disabled={params.disabled}
                        startAdornment={
                            startAdornment ? (
                                <Stack direction={'row'} spacing={1}>
                                    {startAdornment}
                                    {params.InputProps.startAdornment}
                                </Stack>
                            ) : (
                                params.InputProps.startAdornment
                            )
                        }
                        endAdornment={
                            endAdornment ? (
                                <Stack direction={'row'} spacing={1}>
                                    {params.InputProps.endAdornment}
                                    {endAdornment}
                                </Stack>
                            ) : (
                                params.InputProps.endAdornment
                            )
                        }
                        inputProps={params.inputProps}
                        onChange={onTextChange}
                        {...inputFieldProps}
                    />
                );
            }}
            disabled={disabled}
        />
    );
};

export default AutoCompleteSelect;
