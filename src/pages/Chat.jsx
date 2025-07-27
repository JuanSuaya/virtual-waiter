"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, Clock, CheckCircle, User, Bot, Info, AlertCircle, ArrowUp } from "lucide-react";
import LocalsInfo from "@/components/LocalsInfo";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  chatWithWaiter, 
  getTableFromUrl, 
  initializeChatSession,
  checkApiHealth 
} from "@/api/chat";
import ApiStatus from "@/components/ApiStatus";

function useMesaParam() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mesa = params.get("mesa");
  return mesa && /^\d+$/.test(mesa) ? parseInt(mesa) : null;
}

const Chat = () => {
  const mesaParam = useMesaParam();
  
  // Inicializar sesión de chat basada en la mesa
  const initialSession = initializeChatSession(mesaParam);
  
  const [messages, setMessages] = useState(initialSession.messages);
  const [sessionId, setSessionId] = useState(initialSession.sessionId);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showLocalsInfo, setShowLocalsInfo] = useState(false);
  const [apiError, setApiError] = useState(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = (force = false) => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      // Hacer scroll si el usuario está cerca del final o si se fuerza
      if (isAtBottom || force) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  // Función para hacer scroll al inicio del chat
  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Hacer scroll cuando cambien los mensajes, pero solo si no es la carga inicial
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !mesaParam) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setApiError(null);
    
    // Scroll inmediato cuando el usuario envía mensaje
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const response = await chatWithWaiter(inputMessage, mesaParam, sessionId);
      
      // Detectar si el bot está pidiendo confirmación del pedido
      const responseLower = response.response.toLowerCase();
      const showConfirm = responseLower.includes('confirmar') || 
                         responseLower.includes('confirmo') ||
                         responseLower.includes('confirmamos') ||
                         responseLower.includes('¿confirmamos') ||
                         responseLower.includes('confirmar el pedido') ||
                         responseLower.includes('confirmamos el pedido') ||
                         responseLower.includes('¿confirmamos el pedido') ||
                         (responseLower.includes('total') && responseLower.includes('confirmamos')) ||
                         responseLower.includes('¿confirmamos') ||
                         responseLower.includes('confirmamos?');

      console.log('Bot response:', response.response);
      console.log('Show confirm:', showConfirm);
      console.log('Response lower:', responseLower);

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: response.response,
        timestamp: new Date(),
        showConfirm: showConfirm,
      };

      setMessages(prev => [...prev, botResponse]);
      
      // Scroll cuando el bot responde
      setTimeout(() => scrollToBottom(true), 100);
          } catch (error) {
        console.error('Error enviando mensaje:', error);
        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: `Lo siento, hay un problema de conexión: ${error.message}`,
          timestamp: new Date(),
          isError: true,
        };
        setMessages(prev => [...prev, errorMessage]);
        setApiError(error.message);
        
        // Scroll cuando hay error
        setTimeout(() => scrollToBottom(true), 100);
      } finally {
        setIsTyping(false);
        // Hacer scroll después de que termine el typing
        setTimeout(() => scrollToBottom(true), 100);
      }
    };

  // Función para verificar el estado de la API
  const verifyApiHealth = async () => {
    try {
      await checkApiHealth();
      setApiError(null);
    } catch (error) {
      setApiError('No se puede conectar con el mozo virtual');
    }
  };

  // Verificar API al cargar el componente
  useEffect(() => {
    if (mesaParam) {
      verifyApiHealth();
    }
  }, [mesaParam]);

  // Asegurar que la página se renderice al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Asegurar que se renderice al inicio cuando cambie la mesa
  useEffect(() => {
    window.scrollTo(0, 0);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  }, [mesaParam]);

  const handleConfirmOrder = () => {
    const confirmMessage = {
      id: Date.now(),
      type: "user",
      content: "Sí, confirmar pedido",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, confirmMessage]);
    setIsTyping(true);
    
    // Scroll cuando se confirma pedido
    setTimeout(() => scrollToBottom(true), 50);

    setTimeout(() => {
      const successMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: "¡Pedido enviado! Recibirás una notificación cuando esté listo. Recuerda pagar en cada local al momento de retirar.",
        timestamp: new Date(),
        isSuccess: true,
      };
      setMessages(prev => [...prev, successMessage]);
      setIsTyping(false);
      setOrderConfirmed(true);
      // Hacer scroll después de confirmar el pedido
      setTimeout(() => scrollToBottom(true), 100);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLocalSelect = (local) => {
    setInputMessage(`Quiero una ${local.specialties[0].toLowerCase()} de ${local.name}`);
    setShowLocalsInfo(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50">
      <Header title="Mercado Ferrando" subtitle="Tu mozo virtual" />
      
      <main className="flex-1">

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Chat Header */}
      <div className="bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold">
                {mesaParam ? `Chat - Mesa ${mesaParam}` : 'Chat con tu mozo virtual'}
              </h2>
              <p className="text-violet-100 text-sm">
                {mesaParam 
                  ? `Pide lo que quieras de cualquier local desde la Mesa ${mesaParam}`
                  : 'Pide lo que quieras de cualquier local'
                }
              </p>
            </div>
          </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-white hover:bg-white/20"
                  title="Volver al inicio del chat"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLocalsInfo(!showLocalsInfo)}
                  className="text-white hover:bg-white/20"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Locals Info */}
          {showLocalsInfo && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <LocalsInfo onLocalSelect={handleLocalSelect} />
            </div>
          )}

          {/* Mensaje de error si no hay mesa */}
          {!mesaParam && (
            <div className="p-6 text-center text-red-600 font-semibold">
              No se detectó el número de mesa. Por favor, escanea el QR de tu mesa para comenzar tu pedido.
            </div>
          )}

          {/* Estado de la API */}
          {mesaParam && (
            <div className="p-4">
              <ApiStatus />
            </div>
          )}

          {/* Mensaje de error de API */}
          {apiError && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Error de conexión</p>
                  <p>{apiError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={messagesContainerRef} className="h-80 md:h-96 overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} items-end space-x-2`}
              >
                {message.type === "bot" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-violet-600 to-blue-500 text-white text-xs">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white"
                      : message.isSuccess
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : message.isError
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.showConfirm && (
                      <div className="mt-3 space-y-2">
                        <Button
                          size="sm"
                          onClick={handleConfirmOrder}
                          className="w-full bg-white text-violet-600 hover:bg-gray-50"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirmar pedido
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.type === "user" ? "text-violet-100" : "text-gray-500"
                  }`}>
                    {(() => {
                      const timestamp = message.timestamp instanceof Date 
                        ? message.timestamp 
                        : new Date(message.timestamp);
                      return timestamp.toLocaleTimeString('es-UY', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      });
                    })()}
                  </div>
                </div>

                {message.type === "user" && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-gray-600 to-gray-700 text-white text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start items-end space-x-2">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-violet-600 to-blue-500 text-white text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Input Area */}
          {!orderConfirmed && (
            <div className="border-t bg-gray-50 p-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      mesaParam 
                        ? "Escribe tu pedido aquí... (ej: hamburguesa de La Chivitería y jugo de Naturalia)"
                        : "No se detectó el número de mesa"
                    }
                    disabled={!mesaParam}
                    className="bg-white border-gray-200 focus:border-violet-500"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || !mesaParam}
                  className="bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {mesaParam && (
                <div className="mt-3 flex items-center justify-center">
                  <div className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                    Mesa {mesaParam} detectada
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Order Confirmed State */}
          {orderConfirmed && (
            <div className="border-t bg-green-50 p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">¡Pedido confirmado!</h3>
              </div>
              <p className="text-green-700 mb-4">
                Tu pedido ha sido enviado a los locales correspondientes. 
                Te notificaremos cuando esté listo para retirar.
              </p>
              <Button
                onClick={() => {
                  setMessages([{
                    id: 1,
                    type: "bot",
                    content: "¡Hola! Soy tu mozo virtual del Mercado Ferrando. ¿Qué te gustaría pedir hoy?",
                    timestamp: new Date(),
                  }]);
                  setOrderConfirmed(false);
                }}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                Hacer otro pedido
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {mesaParam && !orderConfirmed && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Pedidos rápidos:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Hamburguesa completa",
                "Jugo de naranja",
                "Café con leche",
                "Pizza margarita"
              ].map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(item)}
                  className="text-sm h-auto py-2 px-3"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat; 