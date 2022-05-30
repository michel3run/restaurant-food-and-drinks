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
          res.status(500).json({status: 'error'});
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
      [req.params.email,req.params.pass],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
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
          res.status(500).json({status: 'error'});
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
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.post('/user/userImport', (req, res, next) => {
    db.query(
      'INSERT INTO prueba  VALUES (?,?)',
      [req.body.usuario,req.body.password],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  return router;
}

module.exports = createRouter;