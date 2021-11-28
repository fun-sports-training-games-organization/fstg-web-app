import * as React from 'react';
import { Accordion as MUIAccordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC } from 'react';
import { AccordionProps } from './Accordion.types';

const Accordion: FC<AccordionProps> = (props) => {
    const { accordions, ...rest } = props;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            {accordions.map((accordion, i) => {
                const tabNumber = i + 1;
                return (
                    <MUIAccordion
                        square={true}
                        key={tabNumber}
                        expanded={expanded === `panel${tabNumber}`}
                        onChange={handleChange(`panel${tabNumber}`)}
                        {...rest}
                    >
                        <AccordionSummary
                            sx={{ backgroundColor: 'white' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${tabNumber}bh-content`}
                            id={`panel${tabNumber}bh-header`}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{accordion.title}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{accordion.subtitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: 'white' }}>
                            <Typography>{accordion.content}</Typography>
                        </AccordionDetails>
                    </MUIAccordion>
                );
            })}
        </div>
    );
};

export default Accordion;
