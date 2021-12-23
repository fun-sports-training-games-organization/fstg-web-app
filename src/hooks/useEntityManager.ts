import { useState, useEffect } from 'react';
import { useFirestore, useFirebase } from 'react-redux-firebase';
import { prepareDataToSend } from '../util/data-prep-util';

export type EntityWithId<T> = T & { id?: string };

type EntityManager<T> = {
    entities: T[];
    findById: (id: string) => Promise<T>;
    createEntity: (entity: T) => Promise<void>;
    updateEntity: (entity: EntityWithId<T>) => Promise<void>;
    deleteEntityById: (id: string) => Promise<void>;
};

function useEntityManager<T>(entityName: string): EntityManager<T> {
    const [entities, setEntities] = useState<EntityWithId<T>[]>([]);
    const firestore = useFirestore();
    const firebase = useFirebase();

    useEffect(() => {
        firestore.collection(entityName).onSnapshot((snapshot) => {
            setEntities(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) })));
        });
    }, [entityName, firestore]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findById = async (id: string): Promise<any> => {
        const doc = await firestore.collection(entityName).doc(id);
        const docSnapshot = await doc.get();
        return { ...docSnapshot.data(), id };
    };

    const createEntity = async (entity: T) => {
        await firestore.collection(entityName).add(prepareDataToSend(entity, firebase.auth().currentUser));
    };
    const updateEntity = async (entity: EntityWithId<T>) => {
        await firestore
            .collection(entityName)
            .doc(entity.id)
            .update(prepareDataToSend(entity, firebase.auth().currentUser));
    };
    const deleteEntityById = async (id: string) => {
        await firestore.collection(entityName).doc(id).delete();
    };

    return { entities, findById, createEntity, updateEntity, deleteEntityById };
}

export default useEntityManager;
