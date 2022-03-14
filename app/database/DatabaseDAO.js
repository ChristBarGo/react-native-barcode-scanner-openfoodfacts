import { getDatabase, ref, onValue, set, push } from 'firebase/database';
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
        let data = null;

        if (refPath && refPath != null) {
            ref.on(refPath, 
                (snapshot) => {
                    data = snapshot.val();
                },
                (errorObject) => {
                    console.error("An error occurred when retrieving data from firebase: ", errorObject.name);
                }
            );
        }
    }
}