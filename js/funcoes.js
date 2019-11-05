$(document).ready(function (){
  console.log("Documento Carregado.");
  $("#GRID").hide();

  $("#verGrid").click(function(){
    $("#comeco").hide();
    $("#formCompetidor").hide();
    $("#posicao").hide();
    $("#resultado").hide();
    $("#pos").hide();
    $("#resu").hide();
    $("#GRID").show();

  });

  $("#salvaBotao").click(function(){
      var v1 = document.dados.nomeCompetidor;
      var v2 = document.dados.posicaoLargada;
      var v3 = document.dados.tempoComp;
      if(v1.value.length != 0 && v2.value.length != 0 && v3.value.length != 0){
        var competidor = new Object();
        competidor.nome = v1.value;
        competidor.posicao= v2.value;
        competidor.tempo= v3.value;
        var cols = "";
        var novaCol=$("<tr>");
        cols +='<td data-posicaolargada="'+competidor.posicao+'">'+competidor.posicao+'</td>';
        cols +='<td data-nomecompetidor="'+competidor.nome+'">'+competidor.nome+'</td>';
        cols +='<td data-tempocomp="'+competidor.tempo+'">'+competidor.tempo+'</td></tr>';
        novaCol.append(cols);
        $("tbody[name='tabela']").append(novaCol);
    }
  });

  $("#voltar").click(function(){
    $("#GRID").hide();
    $("#formCompetidor").show();
  });

  $("#verResultado").click(function(){
    var itens = [];
    $('table tbody tr').each(function(index, tr){
      var t = $(tr).find('td');
      var r = 0;
      var competidor = new Object();
      $(t).each(function(indexTD, td){
        if($(td).data('posicaolargada') != undefined){
          competidor.posicao= $(td).data('posicaolargada');
        }
        if($(td).data('nomecompetidor') != undefined){
          competidor.nome= $(td).data('nomecompetidor');
        }
        if($(td).data('tempocomp') != undefined){
          competidor.tempo= $(td).data('tempocomp');
        }
        if(r==2){
          itens.push(competidor);
          itens.sort(function(a,b){
            return a.tempo < b.tempo ? -1 : a.tempo > b.tempo? 1:0;
          });
        }
        r++;
      });
    });
    if(itens.length < 6){
      alert("O GRID deve conter 6 competidores ou mais!");
    }else{
      $("#formCompetidor").hide();
      $("#voltar").hide();
      $("#comeco").show();
      $("#GRID").show();
      $("#posicao").show();
      $("#resultado").show();
      $("#tab td").remove();
      var novaLinha="<tr>";
      var coluna="";
      var j = 1;
      for(var i = 0; i < itens.length; i++){
        coluna+=novaLinha;
        if(i==0 || i - 1 >= 0 && itens[0].tempo== itens[i].tempo){
          coluna +='<td id="pos">1</td>';
        }else{
          coluna += '<td id="pos">'+j+'</td>';
        }
        coluna+='<td data-posicaolargada="'+itens[i].posicao+'">'+itens[i].posicao+'</td>';
        coluna+='<td data-nomecompetidor="'+itens[i].nome+'">'+itens[i].nome+'</td>';
        coluna+='<td data-tempocomp="'+itens[i].tempo+'">'+itens[i].tempo+'</td>';
        if(i==0 || i - 1 >= 0 && itens[0].tempo== itens[i].tempo){
          coluna +='<td>Vencedor(a) !</td></tr>';
        }else{
          coluna += '<td>-</td></tr>';
        }
        //coluna += '<td>-</td></tr>';
        $("tbody[name='tabela']").append(coluna);
        coluna="";
        aux = 0;
        j++;
      }
    }
  });
});
