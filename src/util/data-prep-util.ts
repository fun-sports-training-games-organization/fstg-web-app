import { User } from '@firebase/auth-types';
import { UpdateData } from '@firebase/firestore-types';
import { CreateInfo, ModifyInfo } from '../model/basics';

export const prepareDataToSend = (updateData: UpdateData, currentUser: User | null): UpdateData => {
    const modifyInfo: ModifyInfo = {
        ...updateData,
        lastModifiedByDisplayName: currentUser?.displayName,
        lastModifiedById: currentUser?.uid,
        lastModifiedUTCMilliseconds: Date.now()
    };

    let workoutToSend = { ...updateData, ...modifyInfo };

    if (!updateData.hasBeenCreated) {
        const createInfo: CreateInfo = {
            createdByDisplayName: modifyInfo.lastModifiedByDisplayName,
            createdById: modifyInfo.lastModifiedById,
            createdUTCMilliseconds: modifyInfo.lastModifiedUTCMilliseconds
        };
        workoutToSend = { ...workoutToSend, ...createInfo };
    }

    return { ...removeUnnecessaryProps(workoutToSend) };
};

const removeUnnecessaryProps = (updateData: UpdateData): UpdateData => {
    // eslint-disable-next-line
    const { id, hasBeenCreated, ...workoutPropsRemoved } = updateData;
    return workoutPropsRemoved;
};
