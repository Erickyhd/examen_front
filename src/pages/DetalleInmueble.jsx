import { useState, useEffect } from "react";
import {
  fetchDetalleInmueble,
  registroDetalleInmueble,
  actualizarDetalleInmueble,
  eliminarDetalleInmueble,
} from "../api/detalles";

function DetalleInmueble() {
  const [detalles, setDetalles] = useState([]);
  const [inmueble_id, setInmueble_id] = useState("");
  const [caracteristica, setCaracteristica] = useState("");
  const [valor, setValor] = useState("");
  const [selectedDetalle, setSelectedDetalle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const obtenerDetalles = async () => {
    try {
      const data = await fetchDetalleInmueble();
      setDetalles(data);
    } catch (error) {
      console.error("Error fetching detalles:", error);
    }
  };

  useEffect(() => {
    obtenerDetalles();
  }, []);

  const handleFilter = (e) => {
    setInmueble_id(e.target.value);
  };

  const handleAgregarDetalle = () => {
    setShowModal(true);
    setSelectedDetalle(null);
    setCaracteristica("");
    setValor("");
    setInmueble_id("");
  };

  const handleEditarDetalle = (id) => {
    const detalle = detalles.find((d) => d.id === id);
    if (detalle) {
      setShowModal(true);
      setSelectedDetalle(id);
      setCaracteristica(detalle.caracteristica);
      setValor(detalle.valor);
      setInmueble_id(detalle.inmueble_id);
    }
  };

  const handleEliminarDetalle = async (id) => {
    const confirmacion = window.confirm(
      "¿Estas seguro de eliminar el detalle?"
    );
    if (!confirmacion) return;
    try {
      await eliminarDetalleInmueble(id);
      obtenerDetalles();
    } catch (error) {
      console.error("Error deleting detalle:", error);
    }
  };

  const handleSubmit = async () => {
    const detalleData = {
      caracteristica: caracteristica,
      valor: valor,
    };

    try {
      if (selectedDetalle) {
        await actualizarDetalleInmueble(selectedDetalle, detalleData);
      } else {
        detalleData.inmueble_id = inmueble_id;
        await registroDetalleInmueble(detalleData);
      }

      obtenerDetalles();
      setShowModal(false);
      setCaracteristica("");
      setValor("");
      setInmueble_id("");
      setSelectedDetalle(null);
    } catch (error) {
      console.error("Error submitting detalle:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-14 text-white">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Detalle Inmueble</h1>
        <input
          type="text"
          placeholder="Filtrar por Inmueble ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-4"
          onChange={handleFilter}
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleAgregarDetalle}
        >
          Agregar Detalle
        </button>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inmueble ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Característica
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
            {detalles
              .filter((detalle) =>
                inmueble_id ? detalle.inmueble_id.toString().includes(inmueble_id) : true
              )
              .map((detalle) => (
                <tr key={detalle.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detalle.inmueble_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detalle.caracteristica}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{detalle.valor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEditarDetalle(detalle.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEliminarDetalle(detalle.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 overflow-y-auto backdrop-blur-md z-60 bg-white/20">
            <div className="flex items-center justify-center min-h-screen px-4 py-4 pt-20 pb-20 text-center sm:block sm:p-0 ">
              <div
                className=" inset-0 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedDetalle ? "Editar Detalle" : "Agregar Detalle"}
                  </h3>
                  <div className="mt-2">
                    {!selectedDetalle && (
                      <input
                        type="number"
                        placeholder="Inmueble ID"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        required
                        value={inmueble_id}
                        onChange={(e) => setInmueble_id(e.target.value)}
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Característica"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      required
                      value={caracteristica}
                      onChange={(e) => setCaracteristica(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Valor"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                    />
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
      </div>
    </div>
  );
}

export default DetalleInmueble;
