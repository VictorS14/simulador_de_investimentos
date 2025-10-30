export const taxs = {
  TESOURO_PREFIXADO: 12.69,
  TESOURO_SELIC: 14.25,
  TESOURO_IPCA: 7.58,
  LCI: 10.4,
  LCA: 14,
  CDB: 13.15,
};

export const getTaxRate = (months) => {
  const taxRates = [
    { limit: 6, rate: 0.225 },
    { limit: 12, rate: 0.2 },
    { limit: 24, rate: 0.175 },
    { limit: Infinity, rate: 0.15 },
  ];
  return taxRates.find(({ limit }) => months <= limit).rate;
};

export const getAssetRentability = (asset) =>
  ({
    "Tesouro Prefixado": taxs.TESOURO_PREFIXADO,
    "Tesouro IPCA+": taxs.TESOURO_IPCA,
    "Tesouro Selic": taxs.TESOURO_SELIC,
    "LCI e LCA": taxs.LCI,
    "CDB e LC": taxs.CDB,
  }[asset] || 0);