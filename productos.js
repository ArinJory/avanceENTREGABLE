const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configurar multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Mostrar todos los productos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM productos';
  req.db.query(sql, (err, resultados) => {
    if (err) throw err;
    res.render('index', { productos: resultados });
  });
});

// Mostrar formulario de agregar
router.get('/agregar', (req, res) => {
  res.render('agregar');
});

// Guardar producto nuevo
router.post('/guardar', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, precio, marca, stock } = req.body;
  const imagen = req.file ? req.file.filename : '';

  const sql = 'INSERT INTO productos (nombre, descripcion, precio, marca, stock, imagen) VALUES (?, ?, ?, ?, ?, ?)';
  req.db.query(sql, [nombre, descripcion, precio, marca, stock, imagen], (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

// Mostrar formulario para editar
router.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM productos WHERE id = ?';
  req.db.query(sql, [id], (err, resultados) => {
    if (err) throw err;
    if (resultados.length > 0) {
      res.render('editar', { producto: resultados[0] });
    } else {
      res.send('Producto no encontrado');
    }
  });
});

// Guardar cambios del producto editado
router.post('/editar/:id', upload.single('imagen'), (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, marca, stock } = req.body;
  const imagen = req.file ? req.file.filename : null;
  let sql, datos;

  if (imagen) {
    sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, marca = ?, stock = ?, imagen = ? WHERE id = ?';
    datos = [nombre, descripcion, precio, marca, stock, imagen, id];
  } else {
    sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, marca = ?, stock = ? WHERE id = ?';
    datos = [nombre, descripcion, precio, marca, stock, id];
  }

  req.db.query(sql, datos, (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

// Eliminar producto
router.post('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM productos WHERE id = ?';
  req.db.query(sql, [id], (err) => {
    if (err) throw err;
    res.redirect('/productos');
  });
});

module.exports = router;

