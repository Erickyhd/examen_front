import axios from "axios";

const fetchProyectos = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/proyectos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    return [];
  }
};


const eliminarProyecto = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/proyectos/${id}`);
    return true;
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    return false;
  }
};


const registrarProyecto = async (proyecto) => {
  try {
    const response = await axios.post("http://localhost:3000/api/registroproyecto", proyecto);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el proyecto:", error);
    return null;
  }
};

const actualizarProyecto = async (id, proyecto) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/proyectos/${id}`, proyecto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    return null;
  }
};



export { fetchProyectos, registrarProyecto, eliminarProyecto, actualizarProyecto };
