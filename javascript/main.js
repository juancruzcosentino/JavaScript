const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

// DOM
const form = document.getElementById("formulario");
const nombreInput = document.getElementById("nombre");
const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");
const nota3Input = document.getElementById("nota3");
const listaEstudiantes = document.getElementById("listaEstudiantes");

// Funciones de orden superior
const calcularPromedio = (notas) => notas.reduce((a, b) => a + b, 0) / notas.length;

function agregarEstudiante(nombre, notas) {
    const promedio = calcularPromedio(notas);
    const estado = promedio >= 6 ? "Aprobado" : "Desaprobado";

    const nuevoEstudiante = { nombre, notas, promedio, estado };
    estudiantes.push(nuevoEstudiante);
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    mostrarEstudiantes();
}

// Mostrar estudiantes (con uso de map)
function mostrarEstudiantes() {
    listaEstudiantes.innerHTML = "";
    estudiantes.map(est => {
        const li = document.createElement("li");
        li.textContent = `📘 ${est.nombre} - Notas: ${est.notas.join(", ")} - Promedio: ${est.promedio.toFixed(2)} - Estado: ${est.estado}`;
        listaEstudiantes.appendChild(li);
    });
}

// Evento
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const notas = [nota1Input.value, nota2Input.value, nota3Input.value].map(n => parseFloat(n));

    if (nombre && notas.every(n => !isNaN(n))) {
        agregarEstudiante(nombre, notas);
        form.reset();
    } else {
        alert("Por favor complete todos los campos correctamente.");
    }
});

// Botón para borrar todo el storage
document.getElementById("borrarTodo").addEventListener("click", () => {
    localStorage.clear();
    estudiantes.length = 0;
    mostrarEstudiantes();
});

// Botón para filtrar aprobados (uso de filter)
document.getElementById("filtrarAprobados").addEventListener("click", () => {
    const aprobados = estudiantes.filter(e => e.estado === "Aprobado");
    listaEstudiantes.innerHTML = "";
    aprobados.forEach(est => {
        const li = document.createElement("li");
        li.textContent = `✅ ${est.nombre} - Promedio: ${est.promedio.toFixed(2)}`;
        listaEstudiantes.appendChild(li);
    });
});

// Cargar al inicio
mostrarEstudiantes();

