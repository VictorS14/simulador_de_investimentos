import { formatCurrency, currencyToNumber, formatCurrencyToDisplay } from "./modulos/currencyUtils.js";
import { calculateMonthlySimulation, calculateYearSimulation, calculateTax } from "./modulos/simulation.js";
import { resetSimulationForm } from "./modulos/domHandlers.js";
import { taxs } from "./modulos/constants.js";
import { getAssetRentability } from "./modulos/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const assetBtn = document.querySelectorAll(".asset-option");
  const btnSimulate = document.getElementById("btnSimulate");
  const btnReset = document.getElementById("btnReset");
  const termInput = document.getElementById("term");
  
  const amountInput = document.getElementById("amountInvested");
  const monthlyInput = document.getElementById("monthlyInvestment");

  amountInput.addEventListener("input", () => formatCurrency(amountInput));
  monthlyInput.addEventListener("input", () => formatCurrency(monthlyInput));
  termInput.addEventListener("input", (e) => {
    // Remove tudo que não for número
    e.target.value = e.target.value.replace(/\D/g, "");
  });


  let selectedTermOption = "month";
  const optionTerm = document.getElementById("optionTerm");
  optionTerm.addEventListener("change", (e) => {
    selectedTermOption = e.target.value;
  });

  if (assetBtn) {
    assetBtn.forEach((button) => {
      button.addEventListener("click", () => {
        assetBtn.forEach((btn) => {
          btn.classList.remove("default");
        });
        button.classList.add("default");
      });
    });
  }

  function calculateInvestmentSimulation(e) {
    e.preventDefault();

    //criar e mostrar o overlay de loading
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = /* html */ `
      <div class="loading-spinner"></div>
      <p class="loading-text">Calculando sua simulação...</p>
    `;

    const amount = currencyToNumber(document.getElementById("amountInvested").value);
    const term = parseFloat(document.getElementById("term").value);
    
    if(isNaN(amount) || isNaN(term) || term === 0 || amount <= 0) {
       alert("Você precisa inserir o Valor e o Prazo para realizar a simulação");
      return
    }
    
    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
      const amount = currencyToNumber(document.getElementById("amountInvested").value);
      const monthlyInvestment = currencyToNumber(document.getElementById("monthlyInvestment").value);
      const term = parseFloat(document.getElementById("term").value);
      const rateInput = parseFloat(document.getElementById("rateInput").value);
      const selectedAsset = document.querySelector(".asset-option.default").textContent;
  
      if (isNaN(amount) || isNaN(term)) {
        alert("Você precisa inserir o Valor e o Prazo para realizar a simulação");
        return;
      }
  
      let finalAmount;
      let monthsToCalculate = term;
  
      if (selectedTermOption === "years") {
        monthsToCalculate = term * 12;
      }
  
      switch (selectedTermOption) {
        case "month":
          finalAmount = calculateMonthlySimulation(amount, monthlyInvestment, term, selectedAsset, rateInput);
          break;
        case "years":
          finalAmount = calculateYearSimulation(amount, monthlyInvestment, term, selectedAsset, rateInput);
          break;
        default:
          throw new Error("Opção de prazo inválida. Escolha entre 'meses' ou 'anos'.");
      }
  
      const totalInvested = amount + monthlyInvestment * monthsToCalculate;
      const earnings = finalAmount - totalInvested;
      const taxAmount = calculateTax(earnings, term, selectedAsset);
      const finalAmountAfterTax = earnings - taxAmount;
  
      const sectionResults = document.querySelector(".section-results");
      const sectionInvestmentOptions = document.querySelector(".section-investment-options");
      const sectionForm = document.querySelector(".section-form");
  
      sectionInvestmentOptions.style.display = "none";
      sectionForm.style.display = "none";
      sectionResults.style.display = "block";
  
      let rentability = rateInput > 0 ? rateInput : getAssetRentability(selectedAsset);
  
      sectionResults.innerHTML = /*html*/ `
      <h2>Seus parâmetros</h2>
        <div class="area-data">
          <div class="data-item">
            <h4>Tipo de investimento:</h4>
            <p class="asset">${selectedAsset}</p>
          </div>
          <div class="data-item">
            <h4>PRÉ ou PÓS fixado?</h4>
            <p class="asset">PRÉ</p>
          </div>
          <div class="data-item">
            <h4>Valor Investido:</h4>
            <p class="asset">${formatCurrencyToDisplay(amount)}</p>
          </div>
          <div class="data-item">
            <h4>Investimento mensal:</h4>
            <p class="asset">${formatCurrencyToDisplay(monthlyInvestment)}</p>
          </div>
          <div class="data-item">
            <h4>Prazo:</h4>
            <p class="asset">${term} ${selectedTermOption === "month" ? "meses" : "anos"}</p>
          </div>
          <div class="data-item">
            <h4>Rentabilidade:</h4>
            <p class="asset">${rentability.toFixed(2)}% ao ano</p>
          </div>
        </div>
  
        <div class="results-container">
          <h2>Resultado</h2>
          <div class="result-items-wrapper">
              <div class="result-item">
                  <h4>Valor Total Investido</h4>
                  <p id="totalInvested">${formatCurrencyToDisplay(totalInvested)}</p>
              </div>
              <div class="result-item">
                  <h4>Rendimento Total bruto</h4>
                  <p id="totalEarnings">${formatCurrencyToDisplay(earnings)}</p>
              </div>
              <div class="result-item">
                  <h4>Imposto de Renda à ser Pago</h4>
                  <p id="tax">${
                    selectedAsset === "LCI e LCA" ? "Isento de Imposto" : formatCurrencyToDisplay(taxAmount)
                  }</p>
              </div>
              <div class="result-item">
                  <h4>Montante final com Impostos</h4>
                  <p id="finalAmount">${formatCurrencyToDisplay(finalAmountAfterTax)}</p>
              </div>
          </div>
          <button id="btnResetSimulation" class="newSimulation">Refazer Simulação</button>
        </div>
      `;
      document.getElementById("btnResetSimulation").addEventListener("click", () => {
        sectionResults.style.display = "none";
        sectionInvestmentOptions.style.display = "flex";
        sectionForm.style.display = "block";
    
        resetSimulationForm();
    
        assetBtn.forEach((btn, index) => {
          if(index !== 0) return btn.classList.remove("default");
          btn.classList.add("default");
        });
      });
      
      document.body.removeChild(loadingOverlay);
    }, 1200) // Delay de 1.2 segundos
  }
  

  if (btnSimulate) {
    btnSimulate.addEventListener("click", calculateInvestmentSimulation);
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      resetSimulationForm();
    });
  }
});
