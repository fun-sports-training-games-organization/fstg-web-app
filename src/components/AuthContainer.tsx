import { Card, CardContent, CardHeader /*, Theme*/ } from '@mui/material';
import { FC } from 'react';
// import useClasses from '../hooks/useClasses';

export interface AuthContainerProps {
    header: string;
}

// const styles = (theme: Theme) => ({
//     root: {
//         maxWidth: 345
//     },
//     media: {
//         height: 0,
//         paddingTop: '56.25%' // 16:9
//     },
//     expand: {
//         transform: 'rotate(0deg)',
//         marginLeft: 'auto',
//         transition: theme.transitions.create('transform', {
//             duration: theme.transitions.duration.shortest
//         })
//     },
//     expandOpen: {
//         transform: 'rotate(180deg)'
//     }
// });

const AuthContainer: FC<AuthContainerProps> = (props) => {
    // const classes = useStyles();
    // const classes = useClasses(styles);

    const { header, children } = props;
    return (
        <Card
            sx={{
                maxWidth: 500
            }}
        >
            <CardHeader sx={{ textAlign: 'center' }} title={header} />
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default AuthContainer;
