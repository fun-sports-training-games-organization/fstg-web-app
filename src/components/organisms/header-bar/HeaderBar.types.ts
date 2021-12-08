import { User } from 'firebase/auth';

export type HeaderBarProps = {
    user?: Partial<User>;
    logout?: () => void;
};
