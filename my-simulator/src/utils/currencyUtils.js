export function formatCurrency(input) {
  let value = input.replace(/\D/g, "");

  if (!value) {
    return "";
  }

  if (value.length === 1) value = "00" + value;
  if (value.length === 2) value = "0" + value;

  value = value.replace(/^0+/, "");
  if (value.length <= 2) value = "0" + value;

  const numValue = Number(value) / 100;
  const formattedValue = numValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `R$ ${formattedValue}`;
}

export function currencyToNumber(value) {
  if (!value) return 0;
  return Number(value.replace(/\D/g, "")) / 100;
}

export function formatCurrencyToDisplay(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}