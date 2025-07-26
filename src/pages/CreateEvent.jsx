import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BasicInfoForm } from "@/components/events/BasicInfoForm";
import { LocationForm } from "@/components/events/LocationForm";
import { DescriptionForm } from "@/components/events/DescriptionForm";
import { MediaForm } from "@/components/events/MediaForm";
import Layout from "@/layouts/layout";

export default function CreateEvent() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic");
    const [isPublic, setIsPublic] = useState(false);
    const [qrEnabled, setQrEnabled] = useState(false);
    const [qrTime, setQrTime] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: -34.9011, lng: -56.1645 });
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Evento creado exitosamente");
    };

    const handleNext = () => {
        const tabs = ["basic", "location", "description", "media"];
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const tabs = ["basic", "location", "description", "media"];
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    const handleLocationSelect = (coords) => {
        setCoordinates(coords);
    };

    const handleCancel = () => {
        navigate("/admin-events");
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
                {/* Hero Section */}
                <section className="w-full bg-gradient-to-r from-violet-600 to-blue-500 py-6 sm:py-8 md:py-10 lg:py-16 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-2 sm:mb-4 animate-fade-in">
                            Crear Nuevo Evento
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-violet-100 mb-4 sm:mb-6 md:mb-8 max-w-2xl animate-fade-in delay-100 mx-auto">
                            Completa la información para crear tu evento y compartirlo con el mundo
                        </p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse" />
                </section>

                <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                            {/* Mobile Tabs */}
                            <div className="sm:hidden flex items-center justify-between mb-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={handlePrevious}
                                    disabled={activeTab === "basic"}
                                    className="text-violet-700"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <span className="text-sm font-medium text-violet-700">
                                    {activeTab === "basic" && "Información Básica"}
                                    {activeTab === "location" && "Ubicación"}
                                    {activeTab === "description" && "Descripción"}
                                    {activeTab === "media" && "Medios"}
                                </span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleNext}
                                    disabled={activeTab === "media"}
                                    className="text-violet-700"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Desktop Tabs */}
                            <TabsList className="hidden sm:grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-1">
                                <TabsTrigger value="basic" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 cursor-pointer">Información Básica</TabsTrigger>
                                <TabsTrigger value="location" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 cursor-pointer">Ubicación</TabsTrigger>
                                <TabsTrigger value="description" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 cursor-pointer">Descripción</TabsTrigger>
                                <TabsTrigger value="media" className="data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 cursor-pointer">Medios</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic">
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                                    <CardHeader className="p-4 sm:p-6">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl text-violet-700">Información Básica del Evento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <BasicInfoForm isPublic={isPublic} setIsPublic={setIsPublic} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="location">
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                                    <CardHeader className="p-4 sm:p-6">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl text-violet-700">Ubicación del Evento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <LocationForm coordinates={coordinates} onLocationSelect={handleLocationSelect} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="description">
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                                    <CardHeader className="p-4 sm:p-6">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl text-violet-700">Descripción del Evento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <DescriptionForm description={description} setDescription={setDescription} />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="media">
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
                                    <CardHeader className="p-4 sm:p-6">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl text-violet-700">Medios del Evento</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 sm:p-6">
                                        <MediaForm
                                            qrEnabled={qrEnabled}
                                            setQrEnabled={setQrEnabled}
                                            qrTime={qrTime}
                                            setQrTime={setQrTime}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                            <Button
                                variant="outline"
                                type="button"
                                className="w-full sm:w-auto hover:bg-violet-50 hover:text-violet-700 cursor-pointer"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 cursor-pointer"
                            >
                                Crear Evento
                            </Button>
                        </div>
                    </div>
                </div>

                <style>{`
        .animate-fade-in { animation: fadeIn 0.8s both; }
        .animate-fade-in-up { animation: fadeInUp 0.8s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      `}</style>
            </div>
        </Layout>
    );
}