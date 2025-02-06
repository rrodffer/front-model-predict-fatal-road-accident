import { useState, useEffect } from "react";
import axios from "axios";

export default function Predicao() {
  const [dados, setDados] = useState({
    causa_acidente: "",
    tipo_acidente: "",
    marca_veiculo: "",
    modelo_veiculo: "",
    ano_fabricacao_veiculo: "",
  });

  const [mapeamento, setMapeamento] = useState({});
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    // Requisição para obter os mapeamentos das categorias
    axios
      .get("http://127.0.0.1:8000/mapeamento/")
      .then((res) => setMapeamento(res.data))
      .catch((err) => console.error("Erro ao buscar mapeamento:", err));
  }, []);

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    return Object.values(dados).every(
      (valor) => valor.toString().trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      const resposta = await axios.post("http://127.0.0.1:8000/prever/", dados);
      setResultado({
        entrada: dados,
        classificacao: resposta.data.classificacao_acidente,
      });
    } catch (erro) {
      setErro("Erro ao requisitar previsão. Tente novamente.");
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">Fazer Predição</h1>
      <p className="mt-4">
        Preencha os campos abaixo para prever a gravidade do acidente.
      </p>

      {erro && <p className="text-red-500 font-semibold mt-4">{erro}</p>}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {Object.keys(dados).map((campo) => (
          <div key={campo}>
            <label className="block text-sm font-semibold">
              {campo.replace("_", " ")}
            </label>
            {mapeamento[campo] ? (
              // Se o campo tem um mapeamento, exibe um SELECT
              <select
                name={campo}
                value={dados[campo]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Selecione uma opção</option>
                {Object.entries(mapeamento[campo]).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              // Se não for um campo categórico, usa INPUT normal
              <input
                type="text"
                name={campo}
                value={dados[campo]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={!validarFormulario() || carregando}
          className={`w-full p-3 text-white font-bold rounded ${
            validarFormulario()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {carregando ? "Enviando..." : "Fazer Predição"}
        </button>
      </form>

      {/* Exibir Resultado */}
      {resultado && (
        <div className="mt-6 p-6 bg-gray-200 rounded shadow">
          <h2 className="text-xl font-bold">Resultado da Predição</h2>
          <p className="mt-2">
            <strong>Classificação:</strong>{" "}
            {resultado.classificacao === 1
              ? "Acidente Fatal"
              : "Sem vítimas fatais"}
          </p>

          <h3 className="mt-4 text-lg font-semibold">Parâmetros Enviados:</h3>
          <ul className="mt-2 space-y-2">
            {Object.entries(resultado.entrada).map(([chave, valor]) => (
              <li key={chave} className="text-sm bg-white p-2 rounded shadow">
                {chave}: <strong>{valor}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
