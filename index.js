// mengambil argument dari command line
// const { describe } = require('yargs');
// const yargs = require('yargs');
// const { simpanContact,listContacts,detailContact,deleteContact } = require('./contact');
const bodyParser = require('body-parser');
const express = require('express');
const {notFound,errorHandler} = require('./middlewares/errorHandler')
const path = require('path');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoute')
const dbConnect = require('./config/dbConnect') 
const PcategoryRoute = require('./routes/productCategoryRoute')
const BcategoryRoute = require('./routes/blogCategoryRoute.js')
const productRoute = require('./routes/productRoute')
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan')
dbConnect();


const app = express();
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json())
app.set(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views','view')
app.use(express.static(path.join(__dirname,'asset')))


app.use('/api/Pcategory',PcategoryRoute)
app.use('/api/Bcategory',BcategoryRoute)
app.use('/api/user',authRoute)
app.use('/api/product',productRoute)
app.use('/api/blog',blogRoute)

// app.get('/',(req,res)=>{
//     res.render('home',{
//         title : "Halaman Home",
//         css : "main"
//     })
// })
// app.get('/Produk',(req,res)=>{
//     res.render('produk',{
//         title : 'Halaman Produk',
//         css : "main"
//     })
// })
// app.get('/Pembelian',(req,res)=>{
//     res.render('pembelian',{
//         title : 'Halaman Pembelian',
//         css : "main"
//     })
// })
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,(err)=>{
    if(err)
        throw err
    console.log(`koneksi berhasil di port ${PORT}`);

})





































// yargs.command({
//     command : 'add',
//     describe : 'Menambahkan contact baru',
//     builder : {
//         nama : {
//             describe : 'Nama Panjang',
//             demandOption : true,
//             type : 'string' 
//         },
//         no : {
//             describe : 'Nomor telepon',
//             demandOption : false ,
//             type : 'string'
//         },
//         email : {
//             describe : 'email',
//             demandOption : true,
//             type : 'string'
//         }
//     },
//     handler(argv){
//         simpanContact(argv.nama,argv.no,argv.email)
//     }
    
// }).demandCommand()

// yargs.command({
//     command : 'list',
//     describe : "menampilkan nama dan no hp",
//     handler(){
//         listContacts()
//     }
// })

// yargs.command({
//     command : 'detail',
//     describe : "menampilkan detail",
//     builder : {
//         nama : {
//             describe : 'Nama Panjang',
//             demandOption : true,
//             type : 'string' 
//         },
//     },
//     handler(argv){
//         detailContact(argv.nama)
//     }
// })

// yargs.command({
//     command : 'delete',
//     describe : "menghapus kontak berdasarkan nama",
//     builder : {
//         nama : {
//             describe : 'Nama Panjang',
//             demandOption : true,
//             type : 'string' 
//         },
//     },
//     handler(argv){
//         deleteContact(argv.nama)
//     }
// })

// yargs.parse();
