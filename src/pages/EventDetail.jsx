import Layout from "@/layouts/layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ticket } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import mockEvents from "../data/events";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function useAnimatedNumber(target, duration = 400) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    let start = value;
    let startTime = null;
    if (start === target) return;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.round(start + (target - start) * progress));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [target]);
  return value;
}

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => String(e.id) === String(id));
  const [quantities, setQuantities] = useState(() => {
    if (!event?.tickets) return {};
    const obj = {};
    event.tickets.forEach(t => { obj[t.id] = 0; });
    return obj;
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const confettiRef = useRef(null);

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white/90 rounded-2xl shadow-lg p-10 text-center">
            <h1 className="text-2xl font-bold text-violet-800 mb-4">Evento no encontrado</h1>
            <p className="text-gray-600">El evento que buscas no existe o fue eliminado.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleChange = (ticketId, delta) => {
    setQuantities(q => {
      const next = { ...q, [ticketId]: Math.max(0, (q[ticketId] || 0) + delta) };
      return next;
    });
  };

  const selectedTickets = event.tickets.filter(t => quantities[t.id] > 0);
  const total = selectedTickets.reduce((sum, t) => sum + t.price * quantities[t.id], 0);
  const animatedTotal = useAnimatedNumber(total);

  const handleBuy = () => {
    setShowSuccess(true);
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        zIndex: 9999,
      });
    }, 200);
  };

  const handleViewTickets = () => {
    // Si tienes la ruta, navega, si no, muestra un alert
    try {
      navigate("/my-tickets");
    } catch {
      alert("Funcionalidad próximamente disponible");
    }
  };

  return (
    <Layout>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${event.image || event.flyer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8 animate-fade-in-up">
          {/* Info principal */}
          <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-violet-700 drop-shadow mb-2 leading-tight">{event.name}</h1>
            <div className="flex flex-wrap gap-4 text-violet-700 items-center text-base font-medium">
              <span className="flex items-center gap-2"><Calendar size={20} /> {new Date(event.date).toLocaleString("es-UY", { dateStyle: "full", timeStyle: "short" })}</span>
              <span className="flex items-center gap-2"><MapPin size={20} /> {event.venue}, {event.city}</span>
            </div>
            {event.info && <p className="text-gray-700 mt-2 text-base">{event.info}</p>}
          </div>

          {/* Tickets y compra en bloque blanco */}
          <div className="bg-white/95 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 md:gap-6">
            {/* Selección de tickets */}
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="text-lg font-bold text-violet-700 mb-1">Entradas</h2>
              {event.tickets.map(ticket => (
                <div
                  key={ticket.id}
                  className={`
                    relative flex flex-col sm:flex-row items-start sm:items-center
                    bg-gradient-to-br from-violet-400 to-blue-700
                    rounded-2xl sm:rounded-[28px] shadow-lg
                    py-4 sm:py-6 px-4 sm:px-8 mb-2 group transition-all duration-200 hover:shadow-2xl w-full
                  `}
                  style={{
                    clipPath: window.innerWidth >= 640
                      ? "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))"
                      : undefined
                  }}
                >
                  {/* Columna: Tipo de ticket */}
                  <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                    <div className="font-extrabold text-base sm:text-md text-white flex items-center gap-2">
                      <Ticket size={24} className="opacity-90" />
                      {ticket.name}
                    </div>
                    <div className="text-white/90 text-xs sm:text-sm mt-1">{ticket.description}</div>
                  </div>
                  {/* Separador visual solo en desktop */}
                  <div className="sm:mx-6 mx-0 h-8 sm:h-20 border-l border-dotted border-white/40 hidden sm:block" />
                  {/* Columna: Valor */}
                  <div className="flex flex-row sm:flex-col items-center min-w-[70px] sm:min-w-[90px] mb-2 sm:mb-0 gap-2 sm:gap-0">
                    <span className="text-white text-xs sm:text-lg font-semibold sm:mb-1">Valor</span>
                    <span className="text-lg sm:text-2xl font-extrabold text-white">${ticket.price}</span>
                  </div>
                  {/* Columna: Cantidad */}
                  <div className="flex flex-row sm:flex-col items-center min-w-[90px] sm:min-w-[120px] ml-0 sm:ml-6 gap-2 sm:gap-0">
                    <span className="text-white text-xs sm:text-lg font-semibold sm:mb-1">Cantidad</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 text-violet-700 hover:bg-violet-200 hover:text-violet-900 shadow text-lg sm:text-xl font-bold transition-all"
                        aria-label="Restar"
                        onClick={() => handleChange(ticket.id, -1)}
                      >-</Button>
                      <span className="text-lg sm:text-xl font-bold w-6 text-center select-none text-white">{quantities[ticket.id]}</span>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 text-violet-700 hover:bg-violet-200 hover:text-violet-900 shadow text-lg sm:text-xl font-bold transition-all"
                        aria-label="Sumar"
                        onClick={() => handleChange(ticket.id, 1)}
                      >+</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen de compra */}
            <div className="flex-1 flex flex-col gap-4 bg-white/90 rounded-2xl shadow-xl p-6 min-h-[220px] justify-between">
              <h2 className="text-lg font-bold text-violet-700 mb-2">Resumen de compra</h2>
              {selectedTickets.length === 0 ? (
                <span className="text-gray-400 text-base">Selecciona tus entradas</span>
              ) : (
                <div className="flex flex-col gap-2">
                  {selectedTickets.map(t => (
                    <div key={t.id} className="flex items-center justify-between text-violet-800 font-medium animate-fade-in">
                      <span>{quantities[t.id]} x {t.name}</span>
                      <span>${t.price * quantities[t.id]}</span>
                    </div>
                  ))}
                  <div className="border-t border-violet-200 my-2" />
                  <div className="flex items-center justify-between text-lg font-bold text-violet-900 animate-fade-in">
                    <span>Total</span>
                    <span>${animatedTotal}</span>
                  </div>
                </div>
              )}
              <Button
                className="mt-4 w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg text-lg hover:from-violet-700 hover:to-pink-600 transition-all disabled:opacity-60"
                disabled={selectedTickets.length === 0}
                onClick={handleBuy}
              >
                Finalizar compra
              </Button>
            </div>
          </div>

          {/* Ubicación */}
          <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col gap-2 items-start">
            <h3 className="text-lg font-bold text-violet-700 mb-1">Ubicación</h3>
            <span className="flex items-center gap-2 text-violet-700"><MapPin size={18} /> {event.location?.address || "Dirección no disponible"}</span>
            {event.location?.mapUrl && <a href={event.location.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-1">Ver mapa</a>}
          </div>
        </div>

        {/* Modal de confirmación */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md w-full rounded-2xl p-0 overflow-hidden">
            <DialogHeader className="bg-gradient-to-r from-violet-600 to-pink-400 p-6">
              <DialogTitle className="text-white text-2xl font-bold">¡Compra exitosa!</DialogTitle>
              <DialogDescription className="text-white/90 mt-2">Tus tickets han sido reservados. ¡Prepárate para el evento!</DialogDescription>
            </DialogHeader>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-violet-700">{event.name}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1"><Calendar size={16} /> {new Date(event.date).toLocaleString("es-UY", { dateStyle: "full", timeStyle: "short" })}</span>
                <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={16} /> {event.venue}, {event.city}</span>
              </div>
              <div className="flex flex-col gap-2 bg-violet-50 rounded-lg p-3">
                {selectedTickets.map(t => (
                  <div key={t.id} className="flex items-center justify-between text-violet-800 font-medium">
                    <span>{quantities[t.id]} x {t.name}</span>
                    <span>${t.price * quantities[t.id]}</span>
                  </div>
                ))}
                <div className="border-t border-violet-200 my-2" />
                <div className="flex items-center justify-between text-lg font-bold text-violet-900">
                  <span>Total</span>
                  <span>${animatedTotal}</span>
                </div>
              </div>
              <DialogFooter className="mt-2 flex-col gap-2">
                <Button className="w-full" variant="outline" onClick={handleViewTickets}>Ver mis tickets</Button>
                <Button className="w-full" onClick={() => navigate("/")}>Volver al inicio</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.8s both; }
        .animate-fade-in { animation: fadeIn 0.5s both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Layout>
  );
} 