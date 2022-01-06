import AccountForm, { AccountFormFields } from './AccountForm';
import { FC } from 'react';

const Account: FC = () => {
    return <AccountForm onSubmit={(values: AccountFormFields) => console.log(values)} />;
};
export default Account;
