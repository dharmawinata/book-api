const express = require('express')
const app = express()
const port = 3000

const bookRoute = require("./routes/book.route.js")

//import modul koneksi database
const database = require("./database")


//inisialisasi
//force:true jika ingin refresh database setiap inisialisasi
//force:false jika ingin keep existing database
database.sync({force:true}).then(() => {
    console.log("database synced");
}).catch((err) => {
    console.error(`${err.message}`)
});

//dapat menerima parsing json di postman
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.json({
        ststus : 200,
        message : "RES API SERVER",
        data : null
    })
});

app.use("/api/books/", bookRoute);

app.listen(port, () => {
    console.log(`server running app listening on port ${port}`);
});
