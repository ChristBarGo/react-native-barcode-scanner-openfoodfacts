import * as SQLite from 'expo-sqlite'

const DATABASE_URL = "../assets/BBDD.db";

export default class DatabaseDAO {
    constructor() {
        this.db = SQLite.openDatabase(DATABASE_URL);

        this.db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        );
    }

    executeQuery(query, params=[], success=()=>{}, error=(_)=>{}) {
        if (this.db && this.db != null) {
            this.db.transaction(tx => {
                tx.executeSql(query, params, success, error);
            });
        }
        else {
            console.log("No connection to database");
        }
    }

    executeSimpleQuery(sql) {
        console.log("executeSimpleQuery, sql: ", sql);
        
        return new Promise((resolve, reject) => {
            this.executeQuery(sql, [], 
                (_, resultSet) => {
                    resolve(true);
                    console.log(resultSet);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            )
        })
    }

    executeSimpleSelectQuery(sql) {
        console.log("executeSimpleSelectQuery, sql: ", sql);

        return new Promise((resolve, reject) => {
            this.executeQuery(sql, [], 
                (_, resultSet) => {
                    resolve(resultSet.rows._array)
                    console.log(resultSet);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            )
        })
    }

    executeParameterizedQuery(sql, params) {
        console.log("executeParameterizedQuery, sql: ", sql);
        return new Promise((resolve, reject) => {
            this.executeQuery(sql, params, 
                (_, resultSet) => {
                    resolve(true);
                    console.log(resultSet);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            )
        })
    }
}