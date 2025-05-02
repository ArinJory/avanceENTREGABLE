const express = require('express');
const app = express();
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'maquillaje_db'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, resultados) => {
    if (err) throw err;
    res.render('index', { productos: resultados });
  });
});

app.get('/agregar', (req, res) => {
  res.render('agregar');
});

app.post('/agregar', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, precio, marca, stock } = req.body;
  const imagen = req.file ? req.file.filename : '';
  const sql = 'INSERT INTO productos (nombre, descripcion, precio, marca, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, descripcion, precio, marca, stock, imagen], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM productos WHERE id = ?';
  db.query(sql, [id], (err, resultado) => {
    if (err) throw err;
    if (resultado.length > 0) {
      res.render('editar', { producto: resultado[0] });
    } else {
      res.send('Producto no encontrado');
    }
  });
});

app.post('/editar/:id', upload.single('imagen'), (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, marca, stock } = req.body;
  const imagen = req.file ? req.file.filename : null;

  let sql;
  let datos;

  if (imagen) {
    sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, marca=?, stock=?, imagen=? WHERE id=?';
    datos = [nombre, descripcion, precio, marca, stock, imagen, id];
  } else {
    sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, marca=?, stock=? WHERE id=?';
    datos = [nombre, descripcion, precio, marca, stock, id];
  }

  db.query(sql, datos, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});
app.post('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM productos WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
