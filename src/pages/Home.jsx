"use client";
import { Button } from "@/components/ui/button";
import Layout from "@/layouts/layout";
import { MapPin, Star, Utensils, MessageCircle, Clock, Users, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const restaurants = [
  {
    id: 1,
    name: "La Chivitería",
    description: "Hamburguesas gourmet y chivitos tradicionales",
    specialties: ["Hamburguesa completa", "Chivito canadiense", "Papas fritas"],
    location: "Local 12",
    rating: 4.8,
    isOpen: true,
    waitTime: "15-20 min",
    popular: true,
    image: "🍔",
  },
  {
    id: 2,
    name: "Naturalia",
    description: "Jugos naturales y smoothies saludables",
    specialties: ["Jugo de naranja", "Smoothie de frutas", "Batido de proteínas"],
    location: "Local 8",
    rating: 4.6,
    isOpen: true,
    waitTime: "8-12 min",
    popular: false,
    image: "🥤",
  },
  {
    id: 3,
    name: "Pizza Express",
    description: "Pizzas artesanales y pastas frescas",
    specialties: ["Pizza margarita", "Pizza pepperoni", "Lasagna"],
    location: "Local 15",
    rating: 4.7,
    isOpen: true,
    waitTime: "20-25 min",
    popular: true,
    image: "🍕",
  },
  {
    id: 4,
    name: "Café Central",
    description: "Café de especialidad y pastelería",
    specialties: ["Café con leche", "Cappuccino", "Croissants"],
    location: "Local 5",
    rating: 4.5,
    isOpen: true,
    waitTime: "5-10 min",
    popular: false,
    image: "☕",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section Mejorado */}
        <section className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 py-16 md:py-24 flex flex-col items-center text-center relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-blue-500/20" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-bounce" />
          
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Nuevo: Mozo Virtual Inteligente</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 animate-fade-in text-center leading-tight">
              ¡Descubre los mejores{" "}
              <span className="text-yellow-300 relative">
                restaurantes
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
              </span>{" "}
              del Mercado Agrícola!
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl animate-fade-in delay-100 mx-auto text-center leading-relaxed">
              Explora menús únicos y realiza pedidos inteligentes desde cualquier mesa con nuestro mozo virtual.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-200">
              <Button
                asChild
                size="lg"
                className="bg-white text-violet-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/chat">
                  <MessageCircle className="h-6 w-6 mr-3" />
                  Comenzar Pedido
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-violet-600 hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Users className="h-6 w-6 mr-3" />
                Ver Restaurantes
              </Button>
            </div>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="w-full py-12 bg-white/50 backdrop-blur-sm">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Utensils, label: "Restaurantes", value: "12+", color: "text-violet-600" },
                { icon: Users, label: "Clientes", value: "500+", color: "text-blue-600" },
                { icon: Star, label: "Calificación", value: "4.8", color: "text-yellow-600" },
                { icon: Clock, label: "Tiempo Promedio", value: "15min", color: "text-green-600" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 ${stat.color.replace('text-', 'bg-')}/10`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grilla de Restaurantes Mejorada */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros <span className="text-violet-600">Restaurantes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre la diversidad gastronómica del Mercado Agrícola con opciones para todos los gustos
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {restaurants.map((local, index) => (
              <div 
                key={local.id} 
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge popular */}
                {local.popular && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Popular
                    </div>
                  </div>
                )}
                
                {/* Imagen/Emoji del restaurante */}
                <div className="h-32 bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {local.image}
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  {/* Contenido principal */}
                  <div className="flex-1">
                    {/* Header del restaurante */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-violet-600 transition-colors">
                          {local.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {local.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Información del restaurante */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-violet-500" />
                        <span>{local.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-800">{local.rating}</span>
                        <span className="text-gray-500">• Excelente</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span>{local.waitTime}</span>
                      </div>
                    </div>
                    
                    {/* Especialidades */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {local.specialties.slice(0, 3).map((specialty, i) => (
                          <span 
                            key={i} 
                            className="inline-block bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 text-xs px-3 py-1 rounded-full font-medium border border-violet-200"
                          >
                            {specialty}
                          </span>
                        ))}
                        {local.specialties.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            +{local.specialties.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Estado y botón - siempre al final */}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${local.isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                      <span className={`text-sm font-medium ${local.isOpen ? "text-green-700" : "text-red-700"}`}>
                        {local.isOpen ? "Abierto" : "Cerrado"}
                      </span>
                    </div>
                    
                    <Button
                      asChild
                      size="sm"
                      className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <Link to={`/chat?mesa=1`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Pedir
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Efecto de hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 to-blue-600/0 group-hover:from-violet-600/5 group-hover:to-blue-600/5 transition-all duration-500 rounded-3xl" />
              </div>
            ))}
          </div>
        </section>

        {/* Sección del Chat Mejorada */}
        <section className="w-full py-16 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-blue-500/20" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center text-white mb-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Experiencia Inteligente</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                ¡Prueba nuestro nuevo{" "}
                <span className="text-yellow-300">chatbot inteligente</span>{" "}
                del Mercado Agrícola!
              </h2>
              
              <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Pide de múltiples locales en una sola conversación. Tu mozo virtual te ayudará a ordenar desde cualquier mesa con inteligencia artificial.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link to="/chat">
                    <MessageCircle className="h-6 w-6 mr-3" />
                    Ir al Chat
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-violet-600 hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Users className="h-6 w-6 mr-3" />
                  Ver Demo
                </Button>
              </div>
            </div>
            
            {/* Características del chatbot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: MessageCircle,
                  title: "Chat Inteligente",
                  description: "Conversación natural con IA avanzada"
                },
                {
                  icon: Clock,
                  title: "Pedidos Rápidos",
                  description: "Procesamiento instantáneo de pedidos"
                },
                {
                  icon: Users,
                  title: "Múltiples Locales",
                  description: "Ordena de varios restaurantes a la vez"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-violet-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Animaciones Tailwind personalizadas */}
      <style>{`
        .animate-fade-in { 
          animation: fadeIn 1s ease-out both; 
        }
        .animate-fade-in-up { 
          animation: fadeInUp 0.8s ease-out both; 
        }
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes fadeInUp { 
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          } 
          to { 
            opacity: 1; 
            transform: none; 
          } 
        }
      `}</style>
    </div>
  );
}
