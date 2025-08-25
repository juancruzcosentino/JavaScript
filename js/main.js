document.addEventListener("DOMContentLoaded", () => {
  let alumnos = recuperarAlumnos();

  const nombreInput = document.querySelector("#nombre");
  const notaInput = document.querySelector("#nota");
  const tablaBody = document.querySelector("#tabla-alumnos tbody");
  const btnAgregar = document.querySelector("#agregar");
  const btnVaciar = document.querySelector("#vaciar-storage");
  const mensajeDiv = document.querySelector("#mensaje");

  function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = tipo; // por ej. 'error', 'exito', 'info' para estilos CSS
    setTimeout(() => {
      mensajeDiv.textContent = "";
      mensajeDiv.className = "";
    }, 3000);
  }

  function estadoNota(nota) {
    return nota >= 6 ? "Aprobado" : "Reprobado";
  }

  function renderizarTabla() {
    tablaBody.innerHTML = "";

    alumnos.forEach(({ nombre, nota }) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${nombre}</td>
        <td>${nota}</td>
        <td>${estadoNota(nota)}</td>
        <td><button class="borrar" data-nombre="${nombre}">Borrar</button></td>
      `;

      tablaBody.appendChild(fila);
    });
  }

  btnAgregar.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    const nota = parseFloat(notaInput.value);

    if (!nombre || isNaN(nota) || nota < 0 || nota > 10) {
      mostrarMensaje("Ingrese un nombre válido y una nota entre 0 y 10", "error");
      return;
    }

    const existe = alumnos.some(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
      mostrarMensaje("El alumno ya está registrado", "info");
      return;
    }

    alumnos.push({ nombre, nota });
    guardarAlumnos(alumnos);
    renderizarTabla();
    mostrarMensaje("Alumno agregado correctamente", "exito");

    nombreInput.value = "";
    notaInput.value = "";
  });

  tablaBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("borrar")) {
      const nombre = e.target.dataset.nombre;
      alumnos = alumnos.filter(a => a.nombre !== nombre);
      guardarAlumnos(alumnos);
      renderizarTabla();
      mostrarMensaje(`Se eliminó a ${nombre}`, "info");
    }
  });

  btnVaciar.addEventListener("click", () => {
    vaciarStorage();
    alumnos = [];
    renderizarTabla();
    mostrarMensaje("Se borraron todos los alumnos", "info");
  });

  async function cargarDatosMock() {
    try {
      const res = await fetch("data/alumnos.json");
      if (!res.ok) throw new Error("Error al cargar datos");
      const data = await res.json();

      data.forEach(a => {
        if (!alumnos.some(al => al.nombre.toLowerCase() === a.nombre.toLowerCase())) {
          alumnos.push(a);
        }
      });

      guardarAlumnos(alumnos);
      renderizarTabla();
    } catch (error) {
      console.error(error);
      mostrarMensaje("No se pudo cargar datos del mock", "error");
    }
  }

  cargarDatosMock();
  renderizarTabla();
});