import * as SQLite from 'expo-sqlite';

console.log(SQLite)

const db = SQLite.openDatabaseAsync("database.db");

export default class DatabaseManager {

    static initializeDatabase() {
        db.withTransactionAsync(tx => {
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

    static getTasks(callback) {
        db.withTransactionAsync(tx => {
            tx.executeSql(
                "select * from task",
                [],
                (_, { rows }) => {
                    callback(rows._array);
                }
            );
        });
    }

    static addTask(task, callback) {
        db.withTransactionAsync(tx => {
            tx.executeSql(
                "insert into task (title, description, isDone, hasAlerts, date) values (?, ?, ?, ?, ?)",
                [task.title, task.description, task.isDone, task.hasAlerts, task.date],
                (_, { insertId }) => {
                    callback(insertId);
                }
            );
        });
    }

}
