import { AccordionProps as MUIAccordionProps } from '@mui/material';
import { ReactNode } from 'react';

export interface AccordionProp {
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    actionsButton?: string | ReactNode;
    content: string | ReactNode;
}
export interface CustomProps {
    accordions: AccordionProp[];
}

export type AccordionProps = CustomProps & Omit<MUIAccordionProps, 'children'>;
