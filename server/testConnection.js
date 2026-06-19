require("dotenv").config();
const pool = require("./config/db");

async function testDB() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    } catch (err) {
        console.error("❌ Database Connection Failed");
        console.error(err.message);
    }
}

testDB();