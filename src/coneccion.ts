import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'mysql-aerolineaia2025.alwaysdata.net',
    user: '400640',
    database: 'aerolineaia2025_aerolinea',
    password: "AlwaysData2025",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });