import React, { useState, useEffect } from "react";
import TargetaInmueble from "../components/TargetaInmueble";
import { fetchProyectos } from "../api/proyectos";
import { Link } from "react-router-dom";

function Home() {
  const [proyectos, setProyectos] = useState([]);
  const imagen =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  useEffect(() => {
    const mostrarProyectos = async () => {
      const data = await fetchProyectos();
      setProyectos(data);
    };
    mostrarProyectos();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <section
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imagen})`,
        }}
      >
        <div className="container mx-auto text-center relative">
          <h1 className="text-5xl font-bold text-white mb-4 uppercase font-serif">
            Encuentra el departamento de tus Sueños
          </h1>
          <p className=" text-white text-2xl">
            Ofrecemos una amplia gama de propiedades...
          </p>
          <section className="text-white text-3xl font-serif p-4 mb-6">
            Revisa los inmuebles que brinda cada proyecto
          </section>
          <Link
            to={"/inmuebles"}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer text-2xl font-serif"
          >
            Inmuebles
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Propiedades Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto) => (
              <TargetaInmueble
                key={proyecto.id}
                nombre={proyecto.nombre}
                descripcion={proyecto.descripcion}
                ubicacion={proyecto.ubicacion}
                proyecto_id={proyecto.id}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white shadow-lg rounded-lg">
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Acerca de Nosotros
          </h2>
          <p className="text-gray-600 text-lg text-center">
            Somos una empresa líder en el sector inmobiliario con años de
            experiencia ayudando a las personas a encontrar la casa de sus
            sueños. Nuestro equipo de expertos está dedicado a brindarte el
            mejor servicio posible. Nos apasiona conectar a las personas con el
            hogar perfecto.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white shadow-lg rounded-lg">
        <div className="container mx-auto p-8">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Contáctenos
          </h2>
          <p className="text-gray-600 text-lg text-center">
            Contáctenos hoy mismo para descubrir cómo podemos ayudarte a
            encontrar la propiedad ideal.
          </p>
          <p className="text-gray-600 text-lg text-center">
            Correo electrónico: info@example.com
          </p>
          <p className="text-gray-700 text-lg text-center">
            Teléfono: +57 300 000 0000
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 py-4 text-white text-center">
        &copy; {new Date().getFullYear()} Empresa Inmobiliaria AncoSur
      </footer>
    </div>
  );
}

export default Home;
