import { useState } from "react";
import SideBarLayout from "@/layouts/SideBarLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Edit, Ticket, Users, FileText, Copy, RefreshCw, ShoppingCart, QrCode, BarChart2, ImageIcon, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

// Filtros de estado
const FILTERS = [
  { key: "pending", label: "Pendientes", color: "bg-yellow-100 text-yellow-800" },
  { key: "published", label: "Publicados", color: "bg-blue-100 text-blue-800" },
  { key: "finished", label: "Finalizados", color: "bg-gray-100 text-gray-800" },
  { key: "deleted", label: "Borrados", color: "bg-red-100 text-red-800" },
  { key: "paid", label: "Pagos", color: "bg-green-100 text-green-800" },
  { key: "all", label: "Todos", color: "bg-violet-100 text-violet-800" },
];

// Mock de eventos con diferentes estados
const EVENTS = [
  {
    id: 1,
    name: "EXIT EDICION ANIVERSARIO",
    date: "2024-07-04T23:00:00",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    status: ["publicado", "publico"],
    filter: "published",
    stats: {
      vendidos: 111,
      devueltos: 0,
      usados: 0,
      efectivo: 30800,
      tarjeta: 39200,
      total: 70000,
    },
    venue: "Sala Exit",
    city: "Montevideo",
  },
  {
    id: 2,
    name: "FIESTA ELECTRÓNICA 2024",
    date: "2024-08-10T22:00:00",
    banner: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    status: ["pendiente"],
    filter: "pending",
    stats: {
      vendidos: 80,
      devueltos: 2,
      usados: 0,
      efectivo: 15000,
      tarjeta: 12000,
      total: 27000,
    },
    venue: "Club Nocturno",
    city: "Canelones",
  },
  {
    id: 3,
    name: "CONFERENCIA DE TECNOLOGÍA",
    date: "2024-09-15T09:00:00",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    status: ["finalizado"],
    filter: "finished",
    stats: {
      vendidos: 200,
      devueltos: 5,
      usados: 195,
      efectivo: 50000,
      tarjeta: 30000,
      total: 80000,
    },
    venue: "Centro de Convenciones",
    city: "Maldonado",
  },
  // ...más eventos
];

function EventCard({ event }) {
  return (
    <div className="bg-white/95 rounded-3xl shadow-2xl flex flex-col group hover:shadow-3xl transition-all border border-violet-100 p-0 animate-fade-in-up w-full max-w-4xl mx-auto my-8" style={{ minHeight: 370 }}>
      <div className="relative h-56 bg-gray-200 rounded-t-3xl overflow-hidden">
        <img
          src={event.banner}
          alt={event.name}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {event.status.map((s, i) => (
            <Badge key={i} className="bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md uppercase tracking-wide text-xs px-3 py-1 rounded-full">
              {s}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-violet-700 mb-3 leading-tight break-words line-clamp-2" style={{ minHeight: 56 }}>{event.name}</h2>
          <div className="flex items-center gap-2 text-lg text-violet-500 mb-1">
            <Ticket size={20} className="text-violet-400" />
            {new Date(event.date).toLocaleString("es-UY", { dateStyle: "medium", timeStyle: "short" })}
          </div>
          <div className="flex items-center gap-2 text-lg text-blue-500 mb-4">
            <ImageIcon size={20} className="text-blue-400" />
            {event.venue} - {event.city}
          </div>
        </div>
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-violet-700">{event.stats.vendidos}</span>
            <span className="text-sm text-gray-500">Vendidos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">${event.stats.efectivo.toLocaleString()}</span>
            <span className="text-sm text-gray-500">Efectivo</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">${event.stats.tarjeta.toLocaleString()}</span>
            <span className="text-sm text-gray-500">Tarjeta</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-2 text-violet-600 lg:flex-nowrap">
          <ActionIcon icon={Edit} label="Editar" />
          <ActionIcon icon={ShoppingCart} label="Compra Directa" />
          <ActionIcon icon={Ticket} label="Tickets" />
          <ActionIcon icon={Users} label="RRPPs" />
          <ActionIcon icon={FileText} label="Reportes" />
          <ActionIcon icon={QrCode} label="Etickets" />
          <ActionIcon icon={Copy} label="Clonar" />
          <ActionIcon icon={RefreshCw} label="Canje" />
          <ActionIcon icon={BarChart2} label="Live" />
          <ActionIcon icon={Trash2} label="Borrar" />
        </div>
      </div>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 text-violet-600 hover:text-violet-900 transition-colors group"
      title={label}
    >
      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <span className="text-base font-medium leading-none">{label}</span>
    </button>
  );
}

export default function AdminEvents() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Filtros funcionales
  const filteredEvents = activeFilter === "all"
    ? EVENTS
    : EVENTS.filter(e => e.filter === activeFilter);
  const eventsPerPage = 4;
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);

  return (
    <SideBarLayout>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 w-full">
        <PageHeader
          title="Mis Eventos"
          subtitle="Administra y edita tus eventos publicados, finalizados o pendientes desde aquí."
        />

        {/* Filtros */}
        <section className="w-full flex justify-center mt-[-32px] z-10 relative animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex gap-2 sm:gap-4 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`px-4 py-1 rounded-full font-medium border transition-all duration-200 focus:outline-none ${f.color} ${activeFilter === f.key ? 'ring-2 ring-violet-400 scale-105' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => { setActiveFilter(f.key); setPage(1); }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Grilla de eventos en columna, cards anchas y centradas */}
        <section className="w-full max-w-4xl mx-auto px-2 sm:px-4 mt-12">
          {paginatedEvents.length === 0 ? (
            <div className="flex-1 text-center text-gray-400 py-16">No hay eventos para mostrar.</div>
          ) : (
            paginatedEvents.map(event => <EventCard key={event.id} event={event} />)
          )}
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full border text-sm font-semibold mx-1 ${page === i + 1 ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-violet-100'}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </section>

        {/* Ocultar scrollbar en desktop */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .animate-fade-in { animation: fadeIn 0.8s both; }
          .animate-fade-in-up { animation: fadeInUp 0.8s both; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    </SideBarLayout>
  );
} 