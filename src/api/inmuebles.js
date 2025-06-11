import axios from "axios";

export const fetchInmuebles = async (proyecto_id) => {
    try {
        let url = `http://localhost:3000/api/inmuebles`;
        if (proyecto_id) {
            url += `?proyecto_id=${proyecto_id}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return new Error(error.response.data);
    }
};

export const registrarInmueble = async (inmueble) => {
  try {
    const response = await axios.post("http://localhost:3000/api/registroinmueble", inmueble);
    return response.data;
  } catch (error) {
    console.error("Error al registrar inmueble:", error);
    return;
  }
};

export const actualizarInmueble = async (id, inmueble) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/inmuebles/${id}`, inmueble);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar inmueble:", error);
    return;
  }
};


export const eliminarInmueble = async (id) => {
    try {
        await axios.delete("http://localhost:3000/api/inmuebles/" + id);
        return true;
    } catch (error) {
        console.error("Error en eliminar inmueble:", error);
        return false;
    }
};
