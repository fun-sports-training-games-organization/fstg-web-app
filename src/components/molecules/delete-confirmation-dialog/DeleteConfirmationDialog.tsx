import { SyntheticEvent } from 'react';
import { useFirestore } from 'react-redux-firebase';

import ConfirmationDialog from '../../organisms/confirmation-dialog/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { IdName } from '../../../model/basics';

type Props = {
    openDeleteConfirmationDialog: boolean;
    itemToDelete: IdName | undefined;
    collection: string;
    closeDialog: () => void;
};

const DeleteConfirmationDialog = ({
    openDeleteConfirmationDialog,
    itemToDelete,
    collection,
    closeDialog
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const firestore = useFirestore();

    return (
        <ConfirmationDialog
            open={openDeleteConfirmationDialog}
            title={t('dialog.deleteConfirmation.title')}
            message={t('dialog.deleteConfirmation.message', { name: itemToDelete?.name })}
            onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                if (event.currentTarget.value === 'confirm') {
                    itemToDelete &&
                        itemToDelete.id &&
                        (await firestore.collection(collection).doc(itemToDelete.id).delete());
                }
                closeDialog();
            }}
        />
    );
};
export default DeleteConfirmationDialog;
