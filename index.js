// mengambil argument dari command line
// const { describe } = require('yargs');
// const yargs = require('yargs');
// const { simpanContact,listContacts,detailContact,deleteContact } = require('./contact');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
app.set(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.set('views','view')
app.use(express.static(path.join(__dirname,'asset')))

app.get('/',(req,res)=>{
    res.render('home',{
        title : "Halaman Home"
    })
})
app.get('/Produk',(req,res)=>{
    res.render('produk',{
        title : 'Halaman Produk'
    })
})
app.get('/Pembelian',(req,res)=>{
    res.render('pembelian',{
        title : 'Halaman Pembelian'
    })
})

app.listen('9000',(err)=>{
    if(err)
        throw err
    console.log("koneksi berhasil di port 9000");

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
