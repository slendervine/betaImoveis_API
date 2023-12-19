import textos   from "../models/Texto.js";
import sqlMSSQL from "../config/dbConnect_MSSQLS.cjs";


const config = {
    user: 'sa',
    password: '123221321',
    server: 'PC',
    database: 'beta_cliente1_new',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        trustServerCertificate: true
    }
}

class TextoController {

    static Sandbox = (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        let imovel = req.body

        const querySelect = `EXEC SP_sandbox @METODO = '${imovel.metodo}', @ID_ENTIDADE = '${imovel.id_entidade}'`

        console.log(querySelect)

        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query(querySelect, function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send(recordset)
    
            });
        });
    }


    static consultarImoveis = (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        


        const querySelect = `EXEC SP_slendermooth_imoveis @METODO = 'CONSULTA_IMOVEIS'`

        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query(querySelect, function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send(recordset)
    
            });
        });
    }

    static consultarImovel = (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        let ID_IMOVEL = req.params.id

        console.log(req.params);
        console.log(ID_IMOVEL);

        const querySelect = `EXEC SP_slendermooth_imoveis @METODO = 'CONSULTAR_IMOVEL', @ID_IMOVEL = '${ID_IMOVEL}' `
       
        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query(querySelect, function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send(recordset)
    
            });
        });
    }


    static buscaOptions = (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        let METODO = req.params.metodo

        const querySelect = `EXEC SP_slendermooth_options @METODO = '${METODO}' `
       
        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query(querySelect, function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send(recordset)
    
            });
        });
    }


    static cadastrarImovel = (req, res) => {

        let imovel = req.body

        console.log(imovel);

        const querySelect = ` EXEC SP_slendermooth_imoveis
                              @METODO                        = 'CADASTRAR_IMOVEL'
                             ,@DESCRICAO_TITULO_IMOVEL       = '${imovel.descricaoTituloImovel}'
                             ,@VALOR_IMOVEL                  = '${imovel.valorImovel}'
                             ,@VALOR_MINIMO_IMOVEL           = '${imovel.valorMinimoImovel}'
                             ,@ID_PROPRIETARIO               = '${imovel.idProprietario}'
                             ,@ID_TIPO_IMOVEL                = '${imovel.idTipoImovel}'
                             ,@ID_FINALIDADE_IMOVEL          = '${imovel.idFinalidadeImovel}'
                             ,@QUANTIDADE_SALA_JANTAR        = '${imovel.quantidadeSalaJantar}'
                             ,@QUANTIDADE_COZINHAS           = '${imovel.quantidadeCozinhas}'
                             ,@QUANTIDADE_QUARTOS            = '${imovel.quantidadeQuartos}'
                             ,@QUANTIDADE_BANHEIRO           = '${imovel.quantidadeBanheiro}'
                             ,@QUANTIDADE_LAVANDERIA         = '${imovel.quantidadeLavanderia}'
                             ,@QUANTIDADE_SALA_ESTAR         = '${imovel.quantidadeSalaEstar}'
                             ,@VAGAS_GARAGEM                 = '${imovel.quantidadeVagasGaragem}'
                             ,@ID_CONDOMINIO                 = '1'
                             ,@ANDAR_ALTURA                  = '4'
                             ,@METROS_QUADRADOS_TERRENO      = '${imovel.metrosQuadradosTerreno}'
                             ,@METROS_QUADRADOS_CONSTRUIDOS  = '${imovel.metrosQuadradosConstruidos}'
                             ,@ID_MATERIAL                   = '${imovel.idMaterial}'
                             ,@ID_USUARIO                    = '1' 
                             ,@MOBILIADO                     = '0'
                             ,@ELEVADOR                      = '${imovel.checkElevador}'
                             ,@PISCINA                       = '${imovel.checkPiscina}'
                             ,@PORTARIA                      = '${imovel.checkPortaria}'
                             ,@SALAO_FESTAS                  = '${imovel.checkSalaoFesta}'
                             ,@DESCRICAO_COMPLETA_IMOVEL     = '${imovel.descricaoCompletaImovel}' `

        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query('select * from dbo.BETA_ENTIDADES', function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send(recordset)
    
            });
        });
    }



    static cadastrarEstados = (req, res) => {
        
        let todosEstados = req.body
        var query = `INSERT INTO BETA_ESTADOS (Sigla, Nome, Codigo) VALUES `

        for(var key in todosEstados){
            query = query + `('${todosEstados[key].sigla}', '${todosEstados[key].nome}', '${todosEstados[key].id}'),`
        }
        
        //Remove ultima vírgula
        query = query.substring(0, query.length - 1);
        console.log(query)


        sqlMSSQL.connect(config, function (err) {
    
            if (err) console.log(err);
    
            // create Request object
            var request = new sqlMSSQL.Request();
    
            request.query(query, function (err, recordset) {
    
                if (err) console.log(err)

                console.log(recordset);

                if(!err) res.status(200).send("Sucesso!")
    
            });
        });
    }




    static listarTextos = (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


        textos.find((err, textos) => {
            res.status(200).json(textos);
        })
    }

    static listarTextoPorId = (req, res) => {
        
        let idTexto = req.params.id 

        textos.findById(idTexto, (err, textos) => {
            if(err){
                res.status(400).send({message: `${err.message} - Texto não localizado com este ID`})
            } else {
                res.status(200).send(textos)
            }
        })
    }

    static inserirTexto = (req, res) => {

        let texto = new textos(req.body)

        texto.save((err) => {

            if(err){
                res.status(500).send({message: `${err.message} - Falha ao inserir o texto no MongoDB.`})
            } else {
                res.status(201).send(texto.toJSON())
            }

        })
    }

    static atualizarTexto = (req, res) => {

        let idTexto = req.params.id;
        
        textos.findByIdAndUpdate(idTexto, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: "Texto atualizado com sucesso!"})
            } else {
                res.status(500).send({message: err.message})
            }
        })

    }

    static excluirTexto = (req, res) => {

        let idTexto = req.params.id;
        
        textos.findByIdAndDelete(idTexto, (err) => {
            if(!err){
                res.status(200).send({message: "Texto excluído com sucesso!"})
            } else {
                res.status(500).send({message: err.message})
            }
        })

    }

}



export default TextoController;