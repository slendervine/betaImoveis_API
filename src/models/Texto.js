import mongoose, { mongo } from "mongoose";

//O esquemático dos meus documentos no mongoDB 
const textoSchema = new mongoose.Schema(
    {
        id:     {type: String},
        titulo: {type: String},
        autor:  {type: String},
        texto:  {type: String},
    }
)

const textos = mongoose.model('textos', textoSchema);


export default textos;