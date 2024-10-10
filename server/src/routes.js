const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const ProductController = require('./controllers/ProductController');

let multer = require("multer")

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/product', ProductController.create);
    app.put('/product/:productId', ProductController.put);
    app.delete('/product/:productId', ProductController.remove);
    app.get('/product/:productId', ProductController.show);
    app.get('/products', ProductController.index);

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            // ตั้งปลายทางที่ต้องการเก็บไฟล์
            callback(null, './uploads'); // ตัวอย่างเช่น โฟลเดอร์ uploads
        },
        filename: function (req, file, callback) {
            // ตั้งชื่อไฟล์ที่อัปโหลด
            callback(null, file.fieldname + '-' + Date.now());
            console.log(file.originalname); // เพื่อดูชื่อไฟล์ที่อัปโหลดใน console
        }
    });

    let upload = multer({ storage: storage }).array("userPhoto", 10)

    // Route สำหรับการอัปโหลดไฟล์
    app.post("/upload", function (req, res) {

        // เช็คว่า Authenticated หรือไม่ (สมมติว่ามีฟังก์ชัน isUserAuthenticated)
        if (!isUserAuthenticated(req)) {
            return res.status(401).send("Unauthorized access");
        }

        // เรียกใช้งานการอัปโหลดไฟล์ด้วย multer
        upload(req, res, function (err) {
            if (err) {
                // ถ้ามีข้อผิดพลาดระหว่างการอัปโหลด
                return res.end("Error uploading file.");
            }

            // ถ้าอัปโหลดสำเร็จ
            res.end("File is uploaded!");
        });
    });
    //delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename)
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
                (err) => {
                    if (err) throw err;
                    res.send("Delete sucessful")
                    // console.log('successfully deleted material file');
                });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete file the material'
            })
        }
    })
}