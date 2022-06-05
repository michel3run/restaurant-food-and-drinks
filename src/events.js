const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  // Al registrar ver si alguien ya tiene ese correo
  router.get('/searchUser/:email', function (req, res, next) {
    db.query(
      'SELECT * FROM usuario where email=? ',
      [req.params.email],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  //Para logearse 
  router.get('/login/:email/:pass', function (req, res, next) {
    db.query(
      'SELECT * FROM usuario where email=? and password=?',
      [req.params.email, req.params.pass],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  //Listar todos los productos  por tipo
  router.get('/productosAll', function (req, res, next) {
    db.query(
      'SELECT * FROM productos',
      [req.params.tipo],

      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  

  router.get('/productosPlato/:plato', function (req, res, next) {
    db.query(
      'SELECT * FROM productos where nombre=?',
      [req.params.plato],

      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  //Listar todos los productos segun su tipo
  router.get('/productos/:tipo', function (req, res, next) {
    db.query(
      'SELECT * FROM productos where tipo=? ',
      [req.params.tipo],

      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  //Buscar producto por id

  router.get('/productosID/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM productos where id=? ',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


    //insertar pedido
    router.post('/userInsert', (req, res, next) => {
      db.query(
        'INSERT INTO usuario(email,password,creditCard)  VALUES (?,?,?)',
        [req.body.email, req.body.password, req.body.creditCard],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({ status: 'error' });
          } else {
            res.status(200).json({ status: 'ok' });
          }
        }
      );
    });

  //insertar pedido
  router.post('/insertPedidos', (req, res, next) => {
    db.query(
      'INSERT INTO pedidos(idUser,fecha,estado,comentarios,total)  VALUES (?,?,?,?,?)',
      [req.body.idUser, req.body.fecha, req.body.estado ,req.body.comentarios, req.body.total],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  //Buscar pedido por idUser y fecha
  router.get('/pedidos/:idUser/:fecha', function (req, res, next) {
    db.query(
      'SELECT * FROM pedidos where idUser=? and fecha=?',
      [req.params.idUser, req.params.fecha],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  //Buscar pedido pagado
  router.get('/pedidos/:estado', function (req, res, next) {
    db.query(
      'SELECT * FROM pedidos where estado=?	',
      [req.params.estado],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  //Coger comentario
  router.get('/pedidosComentario/:idPedido', function (req, res, next) {
    db.query(
      'SELECT * FROM pedidos where id=?	',
      [req.params.idPedido],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  //insertar lineapedidos
  router.post('/lineaPedidos', (req, res, next) => {
    db.query(
      'INSERT INTO lineapedidos(idPedidos,idProductos)  VALUES (?,?)',
      [req.body.idPedidos, req.body.idProductos],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
  //change disponible produc
  router.post('/changeProduct', (req, res, next) => {
    db.query(
      'UPDATE productos SET disponible = ? WHERE id=?',
      [req.body.disponible, req.body.id],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

    //Buscar el ticket del pedido en linea pedido
    router.get('/lineapedido/:idPedido', function (req, res, next) {
      db.query(
        'SELECT * FROM productos JOIN lineapedidos ON productos.id=lineapedidos.idProductos WHERE lineapedidos.idPedidos=?	',
        [req.params.idPedido],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: 'error' });
          } else {
            res.status(200).json(results);
          }
        }
      );
    });
//Buscar el cliente del ticket
    router.get('/usuarioPedido/:idPedido', function (req, res, next) {
      db.query(
        'SELECT * FROM usuario JOIN pedidos ON usuario.id=pedidos.idUser WHERE pedidos.id=?	',
        [req.params.idPedido],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: 'error' });
          } else {
            res.status(200).json(results);
          }
        }
      );
    });

      //change entregado pedido
  router.post('/changeEntregado', (req, res, next) => {
    db.query(
      'UPDATE pedidos SET estado = ? WHERE id=?',
      [req.body.estado, req.body.id],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  //ejemplos
  router.get('/user', function (req, res, next) {
    db.query(
      'SELECT * FROM prueba ',
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/user/:id', function (req, res, next) {
    db.query(
      'SELECT * FROM prueba where user=? ',
      [req.params.id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/user/userImport', (req, res, next) => {
    db.query(
      'INSERT INTO prueba  VALUES (?,?)',
      [req.body.usuario, req.body.password],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });
  return router;
}

module.exports = createRouter;