import mysql from 'mysql2';

class ConexaoDB {
    static connect() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'fatec'
        });
    }

    static getAllStudents(callback) {
        const connection = this.connect();
        connection.query("SELECT * FROM student", (error, results) => {
            if (error) throw error;
            callback(results);
            connection.end();
        });
    }

    static getStudentById(id, callback) {
        const connection = this.connect();
        connection.query("SELECT * FROM student WHERE id = ?", [id], (error, results) => {
            if (error) throw error;
            callback(results);
            connection.end();
        });
    }

    static save(student, callback) {
        const connection = this.connect();
        connection.query("INSERT INTO student SET ?", student, (error, results) => {
            if (error) throw error;
            student.id = results.insertId;
            callback(student);
            connection.end();
        });
    }

    static update(student, callback) {
        const connection = this.connect();
        connection.query("UPDATE student SET ? WHERE id = ?", [student, student.id], (error, results) => {
            if (error) throw error;
            callback(results);
            connection.end();
        });
    }

    static deleteById(id, callback) {
        const connection = this.connect();
        connection.query("DELETE FROM student WHERE id = ?", [id], (error, results) => {
            if (error) throw error;
            callback(results);
            connection.end();
        });
    }
}

export default ConexaoDB;