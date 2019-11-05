function conferir(){
  var v1 = document.dados.nomeCompetidor;
  var v2 = document.dados.posicaoLargada;
  var v3 = document.dados.tempoComp;
  if(validar(v1,"alerta1","labelNomeCompetidor") &&
  validarAux(v2,"alerta2","labelPosicaoLargada") &&
  validarAux(v3,"alerta3","labelTempoComp")) {
      //alert("Cadastro Efetuado com Sucesso!");
      //limparCampos();
      return true;
  }
}
function validar(campo, alerta, label){
      var n = campo.value;
      if(campo.value.length == 0 || !isNaN(n)){
        document.getElementById(alerta).style.display = "block";
        document.getElementById(label).classList.add("text-danger");
        campo.classList.add("is-invalid");
        campo.value = "";
        campo.focus();
        return false;
      }
      // Tudo Correto
      document.getElementById(alerta).style.display = "none";
      campo.classList.remove("is-invalid");
      document.getElementById(label).classList.remove("text-danger");
      campo.classList.add("is-valid");
      document.getElementById(label).classList.add("text-success");
      return true;
    }
function validarAux(campo, alerta, label){
        var n = campo.value;
        if(campo.value.length == 0 || isNaN(n)){
          document.getElementById(alerta).style.display = "block";
          document.getElementById(label).classList.add("text-danger");
          campo.classList.add("is-invalid");
          campo.value = "";
          campo.focus();
          return false;
        }
        // Tudo Correto
        document.getElementById(alerta).style.display = "none";
        campo.classList.remove("is-invalid");
        document.getElementById(label).classList.remove("text-danger");
        campo.classList.add("is-valid");
        document.getElementById(label).classList.add("text-success");
        return true;
      }

      function limparCampos(){
        var v1 = document.dados.nomeCompetidor;
        var v2 = document.dados.posicaoLargada;
        var v3 = document.dados.tempoComp;
        limparAux(v1,"alerta1", "labelNomeCompetidor");
        limparAux(v2,"alerta2","labelPosicaoLargada");
        limparAux(v3,"alerta3","labelTempoComp");
      }
      function limparAux(campo, alerta, label){
        document.getElementById(alerta).style.display = "none";
        campo.classList.remove("is-invalid");
        campo.classList.remove("is-valid");
        document.getElementById(label).classList.remove("text-success");
        document.getElementById(label).classList.remove("text-danger");
      }
