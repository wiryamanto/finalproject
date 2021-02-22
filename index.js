const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const path = require ("path");
const mysql = require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'final_express'
});

connection.connect(function(err){
    if(err) console.log(error);
    else console.log('database terkoneksi');
});

app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req, res)=>{
    let sql ="SELECT * FROM film";
    connection.query(sql,(err, rows)=>{
        // console.log(rows);
        if(err) throw err;
        res.render('film_index',{
            title : 'CRUD Express',
            final_express:rows
        });
    });
});

app.get('/add',(req, res)=>{
    res.render('film_add',{
        title: 'Tambah film'
    });
} );

app.post('/save',(req, res)=>{
    console.log(req);
    let data ={ 
        judul_film: req.body.judul_film, 
        rating:req.body.rating, 
        tahun_rilis:req.body.tahun_rilis
    };
    let sql ="INSERT INTO film SET ?";
    let query = connection.query(sql, data,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:filmId',(req, res)=>{
    const filmId = req.params.filmId;
    let sql ="Select * from film where id_film =" + filmId+"" ;
    let query = connection.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result[0]);
        res.render('film_edit', {
            title: 'Edit data',
            film: result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    console.log(req.body);
    const body = req.body
    const filmId = req.body.id_film;
    let sql = "UPDATE film SET ? WHERE id_film =" + filmId +"";
    // let sql= "update user set nama='"+req.body.nama+"', email='"+req.body.email+"', telp='"+req.body.telp+"' where id =" + userId;
    let query= connection.query(sql, body, (err, result)=>{
        if(err)throw err;
        res.redirect('/');
    });
});

app.get('/delete/:filmId',(req,res)=>{
    const filmId = req.params.filmId;
    let sql = `DELETE from film where id_film = ${filmId}`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});


app.listen(3000, ()=>{
    console.log('running');
})