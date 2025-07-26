import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const EventCarousel = ({ events }) => {
  // 1. slidesToShow depende del ancho
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesToShow(3);
      else if (w >= 768) setSlidesToShow(2);
      else setSlidesToShow(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Embla con loop
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  // 3. Autoplay
  const autoplay = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(autoplay, 4000);
    return () => clearInterval(id);
  }, [emblaApi, autoplay]);

  // 4. Paginado
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollTo = useCallback((idx) => emblaApi && emblaApi.scrollTo(idx), [emblaApi]);

  // ancho dinámico
  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <div className="w-full">
      <div className="h-[410px] md:overflow-visible overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 px-4"
              style={{ width: slideWidth, boxSizing: "border-box" }}
            >
              {/* Card rediseñada */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-transform duration-200 hover:scale-105 hover:shadow-2xl relative">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="h-40 sm:h-56 w-full object-cover group-hover:brightness-90 transition-all duration-200"
                  />
                  {/* Overlay para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Fecha badge */}
                  <div className="absolute top-3 left-3 bg-white/90 text-violet-700 text-xs px-3 py-1 rounded-full shadow font-bold flex items-center gap-1">
                    <Calendar size={14} className="mr-1" />
                    {new Date(event.date).toLocaleDateString("es-UY", { day: "2-digit", month: "short" })}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg sm:text-xl font-extrabold text-violet-800 mb-1 group-hover:text-violet-900 transition-colors drop-shadow">
                    {event.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-violet-400" />
                    {event.venue} - {event.city}
                  </div>
                  <Button
                    className="mt-3 w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:from-violet-700 hover:to-pink-600 hover:scale-105 transition-all duration-200 text-base py-2 flex items-center justify-center gap-2"
                    asChild
                  >
                    <Link to={`/evento/${event.id}`}>
                      <Ticket size={18} className="inline-block" />
                      Comprar entradas
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paginado mejorado */}
      <div className="flex justify-center gap-3 mt-4">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none border-2 border-violet-300 ${selectedIndex === idx ? "bg-violet-600 scale-125 shadow-lg" : "bg-gray-300"}`}
            aria-label={`Ir al evento ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
