const mockEvents = [
  {
    id: 1,
    name: "Reggaeton & Latin House",
    date: "2025-05-16T22:00:00",
    city: "Montevideo",
    venue: "You Club",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    category: "Fiesta",
    tickets: [
      { id: 1, name: "General", description: "Entrada general", price: 300 },
      { id: 2, name: "VIP", description: "Entrada VIP", price: 450 }
    ],
    location: {
      address: "You Club, Montevideo",
      mapUrl: "https://maps.google.com/?q=You+Club+Montevideo"
    },
    info: "¡Noche de reggaeton y latin house con los mejores DJs!"
  },
  {
    id: 2,
    name: "Festi de las Flores",
    date: "2025-05-16T21:00:00",
    city: "Canelones",
    venue: "Luna en Vivo",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    category: "Festival",
    tickets: [
      { id: 1, name: "General", description: "Entrada general", price: 350 }
    ],
    location: {
      address: "Luna en Vivo, Canelones",
      mapUrl: "https://maps.google.com/?q=Luna+en+Vivo+Canelones"
    },
    info: "Festival de las flores con música en vivo y foodtrucks."
  },
  {
    id: 3,
    name: "10 años de Reggaeton",
    date: "2025-05-17T23:00:00",
    city: "Montevideo",
    venue: "Plaza Mateo",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    category: "Concierto",
    tickets: [
      { id: 1, name: "Anticipadas - Hasta 01.30 am", description: "Válido hasta 01.30 am. Luego de este horario se cobra recargo.", price: 300 },
      { id: 2, name: "Anticipadas - Sin horario", description: "Válido para ingresar a cualquier hora.", price: 450 }
    ],
    location: {
      address: "Av. Sarmiento, 11200 Montevideo, Departamento de Montevideo",
      mapUrl: "https://maps.google.com/?q=Plaza+Mateo+Montevideo"
    },
    info: "¡Festejá 10 años de reggaeton con los mejores DJs y artistas invitados! No te pierdas la fiesta más grande del año."
  },
  {
    id: 4,
    name: "Key Mood w/ Kevin de Vries",
    date: "2025-05-17T23:59:00",
    city: "Maldonado",
    venue: "Mandala Beach Club",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    category: "Electrónica",
    tickets: [
      { id: 1, name: "General", description: "Entrada general", price: 400 }
    ],
    location: {
      address: "Mandala Beach Club, Maldonado",
      mapUrl: "https://maps.google.com/?q=Mandala+Beach+Club+Maldonado"
    },
    info: "Noche electrónica con Kevin de Vries y DJs invitados."
  },
  {
    id: 5,
    name: "Festival de la Canción",
    date: "2025-05-18T22:00:00",
    city: "Montevideo",
    venue: "Estadio Centenario",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    category: "Electrónica",
    tickets: [
      { id: 1, name: "General", description: "Entrada general", price: 350 }
    ],
    location: {
      address: "Estadio Centenario, Montevideo",
      mapUrl: "https://maps.google.com/?q=Estadio+Centenario+Montevideo"
    },
    info: "Festival de la canción con artistas nacionales e internacionales."
  },
  {
    id: 6,
    name: "Festival de la Canción",
    date: "2025-05-18T22:00:00",
    city: "Montevideo",
    venue: "Estadio Centenario",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    tickets: [
      { id: 1, name: "General", description: "Entrada general", price: 350 }
    ],
    location: {
      address: "Estadio Centenario, Montevideo",
      mapUrl: "https://maps.google.com/?q=Estadio+Centenario+Montevideo"
    },
    info: "Festival de la canción con artistas nacionales e internacionales."
  }
];

export default mockEvents; 