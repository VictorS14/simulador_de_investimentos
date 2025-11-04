import { useState, useEffect } from "react";

import { formatCurrency, currencyToNumber } from "../utils/currencyUtils";
import { calculateMonthlySimulation, calculateYearSimulation, calculateTax } from "../utils/simulation";
import { getAssetRentability } from "../utils/constants";

export const SimulationForm = ({ selectedAsset, onSimulationComplete }) => {
  const [amountInvested, setAmountInvested] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [term, setTerm] = useState("");
  const [rateInput, setRateInput] = useState("");
  const [termOption, setTermOption] = useState("month");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setAmountInvested(formattedValue);
  };

  const handleMonthlyInvestmentChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setMonthlyInvestment(formattedValue);
  };

  const handleTermChange = (e) => {
    // Remove tudo que não for número
    const value = e.target.value.replace(/\D/g, "");
    setTerm(value);
  };

  const handleRateInputChange = (e) => {
    setRateInput(e.target.value);
  };

  const handleTermOptionChange = (e) => {
    setTermOption(e.target.value);
  };

  const resetForm = () => {
    setAmountInvested("");
    setMonthlyInvestment("");
    setTerm("");
    setRateInput("");
    setTermOption("month");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = currencyToNumber(amountInvested);
    const monthly = currencyToNumber(monthlyInvestment);
    const termValue = parseFloat(term);
    const rateValue = parseFloat(rateInput) || 0;

    if (isNaN(amount) || isNaN(termValue) || termValue === 0 || amount <= 0) {
      alert("Você precisa inserir o Valor e o Prazo para realizar a simulação");
      return;
    }

    setLoading(true);

    // Simula um delay para mostrar o loading
    setTimeout(() => {
      let finalAmount;
      let monthsToCalculate = termValue;

      if (termOption === "years") {
        monthsToCalculate = termValue * 12;
      }

      switch (termOption) {
        case "month":
          finalAmount = calculateMonthlySimulation(amount, monthly, termValue, selectedAsset, rateValue);
          break;
        case "years":
          finalAmount = calculateYearSimulation(amount, monthly, termValue, selectedAsset, rateValue);
          break;
        default:
          throw new Error("Opção de prazo inválida. Escolha entre 'meses' ou 'anos'.");
      }

      const totalInvested = amount + monthly * monthsToCalculate;
      const earnings = finalAmount - totalInvested;
      const taxAmount = calculateTax(earnings, termValue, selectedAsset);
      const finalAmountAfterTax = earnings - taxAmount;

      const rentability = rateValue > 0 ? rateValue : getAssetRentability(selectedAsset);

      const simulationData = {
        selectedAsset,
        amount,
        monthly,
        termValue,
        termOption,
        rentability,
        totalInvested,
        earnings,
        taxAmount,
        finalAmountAfterTax,
      };

      onSimulationComplete(simulationData);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="w-full flex flex-col items-center gap-5">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="form-group">
          <label className="text-blue-900 text-[1rem]" htmlFor="amountInvested">
            Valor à ser aplicado:
            <small className="text-red-400">*Obrigatório*</small>
          </label>
          <input
            className="bg-white w-full h-9 flex text-right items-center px-3 border-none rounded-sm text-gray-500"
            type="text"
            id="amountInvested"
            name="amountInvested"
            placeholder="R$ 0,00"
            value={amountInvested}
            onChange={handleAmountChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyInvestment">Investimento mensal (opcional):</label>
          <input
            className="bg-white w-full h-9 flex text-right items-center px-3 border-none rounded-sm text-gray-500"
            type="text"
            id="monthlyInvestment"
            name="monthlyInvestment"
            placeholder="R$ 0,00"
            value={monthlyInvestment}
            onChange={handleMonthlyInvestmentChange}
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="max-w-[235px] md:w-[200px] flex flex-col gap-2">
            <label className="text-blue-900 text-[1rem]" htmlFor="term">
              Prazo:
              <small className="text-red-400">*Obrigatório*</small>
            </label>
            <input
              className="w-full h-9 flex text-left bg-white pl-2"
              type="number"
              id="term"
              name="term"
              value={term}
              onChange={handleTermChange}
            />
          </div>

          <select
            className="bg-white max-w-[235px] h-9 px-8 border-none rounded-lg text-blue-900 md:w-[200px] text-center text-[1rem]"
            name="termOption"
            id="optionTerm"
            value={termOption}
            onChange={handleTermOptionChange}
          >
            <option value="month">Meses</option>
            <option value="years">Anos</option>
          </select>

          <div className="flex flex-col gap-3 md:flex-row-reverse md:items-center">
            <label className="md:text-[11px]" htmlFor="rateInput">
              Selecione a Taxa de rentabilidade (%):
              <br />
              <small style={{ color: "blue" }}>
                OBS: (Apenas se não quiser a Taxa prefixada do Ativo selecionado ou se quiser insirir uma Taxa
                atualizada)
              </small>
            </label>
            <input
              className="w-[140px] h-9 md:self-end bg-white pl-2"
              type="number"
              step="0.01"
              id="rateInput"
              name="rateInput"
              placeholder="%"
              value={rateInput}
              onChange={handleRateInputChange}
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button
            className="w-[100px] h-9 text-white font-medium border-none rounded-sm bg-blue-500 transition-all duration-200 ease-in-out cursor-pointer hover:bg-blue-700"
            type="submit"
            id="btnSimulate"
          >
            Simular
          </button>
          <button
            className="w-[100px] h-9 text-white font-medium border-none rounded-sm bg-red-500 transition-all duration-200 ease-in-out cursor-pointer hover:bg-red-700"
            type="button"
            id="btnReset"
            onClick={resetForm}
          >
            Reiniciar
          </button>
        </div>
      </form>

      <p className="w-full leading-normal text-blue-900 mt-5 mb-5">
        Esta aplicação é um simulador de investimentos que permite calcular o retorno de diferentes tipos de
        ativos financeiros. Você pode simular investimentos em Tesouro Direto (Prefixado, IPCA+ e Selic), LCI,
        LCA e CDBs. Insira o valor inicial, aportes mensais, prazo e taxa de rentabilidade para ver projeções
        de rendimento e impostos.
      </p>

      <div className="w-full mt-5">
        <h4>Tabela de Ativos e Taxas Prefixadas</h4>
        <table className="w-full border-collapse mt-5 mb-5 bg-white">
          <tbody>
            <tr>
              <td className="td-style">Tesouro Prefixado</td>
              <td>12.69%</td>
            </tr>
            <tr>
              <td>Tesouro IPCA+</td>
              <td>7.58%</td>
            </tr>
            <tr>
              <td>Tesouro Selic</td>
              <td>14.25%</td>
            </tr>
            <tr>
              <td>LCI e LCA</td>
              <td>10.4%</td>
            </tr>
            <tr>
              <td>CBD</td>
              <td>13.15%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">Calculando sua simulação...</p>
        </div>
      )}
    </section>
  );
};
