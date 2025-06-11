import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchInmuebles,
  registrarInmueble,
  actualizarInmueble,
  eliminarInmueble,
} from "../api/inmuebles";
import { fetchInmuebleDetails } from "../api/detalles";

function Inmuebles() {
  const [inmuebles, setInmuebles] = useState([]);
  const [proyecto_id, setProyecto_id] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [selectedInmueble, setSelectedInmueble] = useState(null);
  const [filterProyectoId, setFilterProyectoId] = useState("");
  const [showDetallesModal, setShowDetallesModal] = useState(false);
  const [inmuebleDetails, setInmuebleDetails] = useState(null);

  const mostarInmuebles = async () => {
    const data = await fetchInmuebles();
    setInmuebles(data);
  };

  useEffect(() => {
    mostarInmuebles();
  }, []);

  const handleAgregarInmueble = async () => {
    setShowModal(true);
    setSelectedInmueble(null);
    setProyecto_id("");
    setTitulo("");
    setTipo("");
  };

  const handleEditarInmueble = async (id) => {
    setShowModal(true);
    setSelectedInmueble(id);
    const inmueble = inmuebles.find((inmueble) => inmueble.id === id);
    if (inmueble) {
      setProyecto_id(inmueble.proyecto_id);
      setTitulo(inmueble.titulo);
      setTipo(inmueble.tipo);
      setEstado(inmueble.estado.toString());
    }
  };

  const handleEliminarInmueble = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de eliminar el inmueble?"
    );
    if (!confirmacion) return;
    try {
      const res = await eliminarInmueble(id);
      if (res) {
        mostarInmuebles();
      }
    } catch (error) {
      console.error("Error deleting inmueble:", error);
    }
  };

  const handleSubmit = async () => {
    const inmuebleData = {
      proyecto_id: proyecto_id,
      titulo: titulo,
      tipo: tipo,
      estado: estado,
    };

    if (selectedInmueble) {
      try {
        await actualizarInmueble(selectedInmueble, inmuebleData);
      } catch (error) {
        console.error("Error updating inmueble:", error);
      }
    } else {
      try {
        const newInmuebleData = { ...inmuebleData, estado: "1" };
        await registrarInmueble(newInmuebleData);
      } catch (error) {
        console.error("Error registering inmueble:", error);
      }
    }

    mostarInmuebles();
    setShowModal(false);
    setProyecto_id("");
    setTitulo("");
    setTipo("");
    setEstado("");
    setSelectedInmueble(null);
  };

  const handleFilter = (e) => {
    setFilterProyectoId(e.target.value);
  };

  const handleDetallesInmueble = async (id) => {
    const details = await fetchInmuebleDetails(id);
    setInmuebleDetails(details);
    setShowDetallesModal(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-14 text-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Inmuebles</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleAgregarInmueble}
        >
          Agregar Inmueble
        </button>
        <input
          type="text"
          placeholder="Filtrar por Proyecto ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-4"
          onChange={handleFilter}
        />

        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Proyecto ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Inmueble
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {inmuebles
              .filter((inmueble) =>
                filterProyectoId
                  ? inmueble.proyecto_id.toString().includes(filterProyectoId)
                  : true
              )
              .map((inmueble) => (
                <tr key={inmueble.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inmueble.proyecto_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inmueble.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inmueble.titulo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inmueble.tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inmueble.estado === 1 ? "Activo" : "Inactivo"}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEditarInmueble(inmueble.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEliminarInmueble(inmueble.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDetallesInmueble(inmueble.id)}
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex min-h-screen px-4 py-4 pt-20 pb-20 text-center sm:block sm:p-0">
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
                    {selectedInmueble ? "Editar Inmueble" : "Agregar Inmueble"}
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Proyecto ID"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      value={proyecto_id}
                      onChange={(e) => setProyecto_id(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Título"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Tipo"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    />
                    {selectedInmueble && (
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSubmit}
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

        {showDetallesModal && inmuebleDetails && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex min-h-screen px-4 py-4 pt-20 pb-20 text-center sm:block sm:p-0">
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
                    Detalles del Inmueble
                  </h3>
                  <div className="mt-2 rounded-lg mb-2">
                    {inmuebleDetails.map((detalle) => (
                      <div
                        key={detalle.id}
                        className="flex flex-col p-2 bg-gray-800 rounded-lg mb-2"
                      >
                        <p>Característica: {detalle.caracteristica}</p>
                        <p className="">Valor: {detalle.valor}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowDetallesModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Link to={"/detalleInmueble"}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Mas detalles
        </button>
      </Link>
    </div>
  );
}

export default Inmuebles;
