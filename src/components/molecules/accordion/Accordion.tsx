import * as React from 'react';
import { Accordion as MUIAccordion, styled } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { FC } from 'react';
import { AccordionProps } from './Accordion.types';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

const Accordion: FC<AccordionProps> = (props) => {
    const { accordions, ...rest } = props;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            sx={{ backgroundColor: 'white' }}
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(() => ({
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)'
        }
    }));

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
                            aria-controls={`panel${tabNumber}bh-content`}
                            // id={`panel${tabNumber}bh-header`}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0, marginLeft: '2rem' }}>
                                {accordion.title}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{accordion.subtitle}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: 'white' }}>
                            <Typography sx={{ marginLeft: '4rem', lineHeight: 2.2 }}>{accordion.content}</Typography>
                        </AccordionDetails>
                    </MUIAccordion>
                );
            })}
        </div>
    );
};

export default Accordion;
