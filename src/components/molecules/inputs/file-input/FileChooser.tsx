import React, { FC } from 'react';
import TextField, { TextFieldProps } from '../text-field/TextField';

const FileChooser: FC<TextFieldProps> = (props) => {
    return <TextField shrinkLabel type={'file'} inputProps={{ accept: 'image/*' }} {...props} />;
};

export default FileChooser;
