const conexao = require('../database');

const executaQuery = (query, params = '') => new Promise((resolve, reject) => {
    conexao.getConnection((error, connection) => {
    if (error) {
      reject(error);
    } else {
      connection.query(query, params, (errors, results) => {
        if (errors) {
          reject(errors);
        } else {
          resolve(results);
        }
        connection.release();
      });
    }
  });
});

class CarometroModels {
    static usuariosPais(cpf) {
        const sql = `select cpf from usuarios where cpf = '${cpf}'`;
        return executaQuery(sql);   
    }
    static usuariosFunc(cpf) {
        const sql = `select cpf from Usuarios2 where cpf = '${cpf}'`;
        return executaQuery(sql);   
    }

    static salvaImagem(imagem, cpf) {
        const sql = `insert into imagem (imagem, cpf) values ('${imagem}', '${cpf}')`;
        return executaQuery(sql);   
    }
    static salvaImagemFunc(imagem, cpf) {
        const sql = `insert into imagem2 (imagem, cpf) values ('${imagem}', '${cpf}')`;
        return executaQuery(sql);   
    }

    static buscaUltimaImagem() {
        const sql = `select max(id) as id from imagem2`;
        return executaQuery(sql);
    }
    static alteraUsuarioImagem(ultimoId, cpf) {
        const sql = `update Usuarios2 set idimagem = ${ultimoId} where cpf = '${cpf}'`;
        return executaQuery(sql);   
    }
}

module.exports = CarometroModels;