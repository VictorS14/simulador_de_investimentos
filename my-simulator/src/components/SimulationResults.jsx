import { formatCurrencyToDisplay } from "../utils/currencyUtils";

export const SimulationResults = ({ data, onReset }) => {
  const {
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
  } = data;

  return (
  <section className="w-full px-5 flex flex-col gap-5">
   <h2 className="text-blue-950 font-semibold text-[min(6vw,1.5rem)]">
      Seus parâmetros
   </h2>
   <div className="w-full flex flex-col gap-3 mb-9 md:grid md:grid-cols-2 md:gap-6">
      <div className="data-item">
         <h4 className="item-title">Tipo de investimento:</h4>
         <p className="asset">{selectedAsset}</p>
      </div>

      <div className="data-item">
         <h4 className="item-title">PRÉ ou PÓS fixado?</h4>
         <p className="asset">PRÉ</p>
      </div>

      <div className="data-item">
         <h4 className="item-title">Valor Investido:</h4>
         <p className="asset">{formatCurrencyToDisplay(amount)}</p>
      </div>

      <div className="data-item">
         <h4 className="item-title">Investimento mensal:</h4>
         <p className="asset">{formatCurrencyToDisplay(monthly)}</p>
      </div>

      <div className="data-item">
         <h4 className="item-title">Prazo:</h4>
         <p className="asset">{termValue} {termOption === "month" ? "meses" : "anos"}</p>
      </div>
        
      <div className="data-item">
         <h4 className="item-title">Rentabilidade:</h4>
         <p className="asset">{rentability.toFixed(2)}% ao ano</p>
      </div>
   </div>


   <div className="flex flex-col gap-3">
      <h2 className="text-blue-950 font-semibold text-[min(6vw,1.5rem)]">Resultado</h2>
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6">
         <div className="result-item">
            <h4 className="result-item-title">Valor Total Investido</h4>
            <p className="result-item-p text-blue-600" id="totalInvested">{formatCurrencyToDisplay(totalInvested)}</p>
         </div>
         <div className="result-item">
            <h4 className="result-item-title">Rendimento Total bruto</h4>
            <p className="result-item-p text-green-500" id="totalEarnings">{formatCurrencyToDisplay(earnings)}</p>
         </div>
          <div className="result-item">
            <h4 className="result-item-title">Imposto de Renda à ser Pago</h4>
            <p className="result-item-p text-red-500" id="tax">
              {selectedAsset === "LCI e LCA" ? "Isento de Imposto" : formatCurrencyToDisplay(taxAmount)}
            </p>
         </div>
         <div className="result-item">
            <h4 className="result-item-title">Montante final com Impostos</h4>
            <p className="result-item-p text-orange-600" id="finalAmount">{formatCurrencyToDisplay(finalAmountAfterTax)}</p>
         </div>
      </div>

      <button 
      className="w-[180px] h-9 rounded-lg border-none self-center bg-yellow-300 text-black text-[1rem] font-medium cursor-pointer transition-all duration-200 ease-in-out hover:bg-amber-500"
      id="btnResetSimulation" 
      onClick={onReset}>
         Refazer Simulação
      </button>
   </div>
  </section>
  )
};
