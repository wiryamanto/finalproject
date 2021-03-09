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
    let sql ="SELECT * FROM film join category on film.id_category = category.id_category";
    connection.query(sql,(err, rows)=>{
        // console.log(rows);
        if(err) throw err;
        res.render('home',{
            title : 'CRUD Express',
            movies:rows
        });
    });
});

app.get('/list_film',(req, res)=>{
    let sql ="SELECT * FROM film join category on film.id_category = category.id_category";
    connection.query(sql,(err, rows)=>{
        // console.log(rows);
        if(err) throw err;
        res.render('film_index',{
            title : 'CRUD Express',
            final_express:rows
        });
    });
});

app.get('/category_list',(req,res)=>{
    let sql =" select * from category";
    connection.query(sql,(err, rows)=>{
        if(err) throw err;
        res.render('category_index',{
            title : 'list category',
            categorys : rows
        })
    })
})

app.get('/category_film',(req, res)=>{
    let sql ="select * from category";
    connection.query(sql,(err, rows)=>{
        if(err) throw err;
        res.render('category_film',{
            title : 'category_film',
            categorys : rows
        })
    });
});

app.get('/add',(req, res)=>{
    let sql ="select * from category";
    connection.query(sql,(err, rows)=>{
        if(err) throw err;
        res.render('film_add',{
            title: 'tambah film',
            categorys:rows
        })
    })
} );

app.get('/add_Category',(req, res)=>{
    res.render('category_add',{
        title: 'Tambah category'
    });
} );

app.post('/save',(req, res)=>{
    console.log(req);
    let data ={ 
        judul_film: req.body.judul_film, 
        rating:req.body.rating, 
        tahun_rilis:req.body.tahun_rilis,
        id_category:req.body.id_category
    };
    let sql ="INSERT INTO film SET ?";
    let query = connection.query(sql, data,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.post('/save_category',(req, res)=>{
    console.log(req);
    let data ={ 
        name_category: req.body.category
    };
    let sql ="INSERT INTO category SET ?";
    let query = connection.query(sql, data,(err, result)=>{
        if(err) throw err;
        res.redirect('/category_film');
    });
});


app.get('/edit/:filmId',(req, res)=>{
    const filmId = req.params.filmId;
    let sql ="Select * from film where id_film =" + filmId+"" ;
    let query = connection.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result[0]);
        res.render('film_edit', {
            title: 'Edit film',
            film: result[0]
        });
    });
});

app.get('/edit_category/:id',(req,res)=>{
    const idCategory = req.params.id;
    let sql ="select * from category where id_category =" +idCategory+"";
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.render('edit_category',{
            title : 'solve',
            categorys: result[0]           
        })
    })
})

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

app.post('/update_category',(req,res)=>{
    console.log(req.body);
    const body = {
        name_category: req.body.category
    }
    const id = req.body.id;
    let sql = "UPDATE category SET ? WHERE id_category =" + id +"";
    // let sql= "update user set nama='"+req.body.nama+"', email='"+req.body.email+"', telp='"+req.body.telp+"' where id =" + userId;
    let query= connection.query(sql, body, (err, result)=>{
        if(err)throw err;
        res.redirect('/category_film');
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

app.get('/delete_category/:id',(req,res)=>{
    const id = req.params.id;
    let sql = `DELETE from category where id_category = ${id}`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.redirect('/category_list');
    });
});

app.get('/category_film/:id_category',(req,res)=>{
    const id_category = req.params.id_category;
    let sql = `select * from film where id_category = '${id_category}'`
    let query = connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.render('view_film', {
            title:'view film',
            movies:result

        });
    })
})


app.listen(3000, ()=>{
    console.log('running');
})