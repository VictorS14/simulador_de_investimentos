import { getTaxRate, getAssetRentability } from "./constants";

// calcula a taxa efetiva com base na rentabilidade anual
const calculateRate = (rentability, isMonthly) =>
  isMonthly ? Math.pow(1 + rentability / 100, 1 / 12) - 1 : rentability / 100;

// calcula o montante final do investimento inicial
const calculateBaseAmount = (amount, rate, term) => amount * Math.pow(1 + rate, term);

// calcula o montante final dos aportes mensais/anuais
const calculateInvestmentAmount = (monthlyInvestment, rate, term, isMonthly) =>
  monthlyInvestment * (isMonthly ? 1 : 12) * ((Math.pow(1 + rate, term) - 1) / rate);

export const calculateMonthlySimulation = (amount, monthlyInvestment, term, selectedAsset, rateInput) => {
  const rentability = rateInput > 0 ? rateInput : getAssetRentability(selectedAsset);
  const monthlyRate = calculateRate(rentability, true);
  const baseAmount = calculateBaseAmount(amount, monthlyRate, term);
  const investmentAmount =
    monthlyInvestment > 0 ? calculateInvestmentAmount(monthlyInvestment, monthlyRate, term, true) : 0;

  return baseAmount + investmentAmount;
};

export const calculateYearSimulation = (amount, monthlyInvestment, term, selectedAsset, rateInput) => {
  const rentability = rateInput > 0 ? rateInput : getAssetRentability(selectedAsset);
  const annualRate = calculateRate(rentability, false);
  const baseAmount = calculateBaseAmount(amount, annualRate, term);
  const investmentAmount =
    monthlyInvestment > 0 ? calculateInvestmentAmount(monthlyInvestment, annualRate, term, false) : 0;

  return baseAmount + investmentAmount;
};

export const calculateTax = (earnings, months, selectedAsset) => {
  if (selectedAsset === "LCI e LCA") {
    return 0;
  }

  return earnings * getTaxRate(months);
};