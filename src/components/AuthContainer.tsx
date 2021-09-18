import { Card, CardContent, CardHeader, createStyles, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';

export interface AuthContainerProps {
    header: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345
        },
        media: {
            height: 0,
            paddingTop: '56.25%' // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: 'rotate(180deg)'
        }
    })
);

const AuthContainer: FC<AuthContainerProps> = (props) => {
    const classes = useStyles();

    const { header, children } = props;
    return (
        <Card className={classes.root}>
            <CardHeader title={header} />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default AuthContainer;
