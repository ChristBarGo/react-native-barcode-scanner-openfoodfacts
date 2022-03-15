import { getDatabase, onValue, ref, set } from 'firebase/database';
import { firebaseApp } from '../config/FirebaseConfig';

export default class DatabaseDAO {
    constructor() {
        this.firebaseDB = getDatabase(firebaseApp);
    }

    saveObject(refPath, refId, objectToSave) {
        if (this.firebaseDB && this.firebaseDB != null) {
            if (refPath && refPath != null && refId && refId != null && objectToSave && objectToSave != null) {
                set(ref(this.firebaseDB, refPath + refId), objectToSave);
            }
        }
    }

    getAllData(refPath) {
        return new Promise((resolve, reject) => {
            const onData = snapshot => resolve(snapshot.val());
            const onError = error => reject(error);

            const databaseRef = ref(this.firebaseDB, refPath);

            onValue(databaseRef, onData, onError);

        });
        /*let data;

        if (refPath && refPath != null) {
            const databaseRef = ref(this.firebaseDB, refPath);
            
            onValue(databaseRef, 
                (snapshot) => {
                    data = snapshot.val();
                },
                (errorObject) => {
                    console.error("An error occurred when retrieving data from firebase: ", errorObject.name);
                }
            );
        }

        return data;*/

        /*let data = null;

        if (refPath && refPath != null) {
            const databaseRef = ref(this.firebaseDB, refPath);
            onValue(databaseRef, 
                (snapshot) => {
                    data = snapshot.val();
                },
                (errorObject) => {
                    console.error("An error occurred when retrieving data from firebase: ", errorObject.name);
                }
            );
        }

        return data;*/
    }
}