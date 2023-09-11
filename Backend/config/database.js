const mysql = require('mysql2');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root123',
      database: 'hr',
    });
  }

  connect() {
    this.connection.promise()
      .connect()
      .then(() => {
        console.log('Connected to database');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  disconnect() {
    this.connection.end()
      .then(() => {
        console.log('Disconnected from database');
      })
      .catch((err) => {
        console.log('Error disconnecting from database', err);
      });
  }
}

module.exports = new Database();
