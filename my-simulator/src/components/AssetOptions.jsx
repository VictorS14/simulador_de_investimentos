export const AssetOptions = ({ selectedAsset, onAssetChange }) => {
   const assetOptions = [
      'Tesouro Prefixado',
      'Tesouro IPCA+',
      'Tesouro Selic',
      'LCI e LCA',
      'CDB e LC'
   ]

   const handleAssetClick = (asset) => {
      onAssetChange(asset)
   }


  return (
   <section className="w-full flex flex-col items-center gap-3.5 md:items-start">
      <h1 className="text-blue-950 self-start">Opções de Ativo</h1>
      <div className="w-full flex flex-col items-center gap-3.5 md:w-full md:flex md:flex-row md:gap-3">
         {assetOptions.map((asset) => (

            <button 
               key={asset}
               className={`w-full h-10 text-center text-blue-900 text-[min(4vw,16px)] font-semibold bg-green-400 border-none rounded-xl cursor-pointer transition-all duration-200 ease-in-out md:flex-1 md:text-sm md:hover:bg-blue-500 md:text-white ${asset === selectedAsset ? "bg-blue-500 text-white" : ""}`}
               onClick={() => handleAssetClick(asset)}
            >
               {asset}
            </button>
         ))}
      </div>
   </section>
)
}
