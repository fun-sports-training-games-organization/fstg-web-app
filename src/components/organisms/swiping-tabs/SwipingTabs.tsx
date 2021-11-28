import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import { Box, Tab as MUITab, Theme, useMediaQuery } from '@mui/material';
import TabPanel from '../tab-panel/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import { FC, ReactNode } from 'react';

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

type Tab = {
    label: string;
    content: JSX.Element | ReactNode;
};

interface Props {
    tabs: Tab[];
}

export const FullWidthTabs: FC<Props> = (props): JSX.Element => {
    const theme = useTheme();
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [value, setValue] = React.useState(0);
    const { tabs } = props;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ height: smDown ? '100vh' : '100%' }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {tabs.map((tab, index) => (
                        <MUITab key={index} label={tab.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((tab, index) => (
                    <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                        {tab.content}
                    </TabPanel>
                ))}
            </SwipeableViews>
        </Box>
    );
};

export default FullWidthTabs;
