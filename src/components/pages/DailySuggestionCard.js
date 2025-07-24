// src/components/DailySuggestionCard.jsx
import { useDailySuggestion } from "../hooks/useDailySuggestion";
import { useNavigate } from "react-router-dom"; 

const levelColors = {
  1: "bg-gradient-to-r from-yellow-400 to-yellow-200 text-white",
  2: "bg-gradient-to-r from-orange-400 to-yellow-300 text-white",
  3: "bg-gradient-to-r from-red-500 to-red-300 text-white",
};

export default function DailySuggestionCard() {
  const { suggestion, loading, error } = useDailySuggestion();
  const navigate = useNavigate(); 

  if (loading) return <p>Cargando sugerencia...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!suggestion) return <p>No hay sugerencia disponible.</p>;

  const level = suggestion.level ?? 1;
  const levelClass = levelColors[level] || levelColors[1];

  return (
    <div className="relative max-w-sm w-full rounded-3xl p-6 bg-white border border-gray-200 shadow-xl overflow-hidden">
      {/* Nivel */}
      <span
        className={`inline-flex items-center gap-2 text-xs uppercase font-semibold px-3 py-1.5 rounded-full shadow-inner backdrop-blur-sm border border-white/20 ${levelClass}`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-md" />
        Nivel {level}
      </span>

      {/* Título */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        {suggestion.title}
      </h2>

      {/* Descripción */}
      <p className="mt-3 text-gray-600 text-sm leading-snug">
        {suggestion.reason}
      </p>

      {/* Nota */}
      {suggestion.note && (
        <p className="mt-3 text-yellow-600 italic text-xs">
          ⚠️ {suggestion.note}
        </p>
      )}

      {/* Botón de navegación */}
      <button
        onClick={() => navigate("/historial-sugerencias")} 
        className="mt-5 relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-pink-300 transition-all text-sm"
      >
        Ver historial de sugerencias
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
  );
}