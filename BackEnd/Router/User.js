var express = require('express') // เรียกใช้งาน express  mudule
var router = express.Router() // กำหนด router instance ให้กับ express.Router class
 
// เราใช้คำสั่ง use() เพื่อเรียกใช้งาน middleware function
// middleware ที่กำงานใน router instance ก่อนเข้าไปทำงานใน route function
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// กำหนด route หลัก หรือ root route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// กำหนด route เพิ่มเติม
router.get('/about', function (req, res) {
    res.send('About birds')
})
 
module.exports = router  // ส่ง router ที่เราสร้าง ออกไปใช้งานภายนอกไฟล์