const carometro = require("../controllers/CarometroController");
const multer = require('multer');
const upload = multer({})

module.exports = (app) => {

    app.post("/carometro/imagem",upload.single('file'), carometro.salvaImagem);
    
}
  