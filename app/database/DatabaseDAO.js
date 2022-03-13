import * as SQLite from 'expo-sqlite'

const DATABASE_URL = "../assets/BBDD.db";

const db = SQLite.openDatabase(DATABASE_URL);

export function executeSimpleQuery(sql) {
    db.transaction(tx => {
        tx.executeSql(sql, null,
        (txObj, resultSet) => {
            return txObj
        }),
        (txObj, error) => console.error(error);
    })
}

export function executeParameterizedQuery(sql, params) {
    db.transaction(tx => {
        tx.executeSql(sql, params,
        (txObj, resultSet) => {
            return txObj
        }),
        (txObj, error) => console.error(error);
    })
}