import mysql from 'mysql2'

export default function connection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'TCC'
  })
}
