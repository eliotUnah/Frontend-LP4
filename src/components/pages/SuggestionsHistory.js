// src/components/SuggestionsHistory.jsx
import { useSuggestionsHistory } from "../hooks/useSuggestionsHistory";
import { useState } from "react";
import api from "../../utils/axiosConfig";

export default function SuggestionsHistory() {
  const { suggestions, loading, error, refresh } = useSuggestionsHistory();
  const [filter, setFilter] = useState("all"); // all | favorites

  const toggleFavorite = async (id) => {
    await api.patch(`/ai/favorite/${id}`);
    refresh();
  };

  const convertToHabit = async (id) => {
    try {
      await api.post(`/ai/convert/${id}`);
      alert("✅ Hábito creado con éxito.");
    } catch {
      alert("❌ Error al convertir en hábito.");
    }
  };

  const filtered = suggestions.filter(s =>
    filter === "favorites" ? s.isFavorite : true
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Sugerencias</h1>

      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "favorites" ? "bg-yellow-400 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("favorites")}
        >
          Favoritas ⭐
        </button>
      </div>

      {loading && <p>Cargando historial...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {filtered.length === 0 && !loading && (
        <p className="text-gray-600 italic">Sin sugerencias registradas.</p>
      )}

      <ul className="space-y-4">
        {filtered.map((sug) => (
          <li
            key={sug._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{sug.suggestion}</h3>
                <p className="text-gray-600 text-sm">{sug.reason}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(sug.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleFavorite(sug._id)} title="Marcar como favorita">
                  {sug.isFavorite ? "⭐" : "☆"}
                </button>
                <button
                  className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => convertToHabit(sug._id)}
                >
                  Convertir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
