import { useState } from "react"
import bankLogo from "./assets/bank.svg"
import './App.css'
import { AssetOptions } from "./components/AssetOptions";
import { SimulationForm } from "./components/SimulationForm";
import { SimulationResults } from "./components/SimulationResults";


function App() {
  const [selectedAsset, setSelectedAsset] = useState('Tesouro Prefixado');
  const [showResults, setShowResults] = useState(false);
  const [simulationData, setSimulationData] = useState(null);

  const handleAssetChange = (asset) => {
    setSelectedAsset(asset)
    console.log(asset)
  }

  const handleSimulationComplete = (data) => {
    setSimulationData(data);
    setShowResults(true);
  }

  const handleResetSimulation = () => {
    setShowResults(false);
    setSimulationData(null);
  }


  return (
    <div className="w-full max-w-3xl flex flex-col gap-10">
      <header className="w-12 h-12 flex items-center justify-center"> 
        <img 
        className="w-full h-full"
        src={bankLogo} 
        alt="bank logo"/> 
      </header>
      <h2 className="text-blue-950 text-[min(5vw,36px)]">Simulador de Investimentos</h2>
      <div className="min-w-80 bg-gray-200 flex flex-col items-center px-5 py-6 rounded-sm gap-5">
        {!showResults && (
          <>
            <AssetOptions 
            selectedAsset={selectedAsset}
            onAssetChange={handleAssetChange}
            />

            <SimulationForm 
              selectedAsset={selectedAsset}
              onSimulationComplete={handleSimulationComplete}
            />
          </>
        )}

        {showResults && (
          <SimulationResults 
          data={simulationData}
          onReset={handleResetSimulation}
          />
        )}
      </div>
    </div>
  )
}

export default App
