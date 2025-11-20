document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('advent-calendar');
    const today = new Date();
    const currentDay = today.getDate(); // Día del mes (1-31)
    const currentMonth = today.getMonth(); // Mes (0 para enero, 11 para diciembre)
    const adventMonth = 10; // Diciembre es el mes 11

    // --- MENSAJES PERSONALIZADOS PARA CADA DÍA ---
    // Puedes poner tu imagen de las personas aquí o un enlace a ella
    // como parte del mensaje, o como un fondo en el CSS del message-box.
    // Ejemplo: 'path/to/tu-imagen-de-personas.jpg'
    const personalImagePath = '../img/25.jpg'; // Reemplaza con la ruta de tu imagen

    const dailyMessages = {
        1: "¡Feliz 1 de diciembre! Que este mes esté lleno de alegría y sorpresas. 🎁",
        2: "Un nuevo día, una nueva oportunidad para sonreír. 😊",
        3: "Recuerda los pequeños momentos que te hacen feliz.",
        4: "Hoy es un buen día para dar las gracias. 🙏",
        5: "¡Casi fin de semana! Sigue adelante con tu energía.",
        6: "Piensa en un deseo navideño, ¡podría cumplirse!",
        7: "Tiempo para relajarse y disfrutar del presente.",
        8: "Hoy brilla con tu propia luz. ✨",
        9: "Un abrazo virtual para ti. 🤗",
        10: "Recuerda que eres increíble tal como eres.",
        11: "La magia de la Navidad ya se siente en el aire.",
        12: "Hoy es un buen día para ser creativo.",
        13: "Un pensamiento positivo para empezar el día.",
        14: "¡Ya casi llega la Nochebuena! 🎉",
        15: "Mitad de mes, ¡sigue con ese espíritu navideño!",
        16: "Un dulce deseo de felicidad para ti.",
        17: "Prepara tu corazón para la magia que viene.",
        18: "Hoy es un buen día para una taza de chocolate caliente.",
        19: "La cuenta regresiva final ha comenzado.",
        20: "Casi en Navidad, ¡qué emoción!",
        21: "Los días más cortos traen las noches más acogedoras.",
        22: "Un momento para reflexionar y soñar.",
        23: "La víspera de Nochebuena, ¡a celebrar!",
        24: "¡Feliz Nochebuena! Que la pases genial. 🌟",
        25: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        26: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        27: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        28: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        29: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        30: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        31: "¡FELIZ NAVIDAD! Que la alegría te acompañe siempre. 🎅",
        // Puedes añadir más mensajes hasta el día 31 si lo deseas, o dejar un mensaje genérico
    };

    // Recuperar el estado de las cajitas abiertas de localStorage
    const openedDays = JSON.parse(localStorage.getItem('adventOpenedDays')) || {};
// --- CONFIGURACIÓN MANUAL DE TAMAÑOS DE CAJITAS ---
// Define la clase de tamaño ('size-small', 'size-medium', 'size-large') 
// y las clases de expansión ('span-2-col', 'span-2-row', 'span-1-col' (por defecto))

   const customSizes = {
    1: { size: 'size-large', span: 'span-2-col' },
    2: { size: 'size-small', span: '' },
    3: { size: 'size-medium', span: '' },
    4: { size: 'size-small', span: '' },
    5: { size: 'size-large', span: '' },
    6: { size: 'size-medium', span: '' },
    7: { size: 'size-small', span: 'span-2-col' },
    8: { size: 'size-large', span: 'span-2-row' },
    9: { size: 'size-medium', span: '' },
    10: { size: 'size-small', span: 'span-2-col' },
    11: { size: 'size-medium', span: '' },
    12: { size: 'size-large', span: 'span-2-col' },
    13: { size: 'size-small', span: '' },
    14: { size: 'size-medium', span: '' },
    15: { size: 'size-small', span: 'span-2-row' },
    16: { size: 'size-large', span: 'span-2-row' },
    17: { size: 'size-medium', span: '' },
    18: { size: 'size-small', span: '' },
    19: { size: 'size-large', span: '' },
    20: { size: 'size-medium', span: 'span-2-col' },
    21: { size: 'size-small', span: '' },
    22: { size: 'size-medium', span: 'span-2-row' },
    23: { size: 'size-large', span: '' },
    24: { size: 'size-medium', span: '' },
    25: { size: 'size-large', span: 'span-2-col' },
    26: { size: 'size-small', span: 'span-2-row' },
    27: { size: 'size-medium', span: 'span-2-col' },
    28: { size: 'size-small', span: '' },
    29: { size: 'size-medium', span: '' },
    30: { size: 'size-medium', span: '' },
    31: { size: 'size-large', span: 'span-3-col' }
};
// --- Generar las cajitas del calendario (Fragmento Fijo) ---
for (let i = 1; i <= 31; i++) { 
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.textContent = i;
    dayElement.dataset.day = i; 

    // Obtener la configuración de tamaño fija para este día
    const config = customSizes[i] || { size: 'size-medium', span: '' }; // Usa tamaño mediano si no está definido

    // Aplicar la clase de tamaño
    dayElement.classList.add(config.size);

    // Aplicar la clase de expansión (span-2-col, span-2-row, o nada)
    if (config.span) {
        dayElement.classList.add(config.span);
    }
    
    // 2. Lógica para determinar el estado del día (SIN CAMBIOS)
    const isLocked = (currentMonth !== adventMonth) || (i > currentDay);
    if (isLocked) {
        dayElement.classList.add('locked');
    }

    // Marcar el día actual
    if (currentMonth === adventMonth && i === currentDay) {
        dayElement.classList.add('current-day');
    }

    // Marcar si ya se abrió (persistencia)
    if (openedDays[i]) {
        dayElement.classList.add('opened');
    }

    // 3. Agregar el evento click
    dayElement.addEventListener('click', () => handleDayClick(dayElement, i, isLocked));
    calendarElement.appendChild(dayElement);
}

    function handleDayClick(dayElement, dayNumber, isLocked) {
    // 1. Manejar días BLOQUEADOS (futuros)
    if (isLocked) {
        dayElement.style.animation = 'shake 0.3s';
        setTimeout(() => dayElement.style.animation = '', 300);
        return; // Salir si el día está bloqueado
    }

    // Identificar si es el día actual
    const isCurrent = dayElement.classList.contains('current-day');

    // 2. Si el día NO ha sido abierto (primer clic) Y NO es el día actual
    if (!openedDays[dayNumber] && !isCurrent) { // <-- ¡CAMBIO IMPORTANTE AQUÍ!
        // Abrir por primera vez y marcar como abierto
        dayElement.classList.add('opened');
        openedDays[dayNumber] = true;
        localStorage.setItem('adventOpenedDays', JSON.stringify(openedDays));
    }
    
    // 3. Mostrar el mensaje (Esto se ejecuta en el primer clic Y en los siguientes)
    showMessage(dayNumber);
}

    function openDay(dayElement, dayNumber) {
        // Marcar como abierto
        dayElement.classList.add('opened');
        openedDays[dayNumber] = true;
        localStorage.setItem('adventOpenedDays', JSON.stringify(openedDays));

        // Mostrar el mensaje personalizado
        showMessage(dayNumber);
    }

    // --- Funciones para mostrar el mensaje con overlay ---
    function showMessage(dayNumber) {
        const message = dailyMessages[dayNumber] || "¡Sorpresa! Un mensaje especial para ti.";

        // Crear el overlay y la caja de mensaje dinámicamente
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        messageBox.innerHTML = `
            <h2>Día ${dayNumber}</h2>
            <p>${message}</p>
           
            <button id="close-message">Aceptar</button>
        `;
        
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Activar la animación
        setTimeout(() => overlay.classList.add('active'), 10); // Pequeño delay para la transición

        // Evento para cerrar el mensaje
        document.getElementById('close-message').addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300); // Remover después de la transición
        });
    }

    // --- Animación de "shake" (opcional para CSS) ---
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});