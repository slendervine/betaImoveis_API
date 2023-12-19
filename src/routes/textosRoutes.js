import express from "express";
import TextoController from "../controllers/textosController.js";

const router = express.Router();

router
    .get('/consulta',               TextoController.consultarImoveis)
    .get('/consulta_imovel/:id',    TextoController.consultarImovel)

    .get('/select_options/:metodo',    TextoController.buscaOptions)
    
    .post('/imovel/cadastrar',               TextoController.cadastrarImovel)
    .post('/cadastrarEstados',               TextoController.cadastrarEstados)

    .get('/textos',      TextoController.listarTextos)
    .get('/textos/:id',  TextoController.listarTextoPorId)

    .post('/textos',        TextoController.inserirTexto)
    .put('/textos/:id',     TextoController.atualizarTexto)
    .delete('/textos/:id',  TextoController.excluirTexto)


export default router;