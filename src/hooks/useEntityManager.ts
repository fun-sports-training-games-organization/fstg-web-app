import { useState, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { prepareDataToSend } from '../util/data-prep-util';
import firebase from 'firebase/compat';

export type EntityWithId<T> = T & { id?: string };

type EntityManager<T> = {
    entities: T[];
    createEntity: (entity: T) => Promise<void>;
    updateEntity: (entity: EntityWithId<T>) => Promise<void>;
    deleteEntityById: (id: string) => Promise<void>;
};

function useEntityManager<T>(entityName: string): EntityManager<T> {
    const [entities, setEntities] = useState<EntityWithId<T>[]>([]);
    const firestore = useFirestore();

    useEffect(() => {
        firestore.collection(entityName).onSnapshot((snapshot) => {
            setEntities(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) })));
        });
    }, [entityName, firestore]);

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

    return { entities, createEntity, updateEntity, deleteEntityById };
}

export default useEntityManager;
