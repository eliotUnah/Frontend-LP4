import React, { useState } from 'react';
import useSearchHabits from '../hooks/searchHabits.js';
import '../styles/SearchHabito.css';


const SearchHabitsPage = () => {

 const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState('');

  const { habits, loading, error, searchHabits } = useSearchHabits();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchHabits({ search, category, frequency });
  };

  const resetForm = () => {
    setSearch('');
    setCategory('');
    setFrequency('');
  };

  return (
    <div className="search-page">
      <h1 className="search-page__title">🔎 Buscar tus Hábitos</h1>

      <form onSubmit={handleSubmit} className="search-page__form">
        <div className="search-page__filters">
          <input
            type="text"
            placeholder="🔍 Ej: Leer, correr..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-page__input"
          />

          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="search-page__select"
          >
            <option value="">Todas las frecuencias</option>
            <option value="Diario">Diario</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="search-page__select"
          >
            <option value="">Todas las categorías</option>
            <option value="Salud">Salud</option>
            <option value="Productividad">Productividad</option>
            <option value="Bienestar">Bienestar</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="search-page__actions">
          <button type="submit" disabled={loading} className="search-page__button search-page__button--submit">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
          <button type="button" onClick={resetForm} className="search-page__button search-page__button--reset">
            Limpiar
          </button>
        </div>
      </form>

      {error && <p className="search-page__error">{error}</p>}

      {loading && <p className="search-page__loading">Cargando resultados...</p>}

      {habits.length > 0 && (
        <ul className="search-page__results">
          {habits.map((habit) => (
            <li key={habit._id} className="search-page__item">
              <strong className="search-page__item-title">{habit.title}</strong>
              <span className="search-page__item-meta">
                {habit.category} ({habit.frequency})
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && habits.length === 0 && !error && (
        <p className="search-page__empty">No se encontraron hábitos. Prueba otros filtros 🧪</p>
      )}
    </div>
  );
};

export default SearchHabitsPage;