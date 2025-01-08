const express = require("express"); //เรียกใช้งาน express module เพื่อสร้าง web server
require("dotenv").config(); //เรียกใช้งานไฟล์ .env

const app = express(); //สร้าง web server

//ตัวแปรเพื่อเก็บค่าที่อยู่ใน .env เพื่อเอาไปใช้งาน
const PORT = process.env.PORT || 5000;

//เทสการเรียกใช้งาน web server จาก client/user/ระบบอื่นๆ
app.get("/", (req, res) => {
    res.json({ message: "Hello from chanintorn DTI-SAU server!" });
});

//สร้างช่องทางในการติดต่อ web server นี้จาก client/user
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT + "...");
});
