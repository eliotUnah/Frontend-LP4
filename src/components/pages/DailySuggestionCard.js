// src/components/DailySuggestionCard.jsx
import { useDailySuggestion } from "../hooks/useDailySuggestion";


const levelColors = {
  1: "bg-green-100 text-green-800",
  2: "bg-yellow-100 text-yellow-800",
  3: "bg-red-100 text-red-800",
};

export default function DailySuggestionCard() {
  const { suggestion, loading, error } = useDailySuggestion();

  if (loading) return <p>Cargando sugerencia...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!suggestion) return <p>No hay sugerencia disponible.</p>;

  const level = suggestion.level ?? 1;
  const levelClass = levelColors[level] || levelColors[1];

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      {/* Etiqueta de nivel */}
      <span className={`text-xs font-semibold inline-block px-2 py-1 rounded-full ${levelClass}`}>
        Nivel {level}
      </span>

      {/* Título del hábito */}
      <h2 className="mt-3 text-xl font-bold text-gray-900">{suggestion.title}</h2>

      {/* Razón */}
      <p className="mt-2 text-gray-700 text-sm">{suggestion.reason}</p>

      {/* Mensaje si es mock */}
      {suggestion.note && (
        <p className="mt-3 text-yellow-600 text-sm italic">
          ⚠️ {suggestion.note}
        </p>
      )}
    </div>
  );
}
