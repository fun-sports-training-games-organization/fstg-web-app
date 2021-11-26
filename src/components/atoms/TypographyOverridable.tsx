import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const FONT_WEIGHT = {
    sixHundred: 600
};

const FONT_SIZE = {
    twentySix: 26
};

interface Props extends TypographyProps {
    fontWeight?: keyof typeof FONT_WEIGHT;
    fontSize?: keyof typeof FONT_SIZE;
}

const useStyles = makeStyles({
    overrides: {
        fontWeight: ({ fontWeight }: Props) => fontWeight && FONT_WEIGHT[fontWeight],
        fontSize: ({ fontSize }: Props) => fontSize && FONT_SIZE[fontSize]
    }
});

export const TypographyOverrideable: React.FC<Props> = ({ fontSize, fontWeight, children, ...otherProps }) => {
    const classes = useStyles({ fontSize, fontWeight });
    return (
        <Typography {...otherProps} className={classNames(otherProps.className, classes.overrides)}>
            {children}
        </Typography>
    );
};
