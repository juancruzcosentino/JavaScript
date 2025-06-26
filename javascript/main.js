const estudiantes = [];

function registrarEstudiante() {
    const nombre = prompt("Ingrese el nombre del estudiante:");

    const primerNota = parseFloat(prompt("Ingrese su primer nota:"));
    const segundaNota = parseFloat(prompt("Ingrese su segunda nota:"));
    const tercerNota = parseFloat(prompt("Ingrese su tercera nota:"));

    const promedio = calcularPromedio(primerNota, segundaNota, tercerNota);

    let estado;
    
    if (promedio >= 6) {
        estado = "Aprobado";
    } else {
        estado = "Desaprobado";
    }

estudiantes.push({ nombre, notas: [primerNota, segundaNota, tercerNota], promedio, estado})

alert(
    `Estudiante: ${nombre} Promedio: ${promedio} Estado: ${estado}`);
}

function calcularPromedio (n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

function iniciarSimulador() {
    let continuar = true;

    while (continuar) {
    registrarEstudiante();
    continuar = confirm("¿Desea registrar otro estudiante?");
    }

    console.log("Lista de estudiantes registrados:");
    console.log(estudiantes);
}

iniciarSimulador();
