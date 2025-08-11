$(document).ready(function () {

  let alumnos = recuperarAlumnos();

  function estadoNota(nota) {
    return nota >= 6 ? "Aprobado" : "Reprobado";
  }

  function renderizarTabla() {
    const filas = alumnos.map(({ nombre, nota }) => `
      <tr>
        <td>${nombre}</td>
        <td>${nota}</td>
        <td>${estadoNota(nota)}</td>
        <td><button class="borrar" data-nombre="${nombre}">Borrar</button></td>
      </tr>
    `).join("");
    $("#tabla-alumnos tbody").html(filas);
  }

  $("#agregar").click(() => {
    const nombre = $("#nombre").val().trim();
    const nota = parseFloat($("#nota").val());

    if (!nombre || isNaN(nota) || nota < 0 || nota > 10) {
      Swal.fire("Error", "Ingrese un nombre válido y una nota entre 0 y 10", "error");
      return;
    }

    const existe = alumnos.some(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    if (existe) {
      Swal.fire("Atención", "El alumno ya está registrado", "warning");
      return;
    }

    alumnos.push({ nombre, nota });
    guardarAlumnos(alumnos);
    renderizarTabla();
    Swal.fire("Éxito", "Alumno agregado correctamente", "success");

    $("#nombre").val("");
    $("#nota").val("");
  });

  $("#tabla-alumnos").on("click", ".borrar", function () {
    const nombre = $(this).data("nombre");
    alumnos = alumnos.filter(a => a.nombre !== nombre);
    guardarAlumnos(alumnos);
    renderizarTabla();
    Swal.fire("Alumno borrado", `Se eliminó a ${nombre}`, "info");
  });

  $("#vaciar-storage").click(() => {
    vaciarStorage();
    alumnos = [];
    renderizarTabla();
    Swal.fire("Storage vacío", "Se borraron todos los alumnos", "info");
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
      Swal.fire("Error", "No se pudo cargar datos del mock", "error");
    }
  }

  cargarDatosMock();
  renderizarTabla();
});