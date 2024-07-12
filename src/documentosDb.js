import { documentosColecao } from "./dbConnect.js";

function encontraDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    });

    return documento;
  };

  function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome
    }, {
        $set: {
            texto
        },
    });

    return atualizacao;
  }

  export { encontraDocumento, atualizaDocumento };