export interface Cow {
  id: string;
  name: string;
  nickname: string;
  breed: string;
  tagCode: string;
  birthDate: string;
  deathDate?: string;
  sex: "Hembra" | "Macho";
  color: string;
  weight: string;
  owner: string;
  ownerId: string;
  status: "Activo" | "Fallecido";
  photo?: string;
  registeredAt: string;
}

export interface Owner {
  id: string;
  name: string;
  document: string;
  phone: string;
  address: string;
  cattleCount: number;
}

export const mockOwners: Owner[] = [
  { id: "OWN-001", name: "Carlos Mendoza", document: "12345678", phone: "+51 987 654 321", address: "Fundo La Esperanza, Cajamarca", cattleCount: 12 },
  { id: "OWN-002", name: "María Huamán", document: "87654321", phone: "+51 912 345 678", address: "Hacienda San José, Arequipa", cattleCount: 8 },
  { id: "OWN-003", name: "Pedro Quispe", document: "11223344", phone: "+51 945 678 123", address: "Estancia El Rosal, Cusco", cattleCount: 15 },
  { id: "OWN-004", name: "Ana Torres", document: "44332211", phone: "+51 978 123 456", address: "Rancho Los Álamos, Junín", cattleCount: 6 },
];

export const mockCows: Cow[] = [
  {
    id: "RC-2024-0001",
    name: "Esperanza",
    nickname: "La Reina",
    breed: "Holstein",
    tagCode: "DNI-VAC-00142857",
    birthDate: "2021-03-15",
    sex: "Hembra",
    color: "Blanco y Negro",
    weight: "520 kg",
    owner: "Carlos Mendoza",
    ownerId: "OWN-001",
    status: "Activo",
    registeredAt: "2024-01-10",
  },
  {
    id: "RC-2024-0002",
    name: "Valentina",
    nickname: "Valita",
    breed: "Brown Swiss",
    tagCode: "DNI-VAC-00285714",
    birthDate: "2022-07-20",
    sex: "Hembra",
    color: "Marrón",
    weight: "480 kg",
    owner: "María Huamán",
    ownerId: "OWN-002",
    status: "Activo",
    registeredAt: "2024-02-05",
  },
  {
    id: "RC-2024-0003",
    name: "Trueno",
    nickname: "El Jefe",
    breed: "Brahman",
    tagCode: "DNI-VAC-00428571",
    birthDate: "2020-11-08",
    sex: "Macho",
    color: "Gris",
    weight: "680 kg",
    owner: "Pedro Quispe",
    ownerId: "OWN-003",
    status: "Activo",
    registeredAt: "2024-03-12",
  },
  {
    id: "RC-2024-0004",
    name: "Luna",
    nickname: "Lunita",
    breed: "Jersey",
    tagCode: "DNI-VAC-00571428",
    birthDate: "2019-05-22",
    deathDate: "2025-01-15",
    sex: "Hembra",
    color: "Caramelo",
    weight: "410 kg",
    owner: "Ana Torres",
    ownerId: "OWN-004",
    status: "Fallecido",
    registeredAt: "2024-04-18",
  },
  {
    id: "RC-2024-0005",
    name: "Mariposa",
    nickname: "Mari",
    breed: "Simmental",
    tagCode: "DNI-VAC-00714285",
    birthDate: "2023-01-30",
    sex: "Hembra",
    color: "Rojo y Blanco",
    weight: "390 kg",
    owner: "Carlos Mendoza",
    ownerId: "OWN-001",
    status: "Activo",
    registeredAt: "2024-05-22",
  },
  {
    id: "RC-2025-0006",
    name: "Tormenta",
    nickname: "Tormi",
    breed: "Angus",
    tagCode: "DNI-VAC-00857142",
    birthDate: "2024-12-10",
    sex: "Hembra",
    color: "Negro",
    weight: "45 kg",
    owner: "Pedro Quispe",
    ownerId: "OWN-003",
    status: "Activo",
    registeredAt: "2025-02-01",
  },
];
