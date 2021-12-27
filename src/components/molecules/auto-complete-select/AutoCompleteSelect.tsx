import React from 'react';

import { AutoCompleteSelectorProps } from './AutoCompleteSelect.types';
import { Autocomplete as MUIAutocomplete, AutocompleteRenderInputParams } from '@mui/material';
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
                        startAdornment={params.InputProps.startAdornment}
                        endAdornment={params.InputProps.endAdornment}
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
