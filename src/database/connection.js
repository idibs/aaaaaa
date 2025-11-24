import mysql from 'mysql2'

export default function connection() {
  return mysql.createConnection({
    host: 'metro.proxy.rlwy.net',
    user: 'root',
    password: 'gyGgmjuRTGCJsZtYuEPxFubBIsKYoCwt',
    database: 'tcc',
    port: 59910,
    ssl: { rejectUnauthorized: false }
  })
}
