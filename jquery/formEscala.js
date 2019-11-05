// Função para calcular valores
$(document).ready(function (){
  $("#voltar").hide();
  $("#mychart").hide();
$("#calcular").click(function(){
  var v1 = document.dados.valor1;
  var v2 = document.dados.valor2;
  if(validar(v1,"alerta1", "labelv1") && validar(v2,"alerta2","labelv2")){
    $("#formDados").hide();
    $("#limpar").hide();
    $("#enunciado").hide();
    $("#calcular").hide();
    $("#mychart").show();
    $("#voltar").show();
    var n1 = parseFloat(v1.value);
    var n2 = parseFloat(v2.value);
    var res = Math.log10(n1)  + (3*(Math.log10(8*n2))) - 2.92;
    var a1 = 3.5;
    var a2 = 5.5;
    var a3 = 6.0;
    var a4 = 7.0;
    var a5 = 8.0;
    var data1 = [
      {group: "A", value: 2.0},
      {group: "B", value: a1},
      {group: "C", value: a2},
      {group: "D", value: a3},
      {group: "E", value: a4},
      {group: "F", value: a5},
    ];
    // entrando com as dimensões do gráfico
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    // acrescentado o objeto svg ao corpo da página
    $("#mychart").append('<div id="mychart2" class="jumbotron row bg-light"><div id="grupo" class="col"></div></div>');
    var svg = d3.select("#grupo")
    .append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom).append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");
    // eixo X
    var x = d3.scaleBand()
    .range([ 0, width ]).domain(data1.map(function(d) { return d.group; }))
    .padding(0.2);
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
    // eixo Y
    var y = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);
    svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));
    // Uma função que cria e atualiza o plot:
    function update(data) {
      var u = svg.selectAll("rect").data(data);
      u.enter().append("rect").merge(u).transition().duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth()).attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#69b3a2");
    }
    // Iniciando o plot com os dados
    update(data1);
    var data2=[];
    if(res < 3.5){
       data2 = [
        {group: "Z", value: res},
        {group: "B", value: a1},
        {group: "C", value: a2},
        {group: "D", value: a3},
        {group: "E", value: a4},
        {group: "F", value: a5},
      ];
    $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-success"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
    $("#t1").append('<div class="alert alert-success"><p>NÃO HÁ RISCO!</p><h4>Você está seguro!</h4><hr><h4>O abalo foi menor que 3,5 graus na escala Richter e se encaixa no grupo A segundo o gráfico; Geralmente não é sentido, mas é gravado</h4></div>');
    }if(res>3.4 && res < 5.5){
       data2 = [
        {group: "A", value: 2},
        {group: "B", value: res},
        {group: "C", value: a2},
        {group: "D", value: a3},
        {group: "E", value: a4},
        {group: "F", value: a5},
      ];
      $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-info"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
      $("#t1").append('<div class="alert alert-info"><p>NÃO HÁ RISCO!</p><h4>Você está seguro!</h4><hr><h4>O abalo foi entre 3,5 e 5,4 graus na escala Richter e se encaixa no grupo B segundo o gráfico; As vezes é sentido mas raramente causa danos.</h4></div>');
    }if(res>5.4 && res < 6.1){
       data2 = [
        {group: "A", value: 2},
        {group: "B", value: a1},
        {group: "C", value: res},
        {group: "D", value: a3},
        {group: "E", value: a4},
        {group: "F", value: a5},
      ];
      $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-warning"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
      $("#t1").append('<div class="alert alert-warning"><p>TENHA ATENÇÃO!</p><h4>Esteja atento aos sinais!</h4><hr><h4>O abalo foi entre 5,5 e 6,0 graus na escala Richter e se encaixa no grupo C segundo o gráfico; Pode causar pequenos danos e prejudicar construções!</h4></div>');
    }if(res>6.0 && res < 7.0){
       data2 = [
        {group: "A", value: 2},
        {group: "B", value: a1},
        {group: "C", value: a2},
        {group: "D", value: res},
        {group: "E", value: a4},
        {group: "F", value: a5},
      ];
      $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-danger"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
      $("#t1").append('<div class="alert alert-danger"><p>MUITO CUIDADO!</p><h4>Você precisa procurar um lugar seguro!</h4><hr><h4>O abalo foi entre 6,1 e 6,9 graus na escala Richter e se encaixa no grupo D segundo o gráfico;Pode ser destrutivo em áreas em torno de até 100km do epicentro!</h4></div>');
    }if(res>7.0 && res < 8.0){
       data2 = [
        {group: "A", value: 2},
        {group: "B", value: a1},
        {group: "C", value: a2},
        {group: "D", value: a3},
        {group: "E", value: res},
        {group: "F", value: a5},
      ];
      $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-danger"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
      $("#t1").append('<div class="alert alert-danger"><p>MUITO CUIDADO!</p><h4>Você precisa procurar um lugar seguro!</h4><hr><h4>O abalo foi entre 7,0 e 7,9 graus na escala Richter e se encaixa no grupo E segundo o gráfico;Grande terremoto. Pode causar sérios danos numa grande faixa!</h4></div>');
    }if(res>7.9){
       data2 = [
        {group: "A", value: 2},
        {group: "B", value: a1},
        {group: "C", value: a2},
        {group: "D", value: a3},
        {group: "E", value: a4},
        {group: "F", value: res},
      ];
      $("#mychart2").append('<div id="grupo" class="col"><h1 id="t1" class="text-danger"id="resultado"> O cálculo do abalo na Escala Richter foi: '+res.toFixed(2)+'</h1></div>');
      $("#t1").append('<div class="alert alert-danger"><p>MUITO CUIDADO!</p><h4>Você precisa procurar um lugar seguro!</h4><hr><h4>O abalo foi maior que 8,0 graus na escala Richter e se encaixa no grupo F segundo o gráfico; Enorme Terremoto. Pode causar graves danos em muitas áreas mesmo que estejam a centenas de quilômetros!</h4></div>');
    }
    var data3 = [
     {group: "A", value: 0.0},
     {group: "B", value: 0.0},
     {group: "C", value: 0.0},
     {group: "D", value: 0.0},
     {group: "E", value: 0.0},
     {group: "F", value: 0.0},
   ];
    setTimeout(function(){
      update(data3);
    }, 1000);
    setTimeout(function(){
      update(data2);
    }, 3000);
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
    $("#mychart2").remove();
    $("#grupo").remove();
    $("#limpar").show();
    $("#enunciado").show();
    $("#calcular").show();
    $("#formDados").show();
    $("#mychart").hide();
    $("#voltar").hide();
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
