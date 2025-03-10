/*
    ไฟล์ที่กำหนดการทำงานต่างๆ กับ table ใน database
    เช่น การเพิ่ม (insert/create), การแก้ไข (update),
    การลบ (delete), การค้นหา/ตรวจสอบ/ดึง/ดู (select/sead)
*/

//นำเข้าเพื่อเรียกใช้งาน module ต่างๆ ที่ต้องใช้งาน
const multer = require("multer"); //จัดการการอัปโหลดไฟล์
const path = require("path"); //จัดการ path หรือตำแหน่งที่อยู่ของไฟล์
const fs = require("fs"); //จัดการไฟล์

//นำเข้า travel.model.js เพื่อทำงานกับ travel_tb
const Travel = require("./../models/travel.model.js");
const multer = require("multer");
const path = require("path");

//ฟังก์ชันเพิ่มข้อมูลลงในตาราง travel_tb
//กรณีไม่มีการอัปโหลดไฟล์
// exports.createTravel = async (req, res) => {
//     try {
//         const result = await Travel.create(req.body);
        
//         res.status(201).json({
//             message: "Travel created successfully",
//             data: result
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
//กรณีมีการอัปโหลดไฟล์ แต่จะเลือกรูปอัปโหลดหรือไม่เลือกก็ได้ก็จะเก็บค่าว่างแทน
exports.createTravel = async (req, res) => {
    try {
        //ตัวแปรเก็บข้อมูลที่ส่งมากับข้อมูลรูปภาพที่จะเอาไปบันทึกใน Table
        let data = {
            ...req.body,
            travelImage: req.file.path.replace("images\\travel\\", "")
        }

    const result = await Travel.create(data);

    res.status(201).json({
      message: "Travel created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ฟังก์ชันแก้ไขข้อมูลการเดินทางกับตาราง travel_tb
//กรณีไม่มีการอัปโหลดไฟล์
// exports.editTravel = async (req, res) => {
//   try {
//     const result = await Travel.update(req.body, {
//       where: {
//         travelId: req.params.travelId,
//       },
//     });
//     res.status(200).json({
//       message: "Travel updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//กรณีมีการอัปโหลดไฟล์ แต่จะเลือกรูปอัปโหลดเพื่อแก้ไข หรือไม่เลือกก็ได้ก็จะเก็บค่าเดิมแทน
exports.editTravel = async (req, res) => {
    try {
        const result = await Travel.update(req.body, {
            where:{
                travelId: req.params.travelId,
            }
        });
        res.status(200).json({
            message: "Travel updated successfully",
            data: result
        });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//ฟังก์ชันลบข้อมูลการเดินทางกับตาราง travel_tb
exports.deleteTravel = async (req, res) => {
    try {
        const result = await Travel.destroy({
            where:{
                travelId: req.params.travelId,
            }
        });
        res.status(200).json({
            message: "Travel delete successfully",
            data: result
        });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//ฟังก์ชันดึงข้อมูลการเดินทางทั้งหมดของนักเดินทางหนึ่งจากตาราง travel_tb
exports.getAllTravel = async(req, res) =>{ 
    try {
        const result = await Travel.findAll({
            where: {
                travellerId: req.params.travellerId,
            } 
        });
        if(result) {
            res.status(200).json({
                message: "Travel get successfully",
                data: result
            });
        }else{
            res.status(404).json({
                message: "Traveller login failed",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//ฟังก์ชันเพื่อการอัปโหลดไฟล์
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, "images/travel");
   } ,
   filename: (req, file, cb) => {
       cb(null, 'travel_'+ Math.floor(Math.random()* Date.now()) + path.extname(file.originalname));
   }
})

exports.uploadTravel = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimeType && extname) {
            return cb(null, true);
        }
        cb("Error: Images Only");
    }
}).single("travelImage");