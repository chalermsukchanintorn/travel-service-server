//ไฟล์นี้ใช้ในการจัดการเส้นทางในการเรียกใช้งาน service/api
const travelCtrl = require('./../controllers/travel.controller.js')

//เรียกใช้งาน expesee เพื่อใช้งาน Router() ในการจัดการเส้นทางเพื่อการเรียกใช้งาน
const express = require('express'); 
const router = express.Router();

//ในการกำหนดเส้นทางเป็นตามหลักการของ REST API
//เพิ่ม post(), แก้ไข put(), ลบ delete(), ค้นหา/ตรวจสอบ/ดึง/ดู get()

router.post("/", travelCtrl.uploadTravel, travelCtrl.createTravel);

router.put("/:travelId",travelCtrl.uploadTravel, travelCtrl.editTravel);

router.get("/:travellerId", travelCtrl.getAllTravel);

router.get("/one/:travelId", travelCtrl.getTravel);

router.delete("/:travelId", travelCtrl.deleteTravel)

//export router ออกไปเพื่อการเรียกใช้งาน
module.exports = router;