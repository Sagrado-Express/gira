import { useState } from "react";

const MATRIZ_CONSUMO = {
  caboclo: { branca: 0.3, verde: 0.5, verde_branca: 0.2 },
  preto_velho: { branca: 0.7, preta_branca: 0.3 },
  exu: { preta: 0.5, preta_vermelha: 0.3, branca: 0.2 },
  pombagira: { vermelha: 0.6, branca: 0.4 },
  ibejada: { rosa: 0.4, azul_claro: 0.3, azul_rosa: 0.2, branca: 0.1 },
  marinheiro: { azul_marinho: 0.4, azul_claro: 0.3, branca: 0.3 },
  baiano: { marrom: 0.5, branca: 0.3, verde: 0.2 },
  cigano: { vermelha: 0.4, dourada: 0.3, branca: 0.3 },
  cura: { branca: 0.7, verde: 0.3 },
  descarrego: { preta: 0.4, preta_branca: 0.4, branca: 0.2 },
  passe: { branca: 0.6, amarela: 0.4 },
  desenvolvimento: { branca: 1 }
};

export default function App() {
  const [giras, setGiras] = useState([]);
  const [novaGira, setNovaGira] = useState({ tipo: "caboclo", mediuns: 10, data: "" });

  const adicionarGira = () => {
    setGiras([...giras, novaGira]);
    setNovaGira({ tipo: "caboclo", mediuns: 10, data: "" });
  };

  const calcularConsumo = () => {
    const total = {};
    giras.forEach(gira => {
      const matriz = MATRIZ_CONSUMO[gira.tipo];
      if (!matriz) return;
      Object.entries(matriz).forEach(([cor, fator]) => {
        const quantidade = fator * parseInt(gira.mediuns);
        total[cor] = (total[cor] || 0) + quantidade;
      });
    });
    return total;
  };

  const consumo = calcularConsumo();

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calendário de Giras e Consumo de Velas</h1>

      <div className="flex flex-col gap-2 mb-4">
        <select value={novaGira.tipo} onChange={(e) => setNovaGira({ ...novaGira, tipo: e.target.value })} className="border p-2">
          {Object.keys(MATRIZ_CONSUMO).map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        <input type="number" min="1" value={novaGira.mediuns} onChange={(e) => setNovaGira({ ...novaGira, mediuns: e.target.value })} className="border p-2" placeholder="Nº médiuns" />
        <input type="date" value={novaGira.data} onChange={(e) => setNovaGira({ ...novaGira, data: e.target.value })} className="border p-2" />
        <button onClick={adicionarGira} className="bg-blue-600 text-white p-2 rounded">Adicionar Gira</button>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">Giras cadastradas</h2>
      <ul className="mb-4">
        {giras.map((g, i) => (
          <li key={i} className="border-b py-1">{g.data} – {g.tipo} – {g.mediuns} médiuns</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Consumo estimado de velas</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Cor</th>
            <th className="border p-2 text-right">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(consumo).map(([cor, qtd]) => (
            <tr key={cor}>
              <td className="border p-2 capitalize">{cor.replace("_", "/")}</td>
              <td className="border p-2 text-right">{qtd.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
