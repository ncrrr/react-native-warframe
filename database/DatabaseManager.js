import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("database.db");

export default class DatabaseManager {

    static initializeDatabase() {
        db.transaction(tx => {
                tx.executeSql(
                    "create table if not exists\
                        task (\
                            task_id integer primary key autoincrement not null,\
                            title text,\
                            description text,\
                            isDone boolean,\
                            hasAlerts boolean,\
                            date text\
                    );"
                );
            }, (e) => { console.log("ERREUR + " + e) },
            () => { console.log("OK + ") }
        );
    }

}
