import * as React from 'react';
import { Accordion as MUIAccordion, styled } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { FC } from 'react';
import { AccordionProps } from './Accordion.types';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

const Accordion: FC<AccordionProps> = (props) => {
    const { accordions, setExpandedIndex, ...rest } = props;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string, index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setExpandedIndex && setExpandedIndex(isExpanded ? index : -1);
    };

    type Id = {
        id: string;
    };

    const AccordionSummary: FC<Id> = styled((props) => (
        <MuiAccordionSummary
            sx={{ backgroundColor: 'white' }}
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(() => ({
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)'
        },
        '& .MuiAccordionSummary-content': {
            justifyContent: 'space-between',
            alignItems: 'center'
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
                        onChange={handleChange(`panel${tabNumber}`, tabNumber - 1)}
                        {...rest}
                    >
                        <AccordionSummary
                            aria-controls={`panel${tabNumber}bh-content`}
                            id={`panel${tabNumber}bh-header`}
                        >
                            <Typography sx={{ marginLeft: '2rem' }}>{accordion.title}</Typography>

                            {accordion.subtitle ? (
                                typeof accordion.subtitle === 'string' ? (
                                    <Typography sx={{ color: 'text.secondary' }}>{accordion.subtitle}</Typography>
                                ) : (
                                    accordion.subtitle
                                )
                            ) : null}
                            {accordion.actionsButton ? accordion.actionsButton : null}
                        </AccordionSummary>
                        <AccordionDetails sx={{ backgroundColor: 'white', paddingTop: 0 }}>
                            {typeof accordion.content === 'string' ? (
                                <Typography sx={{ marginLeft: '4rem' }}>{accordion.content}</Typography>
                            ) : (
                                accordion.content
                            )}
                        </AccordionDetails>
                    </MUIAccordion>
                );
            })}
        </div>
    );
};

export default Accordion;
