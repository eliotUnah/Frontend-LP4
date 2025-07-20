import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from 'chart.js';
import { useProgressOverview } from '../hooks/useProgressOverview';
import { Target, Flame, Activity, ChevronUp } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const Dashboard = () => {
  const { last30Days, percentage, maxStreak, loading, error } = useProgressOverview();

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-purple-500 h-4 w-4"></div>
          <div className="rounded-full bg-pink-500 h-4 w-4"></div>
          <div className="rounded-full bg-blue-500 h-4 w-4"></div>
        </div>
        <p className="text-purple-300 text-lg mt-4">Cargando dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center">
      <p className="text-red-400 text-lg bg-red-900/30 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">{error}</p>
    </div>
  );

  // Configuración mejorada para chart.js con gradientes
  const data = {
    labels: last30Days.map(item => item._id),
    datasets: [
      {
        label: 'Check-ins por día',
        data: last30Days.map(item => item.count),
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const {ctx: canvas, chartArea} = chart;
          if (!chartArea) return 'rgba(96, 165, 250, 0.8)';
          
          const gradient = canvas.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Progreso de los últimos 30 días',
        color: '#e5e7eb',
        font: { size: 24, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#a78bfa',
        bodyColor: '#ffffff',
        borderColor: '#8b5cf6',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          title: (context) => `Fecha: ${context[0].label}`,
          label: (context) => `Check-ins: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        ticks: { 
          color: '#9ca3af', 
          font: { size: 12 },
          maxRotation: 45
        },
        grid: { 
          display: false 
        },
        border: {
          color: '#374151'
        }
      },
      y: {
        ticks: { 
          color: '#9ca3af', 
          font: { size: 12 } 
        },
        grid: { 
          color: 'rgba(55, 65, 81, 0.3)',
          drawBorder: false
        },
        border: {
          display: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const KPICard = ({ title, value, suffix = '', icon: Icon, color, description }) => (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 group`}>
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center text-green-300">
            <ChevronUp className="w-4 h-4" />
            <span className="text-sm font-medium">Activo</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-white/80 text-sm font-medium">{title}</h3>
          <div className="flex items-end space-x-1">
            <span className="text-4xl font-extrabold text-white">{value}</span>
            <span className="text-lg text-white/80 pb-1">{suffix}</span>
          </div>
          {description && (
            <p className="text-white/60 text-xs">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dashboard de Progreso
            </h1>
            <p className="text-gray-400 text-lg">Monitoreo de rendimiento y cumplimiento</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <KPICard
            title="✅ Cumplimiento Global"
            value={percentage}
            suffix="%"
            icon={Target}
            color="from-green-500 to-emerald-600"
            description="Porcentaje total de cumplimiento"
          />
          
          <KPICard
            title="🔥 Racha Máxima"
            value={maxStreak}
            suffix=" días"
            icon={Flame}
            color="from-orange-500 to-red-600"
            description="Días consecutivos de progreso"
          />
        </div>

        {/* Gráfica */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 transform transition-all duration-500 hover:shadow-purple-500/10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Análisis de Actividad</h2>
            <p className="text-gray-400">Check-ins diarios de los últimos 30 días</p>
          </div>
          
          <div className="relative">
            {/* Glow effect behind chart */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg blur-xl"></div>
            
            <div className="relative bg-gray-900/50 rounded-lg p-4">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{last30Days.length}</div>
                <div className="text-sm text-gray-800">Días con Datos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {last30Days.reduce((acc, day) => acc + day.count, 0)}
                </div>
                <div className="text-sm text-gray-800">Total Check-ins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(last30Days.reduce((acc, day) => acc + day.count, 0) / last30Days.length) || 0}
                </div>
                <div className="text-sm text-gray-800">Promedio Diario</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;