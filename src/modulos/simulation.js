import { taxs } from "./constants.js";
 
export function calculateMonthlySimulation(amount, monthlyInvestment, term, selectedAsset, rateInput) {
    let rentability = rateInput > 0 ? rateInput : getRentability(selectedAsset)
    const monthlyRate = Math.pow(1 + rentability / 100, 1 / 12) - 1;
    let finalAmount = amount * Math.pow(1 + monthlyRate, term);

    if (monthlyInvestment && monthlyInvestment > 0) {
      const monthlyAmount = monthlyInvestment * ((Math.pow(1 + monthlyRate, term) - 1) / monthlyRate);
      finalAmount += monthlyAmount;
    }
    return finalAmount;
  }

 export function calculateYearSimulation(amount, monthlyInvestment, term, selectedAsset, rateInput) {
    let rentability = rateInput > 0 ? rateInput : getRentability(selectedAsset);
    const annualRate = rentability / 100;
    let finalAmount = amount * Math.pow(1 + annualRate, term);

    if (monthlyInvestment && monthlyInvestment > 0) {
      const monthlyAmount = monthlyInvestment * 12 * ((Math.pow(1 + annualRate, term) - 1) / annualRate);
      finalAmount += monthlyAmount;
    }
    return finalAmount;
  }


 export function calculateTax(earnings, months) {
    let taxRate;

    if (months <= 6) {
      taxRate = 0.225;
    } else if (months <= 12) {
      taxRate = 0.2;
    } else if (months <= 24) {
      taxRate = 0.175;
    } else {
      taxRate = 0.15;
    }

    return earnings * taxRate;
  }

  export function getRentability(asset) {
    switch(asset) {
        case "Tesouro Prefixado": return taxs.TESOURO_PREFIXADO;
        case "Tesouro IPCA+": return taxs.TESOURO_IPCA;
        case "Tesouro Selic": return taxs.TESOURO_SELIC;
        case "LCI e LCA": return taxs.LCI;
        case "CDB e LC": return taxs.CDB;
        default: return 0;
    }
  }