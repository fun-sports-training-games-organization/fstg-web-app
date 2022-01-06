import AccountForm from './AccountForm';
import { FC } from 'react';

const Account: FC = () => {
    return <AccountForm onSubmit={(values: any) => console.log(values)} />;
};
export default Account;
