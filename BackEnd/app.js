const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;


const User = require('./Router/User') // ใช้งาน router module
app.use('/user', User)


const books = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/test', (req, res) => {
    res.send('Test Hello World!');   
});

app.get('/books', (req, res) => {
    res.json(books)
  })

  app.get('/books/:id', (req, res) => {
    res.json(books.find(book => book.id === req.params.id))
  })

  app.post('/books', (req, res) => {
    req.body.id = books.length +1;
    books.push(req.body)
    res.status(201).json(req.body)
  })
 

  app.put('/books/:id', (req, res) => {
    const updateIndex = books.findIndex(book => book.id === req.params.id)
    res.json(Object.assign(books[updateIndex], req.body))
  })
  
  
  app.delete('/books/:id', (req, res) => {
    const deleteIndex = books.findIndex(book => book.id === req.params.id)
    books.splice(deleteIndex, 1)
    res.status(204).send()
  })

  app.get('/example/a', function (req, res, next) {
    req.myobj = 'Hello from A!'
    next()
},function(req, res){
    req.myobj += ' Again!!!'
    res.send(req.myobj)
})


var func_a = function(req, res, next) {
    req.myobj = 'A'
    next();
}
var func_b = function(req, res, next) {
    req.myobj += ' B'
    next();
}
var func_c = function(req, res) {
    req.myobj += ' C'
    res.send(req.myobj);
}
app.get('/example/b', [func_a,func_b,func_c])


app.get('/about',function(req, res){
    // ตัวอย่งแสดงไฟล์ about.html ที่อยู่ใน root 
    // ซึ่งเวลาใช้งานจริง เราจะใช้ path module มาข่วย จะไม่กำหนดลักษณะนี้
    // res.sendFile(path.join(__dirname+'/about.html')); // กรณีใช้ path module
    res.sendFile("D:\\Project\\FixService\\BackEnd\\about\\about.html")
})

app.get('/download',function(req, res){
    res.download('app2.txt','mysavefile.txt',function(err){
        if (err) {
            //       console.log(res.headersSent)
            console.log(err)
            console.log("Can't downlaod")
            res.send("Can't download file!")
        } else {
            console.log("file downloaed")
        }
    })
})

app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })

    app.get('/fs', (req, res) => {
        fs.writeFile(path.join(__dirname, 'TestWrite.txt'), "Hello 2", () => {
          
            res.send('Finished writing file')
        }) 
    });