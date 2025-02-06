export default function Home() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">
        Prevenção de Acidentes
      </h1>
      <p className="mt-4 text-lg">
        Acidentes de trânsito são um dos principais problemas de segurança
        pública. Nosso modelo de IA ajuda a prever a gravidade de acidentes com
        base em dados históricos.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Sobre o Modelo</h2>
      <p className="mt-2">
        O modelo de predição foi treinado com milhares de registros e usa
        **XGBoost** para prever a gravidade do acidente.
      </p>
      <h2 className="text-2xl font-semibold mt-6">Autor</h2>
      <p className="mt-2">
        Nome: <strong>Rayron Ferreira</strong>
      </p>
      <p>
        Github: <strong>rrodffer</strong>
      </p>
    </div>
  );
}
