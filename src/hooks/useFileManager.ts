import { useFirebase } from 'react-redux-firebase';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

type FileManager<T extends File | Blob> = {
    uploadFile: (file: T, path?: string) => Promise<void>;
    uploadFiles: (fileList: T[], path?: string) => Promise<void>;
    deleteFile: (path: string) => Promise<void>;
    getFileURL: (path: string) => Promise<string>;
};

function useFileManager<T extends File | Blob>(basePath?: string): FileManager<T> {
    const firebase = useFirebase();
    // Create a reference to the file we want to download
    const storage = getStorage();

    function joinPaths(basePath?: string, path?: string) {
        const paths = [];
        if (basePath && basePath.trim()) {
            paths.push(basePath);
        }
        if (path && path.trim()) {
            paths.push(path);
        }
        return paths.join('/');
    }

    const uploadFile = async (file: T, path?: string) => {
        await firebase.uploadFile(
            // URL.createObjectURL(state?.profilePicture[0]),
            joinPaths(basePath, path),
            file
        );
    };

    const uploadFiles = async (fileList: T[], path?: string) => {
        await firebase.uploadFiles(
            // URL.createObjectURL(state?.profilePicture[0]),
            joinPaths(basePath, path),
            fileList
        );
    };

    const deleteFile = async (path: string) => {
        await firebase.deleteFile(path);
    };

    const getFileURL = async (path: string): Promise<string> => {
        const storageRef = ref(storage, path);
        return await getDownloadURL(storageRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                return url;
            })
            .catch((error) => {
                console.log(error);
                return '';
                // in the future we may want to use these error messages,
                // but for now we're just gonna return an empty string when it fails to retrieve the file
                // // A full list of error codes is available at
                // // https://firebase.google.com/docs/storage/web/handle-errors
                // switch (error.code) {
                //     case 'storage/object-not-found':
                //         return 'not found!';
                //     // File doesn't exist
                //     case 'storage/unauthorized':
                //         // User doesn't have permission to access the object
                //         return 'unauthorized!';
                //     case 'storage/canceled':
                //         // User canceled the upload
                //         return 'canceled';
                //     case 'storage/unknown':
                //         // Unknown error occurred, inspect the server response
                //         return 'unknown';
                //     default:
                //         return 'unknown error';
                // }
            });
    };
    return { uploadFile, uploadFiles, getFileURL, deleteFile };
}

export default useFileManager;
