import Link from "next/link";
import { CiCirclePlus, CiTrash } from "react-icons/ci";

const adminOptions = [
  {
    title: "Crear producto",
    description: "Cargar un nuevo producto con sus imágenes, talles y stock.",
    href: "/admin/crear-producto",
    icon: CiCirclePlus,
  },
  {
    title: "Borrar producto",
    description: "Eliminar un producto existente del catálogo.",
    href: "/admin/borrar-producto",
    icon: CiTrash,
  },
];

export default async function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Panel de administrador</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
        {adminOptions.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary transition-all"
          >
            <div className="card-body items-center text-center">
              <Icon className="text-4xl" />
              <h2 className="card-title">{title}</h2>
              <p className="text-sm text-base-content/70">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
