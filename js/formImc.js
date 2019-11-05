// Função para calcular valores
$(document).ready(function (){
  $("#divResultado").hide();
  $("#voltar").hide();
$("#calcular").click(function(){
  var v1 = document.dados.valor1;
  var v2 = document.dados.valor2;

  if(validar(v1,"alerta1", "labelv1") && validar(v2,"alerta2","labelv2")){
    var n1 = parseFloat(v1.value);
    var n2 = parseFloat(v2.value);
    var altura = n1**2;
    var res = n2/altura;
    $("#formDados").hide();
    $("#divResultado").show();
    if(res < 18.5){
    $("#divResultado").append('<h1 class="text-danger"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
    $("#divResultado").append('<div id="alertaPeso"class="alert alert-danger"><h4>MUITO CUIDADO!</h4><p>Você está subnutrido!<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }if(res>18.4 && res < 25.0){
      $("#divResultado").append('<h1 class="text-success"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
      $("#divResultado").append('<div id="alertaPeso"class="alert alert-success"><h4>PARABÉNS!</h4><p>Você está dentro do peso saudável :)<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }if(res>24.9 && res < 30.0){
      $("#divResultado").append('<h1 class="text-warning"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
      $("#divResultado").append('<div id="alertaPeso"class="alert alert-warning"><h4>É PRECISO MAIS ATENÇÃO!</h4><p>Você está em sobreso!<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }if(res>29.9 && res < 35.0){
      $("#divResultado").append('<h1 class="text-danger"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
      $("#divResultado").append('<div id="alertaPeso"class="alert alert-danger"><h4>CUIDADO!</h4><p>Você está em Obesidade grau 1!<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }if(res>34.9 && res < 40.0){
      $("#divResultado").append('<h1 class="text-danger"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
      $("#divResultado").append('<div id="alertaPeso"class="alert alert-danger"><h4>MUITO CUIDADO!</h4><p>Você está em Obesidade grau 2!<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }if(res>39.9){
      $("#divResultado").append('<h1 class="text-danger"id="resultado"> Seu IMC é '+res.toFixed(2)+'</h1>');
      $("#divResultado").append('<div id="alertaPeso"class="alert alert-danger"><h4>PROCURE AJUDA!</h4><p>Você está em Obesidade grau 3!<p><hr><p> Seu peso ideal está entre '+(18.5*altura).toFixed(2)+' e '+(24.9*altura).toFixed(2)+' Kg</p></div>');
    }
    $("#voltar").show();
  }
});
  function validar(campo, alerta, label){
    var n = parseFloat(campo.value);
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
  $("#voltar").click(function(){
    $("#divResultado").hide();
    $("#voltar").hide();
    $("#resultado").remove();
    $("#alertaPeso").remove();
    $("#formDados").show();
  });

  $("#limpar").click(function(){
    var v1 = document.dados.valor1;
    var v2 = document.dados.valor2;
    limparAux(v1,"alerta1", "labelv1");
    limparAux(v2,"alerta2","labelv2");
  });
  function limparAux(campo, alerta, label){
    document.getElementById(alerta).style.display = "none";
    campo.classList.remove("is-invalid");
    campo.classList.remove("is-valid");
    document.getElementById(label).classList.remove("text-success");
    document.getElementById(label).classList.remove("text-danger");
  }
});
