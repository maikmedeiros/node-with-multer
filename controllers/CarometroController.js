const carometros = require('../models/CarometroModels');

async function verificaPai(cpf){
    const resultado = await carometros.usuariosPais(cpf);
    const ePai = resultado.length > 0;
    return ePai;
}

async function verificaFunc(cpf){
    const resultado = await carometros.usuariosFunc(cpf);
    const eFunc = resultado.length > 0;
    return eFunc;
}

class CarometroController{
    static async salvaImagem(req, res) {
        const encoded = req.file.buffer.toString('base64')
        const { cpf } = req.body;

        const ePai = await verificaPai(cpf);
        const eFunc = await verificaFunc(cpf);
        
        if(ePai){
            carometros.salvaImagem(encoded, cpf);
            return res.status(200).json({message: 'Pai salvo'});
        }

        if(eFunc){
            await carometros.salvaImagemFunc(encoded, cpf);
            const ultimoId = await carometros.buscaUltimaImagem();
            carometros.alteraUsuarioImagem(ultimoId[0].id, cpf);
            return res.status(200).json({message: 'Funcionario salvo'});
        }
        return res.status(200).json({message: 'ok'});
    }
}
module.exports = CarometroController;