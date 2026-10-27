// Os preços abaixo devem ser iguais aos exibidos em index.html
const produtos = [
  { nome: "Dragão de 8 Bits", preco: 79.90 },
  { nome: "Console Bolso Retrô", preco: 249.90 },
  { nome: "Controle Sem Fio", preco: 59.90 },
  { nome: "Kit de Limpeza", preco: 24.90 }
];

const VALOR_MINIMO_DESCONTO = 200;
const PERCENTUAL_DESCONTO = 0.10;

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Retorna a quantidade (inteiro >= 0) ou null se o usuário cancelar
function perguntarQuantidade(produto) {
  while (true) {
    const resposta = prompt(
      "Quantas unidades de \"" + produto.nome + "\" (" + formatarMoeda(produto.preco) + ")?\n" +
      "Digite 0 para não comprar.",
      "0"
    );

    if (resposta === null) {
      return null;
    }

    const quantidade = Number(resposta);
    if (resposta.trim() !== "" && Number.isInteger(quantidade) && quantidade >= 0) {
      return quantidade;
    }

    alert("Quantidade inválida. Digite um número inteiro igual ou maior que 0.");
  }
}

function simularCompra() {
  let total = 0;
  let resumo = "";

  for (const produto of produtos) {
    const quantidade = perguntarQuantidade(produto);

    if (quantidade === null) {
      alert("Simulação cancelada.");
      return;
    }

    if (quantidade > 0) {
      const subtotal = produto.preco * quantidade;
      total += subtotal;
      resumo += produto.nome + ": " + quantidade + " x " + formatarMoeda(produto.preco) +
        " = " + formatarMoeda(subtotal) + "\n";
    }
  }

  total = Math.round(total * 100) / 100;

  if (total === 0) {
    alert("Nenhum produto foi selecionado.");
    return;
  }

  let mensagem = "RESUMO DA COMPRA\n\n" + resumo + "\nSubtotal: " + formatarMoeda(total) + "\n";

  if (total >= VALOR_MINIMO_DESCONTO) {
    const desconto = Math.round(total * PERCENTUAL_DESCONTO * 100) / 100;
    mensagem += "Desconto de 10%: -" + formatarMoeda(desconto) + "\n";
    mensagem += "TOTAL A PAGAR: " + formatarMoeda(total - desconto);
  } else {
    mensagem += "Sem desconto (a partir de " + formatarMoeda(VALOR_MINIMO_DESCONTO) + " você ganha 10%).\n";
    mensagem += "TOTAL A PAGAR: " + formatarMoeda(total);
  }

  alert(mensagem);
}
