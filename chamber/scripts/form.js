// ************* formulario *************

document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al elemento de entrada oculta
    const formLoadedInput = document.getElementById('form-loaded');

    // Obtener la fecha y hora actual en milisegundos
    const currentDateTime = Date.now();

    // Establecer el valor del campo oculto con la fecha y hora actual
    formLoadedInput.value = currentDateTime;
});