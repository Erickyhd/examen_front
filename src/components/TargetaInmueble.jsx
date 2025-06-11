import { useState } from "react";
import { fetchInmuebles } from "../api/inmuebles";
function TargetaInmueble({ nombre, descripcion, ubicacion, proyecto_id }) {
  const [inmuebles, setInmuebles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState();
  const imagen =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  const mostrarInmuebles = async () => {
    try {
      const data = await fetchInmuebles(proyecto_id);
      if (!data) throw new Error("No hay inmuebles");
      setInmuebles(data);
      setModalOpen(true);
    } catch (error) {
      setError(error.response.data);
      console.log(error.response.data);
      console.error("Error al obtener los inmuebles:", error);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={imagen}
          alt="Apartamento Moderno"
          className="w-full h-56 object-cover"
        />
        <div className="p-4 h-60 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2 italic text-center font-serif">
            {nombre}
          </h3>
          <p className="text-gray-600 p-4 ">{descripcion}</p>
          <p className="text-gray-600 p-4">{ubicacion}</p>
          <button
            onClick={mostrarInmuebles}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all ease-in-out duration-300 mx-auto"
          >
            Ver inmuebles
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md bg-white/10 flex items-center justify-center transition-all ease-in-out duration-300 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto transition-all duration-300 ease-in-out">
            {inmuebles.length > 0 ? (
              inmuebles.map((inmueble, i) => (
                <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(300px,700px))] z-60 w-full justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {inmueble.titulo}
                  </h3>
                  <p className="text-gray-600">
                    Proyecto numero: {inmueble.proyecto_id}
                  </p>
                  <p className="text-gray-600">Tipo: {inmueble.tipo}</p>
                  <p className="text-gray-600">
                    Estado: {inmueble.estado ? "Disponible" : "No disponible"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                {error || "Aún no hay inmuebles disponibles en este proyecto"}
              </p>
            )}
            <section className="flex gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mx-auto block"
              >
                Cerrar
              </button>
             
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default TargetaInmueble;
