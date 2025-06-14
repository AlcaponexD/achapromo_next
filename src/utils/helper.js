export function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
export function formatarReal(numero) {
  if (isNaN(numero)) {
    return "";
  }
  const formato = {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  };
  return numero.toLocaleString("pt-BR", formato);
}
export function cleanNumber(input) {
  if (typeof input !== "string") {
    return "";
  }

  // Remove todos os caracteres não numéricos usando uma expressão regular
  return input.replace(/[^0-9]/g, "");
}
export function truncateTitle(title, maxLength = 50) {
  if (!title || title.length <= maxLength) {
    return title;
  }

  // Palavras menos importantes que podem ser removidas
  const stopWords = ['com', 'para', 'de', 'da', 'do', 'em', 'na', 'no', 'e', 'ou', 'a', 'o', 'as', 'os'];

  // Primeiro tenta remover palavras desnecessárias
  let words = title.split(' ');
  let filteredWords = words.filter(word =>
    !stopWords.includes(word.toLowerCase()) || words.indexOf(word) < 3 // Mantém as 3 primeiras palavras
  );

  let result = filteredWords.join(' ');

  // Se ainda estiver longo, corta mantendo palavras completas
  if (result.length > maxLength) {
    result = result.substring(0, maxLength);
    const lastSpace = result.lastIndexOf(' ');
    if (lastSpace > 0) {
      result = result.substring(0, lastSpace);
    }
  }

  return result;
}
export function translateDatePtBr(data) {
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const date = new Date(data);
  date.toLocaleString("pt-br");
  const arr_date = date.toTimeString().split(" ");
  const diaSemana = diasSemana[date.getDay()];
  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();

  return `${diaSemana}, ${dia} de ${mes} de ${ano} as ${arr_date[0]}`;
}
export function translateDateMonthYear(data) {

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const date = new Date(data);
  date.toLocaleString("pt-br");
  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const ano = date.getFullYear();


  return `${dia} de ${mes} de ${ano} `;
}