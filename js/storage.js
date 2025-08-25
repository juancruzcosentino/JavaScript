const storageKey = "boletinAlumnos";

function guardarAlumnos(alumnos) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(alumnos));
  } catch (error) {
    console.error("Error guardando en storage", error);
  }
}

function recuperarAlumnos() {
  try {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error recuperando del storage", error);
    return [];
  }
}

function vaciarStorage() {
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error("Error vaciando storage", error);
  }
}