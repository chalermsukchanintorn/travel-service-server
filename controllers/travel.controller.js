//ไฟล์ที่เขียนควบคุมการทำงานต่างๆ กับ table ใน database
//เช่น การเพิ่ม (insert/create) การแก้ไข (update)
// การลบ (delete) การค้นหา,ตรวจสอบ,ดึง,ดู (select/sead)

const Travel = require("./../models/travel.model.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//ฟังก์ชันเพิ่มข้อมูลลงในตาราง travel_tb
// exports.createTravel = async (req, res) => {
//     try {
//          const result = await Travel.create(req.body);
        
//         res.status(201).json({
//             message: "Travel created successfully",
//             data: result
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.createTravel = async (req, res) => {
    try {
        //ตัวแปรเก็บข้อมูลที่ส่งมากับข้อมูลรูปภาพที่จะเอาไปบันทึกใน Table
        let data = {
            ...req.body,
            travelImage:  req.file ? req.file.path.replace("images\\travel\\", "") : ""
        }

        const result = await Travel.create(data);
        
        res.status(201).json({
            message: "Travel created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//ฟังก์ชันแก้ไขข้อมูลการเดินทางกับตาราง travel_tb
exports.editTravel = async (req, res) => {
    try {
         //มีการตรวจสอบก่อนว่ามีไฟล์ที่อัปโหลดมาไหม 
        //กรณีที่มี ตรวจสอบก่อนว่ามีไฟล์เก่าอยู่ก่อนหรือไม่ ถ้ามีให้ลบไฟล์เก่าทิ้งไปด้วย        
        let data = {
            ...req.body
        }

        if(req.file) { //ตรวจสอบว่ามีการอัปโหลดไฟล์มาเพื่อแก้ไขหรือไม่
            const travel = await Travel.findOne({ //ไปค้นหาเพื่อเอารูป
                where: {
                    travelId: req.params.travelId
                }
            });

            if(travel.travelImage) { //ตรวจสอบกรณีมีรูป
                const oldImagePath = "images/travel/" + travel.travelImage;
                //ลบไฟล์รูปเก่าทิ้ง
                fs.unlink(oldImagePath,(err) => {
                    console.log(err);
                });
            }

            data.travelImage = req.file.path.replace("images\\travel\\", "");
        }else{
            delete data.travelImage
        }

        const result = await Travel.update(data, {
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
        const travel = await Travel.findOne({ //ไปค้นหาเพื่อเอารูป
            where: {
                travelId: req.params.travelId
            }
        });

        if(travel.travelImage) { //ตรวจสอบกรณีมีรูป
            const oldImagePath = "images/travel/" + travel.travelImage;
            //ลบไฟล์รูปเก่าทิ้ง
            fs.unlink(oldImagePath,(err) => {
                console.log(err);
            });
        }

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


exports.getTravel = async (req, res) => {
    try {
        const result = await Travel.findOne({
            where: {
                travelId: req.params.travelId,
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