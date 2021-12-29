import { useState, useEffect } from 'react';
import { useFirestore, useFirebase } from 'react-redux-firebase';
import { prepareDataToSend } from '../util/data-prep-util';
import { useAuth } from '../contexts/AuthContextProvider';

export type EntityWithId<T> = T & { id?: string };

type EntityManager<T> = {
    entities: T[];
    findById: (id: string) => Promise<T>;
    createEntity: (entity: T) => Promise<string>;
    updateEntity: (entity: EntityWithId<T>) => Promise<void>;
    deleteEntityById: (id: string) => Promise<void>;
};

function useEntityManager<T>(entityName: string): EntityManager<T> {
    const { user } = useAuth();
    const [entities, setEntities] = useState<EntityWithId<T>[]>([]);
    const firestore = useFirestore();
    const firebase = useFirebase();

    useEffect(() => {
        if (user?.uid && ['8D3cIL5a4GM6Dzae8efcP2B9J5k2', 'p85OZGSf7TfTchZtoLd4JJs7UH82'].includes(user?.uid)) {
            firestore.collection(entityName).onSnapshot((snapshot) => {
                setEntities(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) })));
            });
        } else {
            firestore
                .collection(entityName)
                .where('createdById', '==', user?.uid)
                .onSnapshot((snapshot) => {
                    setEntities(snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) })));
                });
        }
    }, [entityName, firestore, user?.uid]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findById = async (id: string): Promise<any> => {
        const doc = await firestore.collection(entityName).doc(id);
        const docSnapshot = await doc.get();
        return { ...docSnapshot.data(), id };
    };

    const createEntity = async (entity: T): Promise<string> => {
        return firestore
            .collection(entityName)
            .add(prepareDataToSend(entity, firebase.auth().currentUser))
            .then((docRef) => {
                return docRef.id;
            })
            .catch((err) => {
                throw err;
            });
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
