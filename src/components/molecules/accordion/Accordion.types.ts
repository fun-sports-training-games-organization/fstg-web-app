import { AccordionProps as MUIAccordionProps } from '@mui/material';
import { ReactNode } from 'react';

interface Accordion {
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    content: string | ReactNode;
}
export interface CustomProps {
    accordions: Accordion[];
}

export type AccordionProps = CustomProps & Omit<MUIAccordionProps, 'children'>;
