// mengambil argument dari command line
const { describe } = require('yargs');
const yargs = require('yargs');
const { simpanContact,listContacts,detailContact,deleteContact } = require('./contact');


yargs.command({
    command : 'add',
    describe : 'Menambahkan contact baru',
    builder : {
        nama : {
            describe : 'Nama Panjang',
            demandOption : true,
            type : 'string' 
        },
        no : {
            describe : 'Nomor telepon',
            demandOption : false ,
            type : 'string'
        },
        email : {
            describe : 'email',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        simpanContact(argv.nama,argv.no,argv.email)
    }
    
}).demandCommand()

yargs.command({
    command : 'list',
    describe : "menampilkan nama dan no hp",
    handler(){
        listContacts()
    }
})

yargs.command({
    command : 'detail',
    describe : "menampilkan detail",
    builder : {
        nama : {
            describe : 'Nama Panjang',
            demandOption : true,
            type : 'string' 
        },
    },
    handler(argv){
        detailContact(argv.nama)
    }
})

yargs.command({
    command : 'delete',
    describe : "menghapus kontak berdasarkan nama",
    builder : {
        nama : {
            describe : 'Nama Panjang',
            demandOption : true,
            type : 'string' 
        },
    },
    handler(argv){
        deleteContact(argv.nama)
    }
})

yargs.parse();