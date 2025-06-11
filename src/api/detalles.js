import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchDetalleInmueble = async () => {
  try {
    const response = await axios.get(`${API_URL}/detalleinmuebles`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalle del inmueble:", error);
    return null;
  }
};

export const registroDetalleInmueble = async (detalle) => {
  try {
    const response = await axios.post(`${API_URL}/detalleinmueble`, detalle);
    return response.data;
  } catch (error) {
    console.error("Errorala registrar detalle del inmueble:", error);
    return null;
  }
};

export const actualizarDetalleInmueble = async (id, detalle) => {
  try {
    const response = await axios.put(`${API_URL}/detalleinmuebles/${id}`, detalle);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el detalle del inmueble:", error);
    return null;
  }
};

export const eliminarDetalleInmueble = async (id) => {
  try {
    await axios.delete(`${API_URL}/detalleinmuebles/${id}`);
    return true;
  } catch (error) {
    console.error("Errorelkiminar el detalle del inmueble:", error);
    return false;
  }
};

export const fetchInmuebleDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detalleinmuebles?inmueble_id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del inmueble:", error);
    return null;
  }
};
