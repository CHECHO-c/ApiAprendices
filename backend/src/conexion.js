import mysql from "mysql2/promise";
import "dotenv/config";

const connection = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,


  
});

try {
  connection.connect();
  console.log("conexion exitosa");
} catch (err) {
  console.log(err);
}
{
}

export default connection;
