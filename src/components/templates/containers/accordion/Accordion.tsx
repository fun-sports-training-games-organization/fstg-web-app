import * as React from 'react';
import { Accordion as MUIAccordion, styled } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { FC } from 'react';
import { AccordionProps } from './Accordion.types';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { SxProps, Theme } from '@mui/system';
import theme from '../../../../theme/theme';

const Accordion: FC<AccordionProps> = (props) => {
    const { accordions, setExpandedIndex, ...rest } = props;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string, index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setExpandedIndex && setExpandedIndex(isExpanded ? index : -1);
    };

    type AccordionSummaryProps = {
        id: string;
        sx?: SxProps<Theme> | undefined;
    };

    const AccordionSummary: FC<AccordionSummaryProps> = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', gridColumn: '0 / 10' }} />}
            {...props}
        />
    ))(() => ({
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper': {
            gridColumn: '1 / 2',
            alignItems: 'center'
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)'
        },
        '& .MuiAccordionSummary-content': {
            display: 'grid',
            gridTemplateColumns: 'repeat(100, 1fr)'
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
                            sx={{
                                backgroundColor: expanded === `panel${tabNumber}` ? theme.palette.grey[100] : 'white',
                                borderBottom: theme.palette.grey[600],
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                gridColumn={{ xs: '5 / 65', sm: '3 / 40' }}
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                {accordion.title}
                            </Typography>

                            {accordion.subtitle ? (
                                typeof accordion.subtitle === 'string' ? (
                                    <Typography
                                        color="text.secondary"
                                        gridColumn="41 / 94"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        {accordion.subtitle}
                                    </Typography>
                                ) : (
                                    accordion.subtitle
                                )
                            ) : null}
                            {accordion.actionsButton ? accordion.actionsButton : null}
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{
                                paddingTop: 2
                            }}
                        >
                            {typeof accordion.content === 'string' ? (
                                <Typography>{accordion.content}</Typography>
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
