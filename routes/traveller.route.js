//ไฟล์นี้ใช้ในการจัดการเส้นทางในการเรียกใช้งาน service/api
const travellerCtrl = require('./../controllers/traveller.controller.js')

//เรียกใช้งาน expesee เพื่อใช้งาน Router() ในการจัดการเส้นทางเพื่อการเรียกใช้งาน
const express = require('express'); 
const router = express.Router();

//ในการกำหนดเส้นทางเป็นตามหลักการของ REST API
//เพิ่ม post(), แก้ไข put(), ลบ delete(), ค้นหา/ตรวจสอบ/ดึง/ดู get()

router.post("/", travellerCtrl.createTraveller);

router.get("/:travellerEmail/:travellerPassword", travellerCtrl.checkLoginTraveller);

router.put("/:travellerId", travellerCtrl.editTraveller);

//export router ออกไปเพื่อการเรียกใช้งาน
module.exports = router;