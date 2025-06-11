import { useEffect, useState } from "react";
import {
  actualizarProyecto,
  eliminarProyecto,
  fetchProyectos,
  registrarProyecto,
} from "../api/proyectos";
import { fetchInmuebles } from "../api/inmuebles";

function Proyectos() {
  const [showModal, setShowModal] = useState(false);
  const [proyectos, setProyectos] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const [showInmueblesModal, setShowInmueblesModal] = useState(false);
  const [ubicacion, setUbicacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const mostarPro = async () => {
    const data = await fetchProyectos();
    setProyectos(data);
  };

  useEffect(() => {
    mostarPro();
  }, []);

  const eliminarProyec = async (id) => {
    const confimacion = window.confirm("Estas seguro de eliminar el proyecto");
    if (!confimacion) return;
    const res = await eliminarProyecto(id);
    if (res) {
      mostarPro();
    }
  };

  const agregarNuevoProyecto = async () => {
    setShowModal(true);
  };
  const editProy = async (id) => {
    setShowModal(true);
    setSelectedProyecto(id);
    const proyectosData = await fetchProyectos();
    const proyecto = proyectosData.find((p) => p.id === id);

    if (proyecto) {
      setUbicacion(proyecto.ubicacion);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFecha_inicio(proyecto.fecha_inicio.split("T")[0]);
    } else {
      console.error("Proyecto not found with id:", id);
    }
  };

  return (
    <div className="text-white pt-14 bg-gray-900 h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={agregarNuevoProyecto}
      >
        Agregar Proyecto
      </button>
      <table className="min-w-full ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ubicacion
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-black">
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td className="px-6 py-4 whitespace-nowrap">{proyecto.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{proyecto.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.ubicacion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.descripcion}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {proyecto.fecha_inicio.split("T")[0]}
              </td>
              <td className="flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => editProy(proyecto.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => eliminarProyec(proyecto.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => {
                    const getInmuebles = async () => {
                      const data = await fetchInmuebles(proyecto.id);
                      setInmuebles(data);
                      setShowInmueblesModal(true);
                    };
                    getInmuebles();
                  }}
                >
                  Inmuebles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4 py-4 pt-20 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {selectedProyecto ? "Editar Proyecto" : "Agregar Proyecto"}
                </h3>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Ubicación"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                  />
                  <textarea
                    placeholder="Descripción"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                  <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={fecha_inicio}
                    onChange={(e) => setFecha_inicio(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={async () => {
                    const proyectoData = {
                      nombre: nombre,
                      ubicacion: ubicacion,
                      descripcion: descripcion,
                      fecha_inicio: fecha_inicio,
                    };

                    if (selectedProyecto) {
                      await actualizarProyecto(selectedProyecto, proyectoData);
                    } else {
                      await registrarProyecto(proyectoData);
                    }

                    await mostarPro();
                    setShowModal(false);
                    setNombre("");
                    setUbicacion("");
                    setDescripcion("");
                    setFecha_inicio("");
                    setSelectedProyecto(null);
                  }}
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showInmueblesModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4 py-4 pt-20 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 italic text-center">
                  Inmuebles
                </h3>
                <div className="mt-2 text-black">
                  {inmuebles.length > 0 ? (
                    inmuebles.map((inmueble) => (
                      <div
                        key={inmueble.id}
                        className="flex flex-col bg-gray-300 rounded-lg mb-2 font-serif"
                      >
                        
                        <p className="mx-1 px-1">Inmueble: {inmueble.titulo}</p>
                        <p className="mx-1 px-1">Tipo: {inmueble.tipo}</p>
                      </div>
                    ))
                  ) : (
                    <p>Aún no hay inmuebles en este proyecto</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowInmueblesModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyectos;
