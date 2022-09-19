const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');


if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
}
if (!fs.existsSync('data/contacts.json')) {
    fs.writeFileSync('data/contacts.json','[]')
}
const loadContact = ()=>{
    const files = fs.readFileSync('data/contacts.json','utf-8');
    const parseFiles = JSON.parse(files);
    return parseFiles
}

const simpanContact = (nama,no,email)=>{
    parseFiles = loadContact()
    const isUnique = parseFiles.find((files)=>files.email === email)
    const isUniqueName = parseFiles.find((files)=>files.nama === nama)
    if (isUnique || isUniqueName) {
        console.log(chalk.red.inverse.bold('udah ada datanya silahkan menggunakan nama atau email lain'))
        return false
    }

    if (!validator.isEmail(email) || !validator.isMobilePhone(no,'id-ID')) {
        console.log(chalk.red.inverse.bold('ini bukan email & phone number silahkan isi format yang pas'))
        return false
    }
    
    parseFiles.push({nama,no,email});
    fs.writeFileSync('data/contacts.json',JSON.stringify(parseFiles))
    console.log (chalk.green.inverse.bold`berhasil`)

}
const listContacts = ()=>{
    const contacts = loadContact();
    console.log(chalk.blue.bold('Daftar Nama dan Nomor'))
    contacts.forEach((data,i) => {
        console.log(`${i} : ${data.nama} | ${data.no}` )
    });
}
const detailContact = (nama)=>{ 
    const contacts = loadContact();
    const find = contacts.find((val)=>val.nama.toLowerCase() === nama.toLowerCase() )
    if (!find) {
        console.log(chalk.red.inverse.bold(`data dengan nama ${nama} tidak dapat  ditemukan`))
        return false
    }
    console.log(find)
}
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact)=> contact.nama.toLowerCase() !== nama.toLowerCase())
    
    if (contacts.length == newContact.length) {
        console.log(chalk.red.inverse.bold(`data dengan nama ${nama} tidak dapat ditemukan`))
    }
    
    fs.writeFile('data/contacts.json',JSON.stringify(newContact),(err)=>{
        if (err) throw err
        console.log(chalk.green.inverse.bold('data berhasil di hapus'));
    })
}

module.exports = {simpanContact,listContacts,detailContact,deleteContact};
