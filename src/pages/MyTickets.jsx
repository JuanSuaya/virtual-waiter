import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SideBarLayout from "@/layouts/SideBarLayout";
import PageHeader from "@/components/ui/PageHeader";

export default function MyTickets() {
  const navigate = useNavigate();
  return (
    <SideBarLayout>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-violet-100 via-white to-pink-100">
        <PageHeader
          title="Mis Tickets"
          subtitle="Aquí aparecerán los tickets que compres para tus eventos. ¡Guárdalos y preséntalos en la entrada!"
        />
        <div className="bg-white/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-10 max-w-lg w-full animate-fade-in-up border border-violet-100">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="bg-gradient-to-r from-violet-600 to-pink-400 rounded-full p-5 mb-2 shadow-lg flex items-center justify-center">
              <Ticket size={56} className="text-white drop-shadow" />
            </div>
            <h1 className="text-3xl font-extrabold text-violet-700 mb-1 text-center leading-tight">Mis Tickets</h1>
            <p className="text-gray-600 text-center text-base max-w-xs">Aquí aparecerán los tickets que compres para tus eventos.<br />¡Guárdalos y preséntalos en la entrada!</p>
          </div>
          <div className="bg-violet-50 rounded-2xl p-8 w-full text-center text-violet-700 font-medium flex flex-col items-center gap-2 border border-violet-100">
            <span className="text-lg">No tienes tickets comprados aún.</span>
            <span className="text-sm text-violet-400">Cuando compres un ticket, aparecerá aquí con todos los detalles.</span>
          </div>
          <Button className="w-full mt-2 py-3 text-base font-semibold rounded-xl shadow-md bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-700 hover:to-pink-600 transition-all">Volver al inicio</Button>
        </div>
      </div>
      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.8s both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      `}</style>
    </SideBarLayout>
  );
} 