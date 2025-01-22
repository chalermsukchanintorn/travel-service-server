//ไฟล์ที่เขียนควบคุมการทำงานต่างๆ กับ table ใน database
//เช่น การเพิ่ม (insert/create) การแก้ไข (update)
// การลบ (delete) การค้นหา,ตรวจสอบ,ดึง,ดู (select/sead)

const multer = require("multer");
const Traveller = require("./../models/traveller.model.js");
const path = require("path");

//ฟังก์ชันเพิ่มข้อมูลลงในตาราง traveller_tb
// exports.createTraveller = async (req, res) => {
//     try {
//         const result = await Traveller.create(req.body);
//         res.status(201).json({
//             message: "Traveller created successfully",
//             data: result
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.createTraveller = async (req, res) => {
    try {
        //ตัวแปรเก็บข้อมูลที่ส่งมากับข้อมูลรูปภาพที่จะเอาไปบันทึกใน Table
        let data = {
            ...req.body,
            travellerImage: req.file.path.replace("images\\traveller\\", "")
        }

        const result = await Traveller.create(data);
        res.status(201).json({
            message: "Traveller created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//ฟังก์ชันตรวจสอบการเข้าใช้งานของผู้ใช้กับตาราง traveller_tb
exports.checkLoginTraveller = async (req, res) => {
    try {
        const result = await Traveller.findOne({
            where: {
                travellerEmail: req.params.travellerEmail,
                travellerPassword: req.params.travellerPassword
            } 
        });
        if(result) {
            res.status(200).json({
                message: "Traveller login successfully",
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

//ฟังก์ชันแก้ไขข้อมูลส่วนตัวของผู้ใช้งานกับตาราง traveller_tb
exports.editTraveller = async (req, res) => {
    try {
        const result = await Traveller.update(req.body, {
            where:{
                travellerId: req.params.travellerId,
            }
        });
        res.status(200).json({
            message: "Traveller updated successfully",
            data: result
        });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//ฟังก์ชันเพื่อการอัปโหลดไฟล์
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, "images/traveller");
   } ,
   filename: (req, file, cb) => {
       cb(null, 'traveller_'+ Math.floor(Math.random()* Date.now()) + path.extname(file.originalname));
   }
})

exports.uploadTraveller = multer({
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
}).single("travellerImage");