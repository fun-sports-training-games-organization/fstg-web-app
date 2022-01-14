import React from 'react';
import Accordion from './Accordion';
import { AccordionProps } from './Accordion.types';

export default {
    title: 'molecules/Accordion',
    component: Accordion,
    args: {
        accordions: [
            { title: 'Title 1', subtitle: 'Subtitle 1', content: 'something content goes here [1]...' },
            { title: 'Title 2', subtitle: 'Subtitle 2', content: 'something content goes here [2]...' },
            { title: 'Title 3', subtitle: 'Subtitle 3', content: 'something content goes here [3]...' },
            { title: 'Title 4', subtitle: 'Subtitle 4', content: 'something content goes here [4]...' }
        ]
    }
};

export const accordion = (args: AccordionProps): JSX.Element => <Accordion {...args} />;
