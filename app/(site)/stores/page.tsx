import Image from "next/image";

const stores = [
  {
    id: 1,
    title: "-UNICENTER SHOPPING - Piso 2, Local 2139, Martinez.",
    urlImage: "/stores-images/store-1.jpg",
  },
  {
    id: 2,
    title: "-TORTUGAS OPEN MALL - Piso 2, Local 107, Tortuguitas.",
    urlImage: "/stores-images/store-2.jpg",
  },
  {
    id: 3,
    title: "-PLAZA OESTE SHOPPING - Planta alta - Local 2052, Morón.",
    urlImage: "/stores-images/store-3.jpg",
  },
  {
    id: 4,
    title: "-TERRAZAS DE MAYO SHOPPING - Local 69, Polvorines.",
    urlImage: "/stores-images/store-4.jpg",
  },
  {
    id: 5,
    title: "-BOULEVARD SHOPPING - Local 147/148, Adrogué.",
    urlImage: "/stores-images/store-5.jpg",
  },
];

export default function StoresPage() {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold my-2">Stores</h1>

      <main className="flex flex-col items-center justify-center gap-5">
        {stores.map((store) => (
          <div className="flex flex-col items-center" key={store.id}>
            <p>{store.title}</p>
            <Image
              src={store.urlImage}
              alt="store-1"
              width={300}
              height={300}
              className="object-cover rounded-sm"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
