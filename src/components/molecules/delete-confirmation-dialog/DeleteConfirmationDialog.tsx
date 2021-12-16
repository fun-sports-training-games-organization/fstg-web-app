import { SyntheticEvent } from 'react';

import ConfirmationDialog from '../../organisms/confirmation-dialog/ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import { IdName } from '../../../model/basics';
import useEntityManager, { EntityWithId } from '../../../hooks/useEntityManager';

type Props = {
    openDeleteConfirmationDialog: boolean;
    itemToDelete: IdName | undefined;
    entityName: string;
    closeDialog: () => void;
};

const DeleteConfirmationDialog = ({
    openDeleteConfirmationDialog,
    itemToDelete,
    closeDialog,
    entityName
}: Props): JSX.Element => {
    const { t } = useTranslation();
    const { deleteEntityById } = useEntityManager<EntityWithId<never>>(entityName);

    return (
        <ConfirmationDialog
            open={openDeleteConfirmationDialog}
            title={t('dialog.deleteConfirmation.title')}
            message={t('dialog.deleteConfirmation.message', { name: itemToDelete?.name })}
            onClose={async (event: SyntheticEvent<HTMLButtonElement>) => {
                if (event.currentTarget.value === 'confirm') {
                    itemToDelete &&
                        itemToDelete.id &&
                        // (await new CRUDService('exercise', firestore).delete(itemToDelete.id));
                        (await deleteEntityById(itemToDelete.id));
                }
                closeDialog();
            }}
        />
    );
};
export default DeleteConfirmationDialog;
