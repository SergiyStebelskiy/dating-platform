import mysql from "mysql2/promise";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  database: "dating_platform",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type QueryResult = RowDataPacket[] | ResultSetHeader;

export const query = async (
  sql: string,
  values?: any
): Promise<QueryResult | undefined> => {
  try {
    const [results] = await pool.execute(sql, values);

    if (Array.isArray(results)) {
      return results as RowDataPacket[];
    }

    if ("insertId" in results) {
      return results as ResultSetHeader;
    }

    return undefined;
  } catch (error) {
    throw error;
  }
};
