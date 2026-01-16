import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const cliente = mongoUri ? new MongoClient(mongoUri) : null;

let documentosColecao;

if (process.env.SKIP_DB === "1" || process.env.NODE_ENV === "test") {
    console.log("Conexão com banco de dados ignorada (modo teste).");
    documentosColecao = null;
} else {
    if (!mongoUri) {
        console.error("MONGODB_URI não configurada. Defina a variável de ambiente antes de iniciar.");
    } else {
        try {
            await cliente.connect();

            const db = cliente.db("alura-websockets");
            documentosColecao = db.collection("documentos");

            console.log("Conectado ao banco de dados com sucesso!");

        } catch (erro) {
            console.log(erro)
        }
    }
}

export { documentosColecao }