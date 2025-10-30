import { useState } from "react"
import bankLogo from "./assets/bank.svg"
import './App.css'
import { AssetOptions } from "./components/AssetOptions";


function App() {
  const [selectedAsset, setSelectedAsset] = useState('Tesouro Prefixado');
  const [showResults, setShowResults] = useState(false);

  const handleAssetChange = (asset) => {
    setSelectedAsset(asset)
  }


  return (
    <div className="border w-full max-w-3xl flex flex-col gap-10">
      <header className="w-12 h-12 flex items-center justify-center"> 
        <img 
        className="w-full h-full"
        src={bankLogo} 
        alt="bank logo"/> 
      </header>
      <h2 className="text-blue-950 text-[min(5vw,36px)]">Simulador de Investimentos</h2>
      <div className="bg-gray-100 flex flex-col items-center px-5 py-6 rounded-sm gap-5">
        {!showResults && (
          <>
            <AssetOptions 
            selectedAsset={selectedAsset}
            onAssetChange={handleAssetChange}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
