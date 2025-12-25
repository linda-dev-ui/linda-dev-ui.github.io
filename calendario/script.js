document.addEventListener('DOMContentLoaded', () => {
    const calendarElement = document.getElementById('advent-calendar');
    const today = new Date();
    const currentDay = today.getDate(); // Día del mes (1-31)
    const currentMonth = today.getMonth(); // Mes (0 para enero, 11 para diciembre)
    const adventMonth = 11; // Diciembre es el mes 11

    // --- MENSAJES PERSONALIZADOS PARA CADA DÍA ---
    // Puedes poner tu imagen de las personas aquí o un enlace a ella
    // como parte del mensaje, o como un fondo en el CSS del message-box.
    // Ejemplo: 'path/to/tu-imagen-de-personas.jpg'
    const personalImagePath = '../img/25.jpg'; // Reemplaza con la ruta de tu imagen


    // --- MENSAJES Y RUTAS DE IMAGEN PARA CADA DÍA (del 1 al 31) ---
    const dailyMessages = {
        1: {
            message: "¡Feliz 1 de diciembre! Que este mes esté lleno de alegría y sorpresas. 🎁 Solo mira a donde estoy y sabras cual es tu relago.",
            imagePath: "../img/25.jpg"
        },
        2: {

            message: "Por más días como los de ayer, por más días como los de hoy, por más días como los de mañana",
            imagePath: "../img/2.jpeg"
        },
        3: {
            message: "Recuerda los pequeños momentos que te hacen feliz y disfrutalos conmigo",
            imagePath: "../img/4.jpeg"
        },
        4: {
            message: "La felicidad no es un destino, es un viaje. ¡Disfruta el camino! 🛣️",
            imagePath: "../img/8.jpeg"
        },
        5: {
            message: "Mi linda, mi linda gracias por todo y ser tan especial conmigo y para mi",
            imagePath: "../img/5.jpeg"
        },
        6: {
            message: "A veces, la magia está justo en frente de ti. Solo tienes que mirar. ✨",
            imagePath: "../img/6.jpeg"
        },
        7: {
            message: "Hoy es un gran día y más porque estamos juntos 🥰❤️ felices meses mi linda, por mas meses juntos",
            imagePath: "../img/7.jpg"
        },
        8: {
            message: "No hay nada que me guste más que ver cómo brillas cuando estás feliz, que nada ni nadie te quite eso porque tambien me lo esta quitando a mi",
            imagePath: "../img/3.jpeg"
        },
        9: {
            message: "A pesar de que llevamos poco tiempo, siento que hemos creado algo muy especial.",
            imagePath: "../img/8.jpeg"
        },
        9: {
            message: "Eres una gran mujer, una gran mamá y una gran persona, y eso me hace muy feliz",
            imagePath: "../img/9.jpeg"
        },
        10: {
            message: "Cree en ti misma. Eres más fuerte de lo que piensas y yo estoy contigo",
            imagePath: "../img/10.jpeg"
        },
        11: {
            message: "El mejor regalo es estar presente en el momento. 🎁",
            imagePath: "../img/11.jpeg"
        },
        12: {
            message: "Nunca imaginé que en tan poco tiempo pudiera sentirme tan cómodo y feliz contigo.",
            imagePath: "../img/12.jpeg"
        },
        13: {
            message: "Gracias por hacerme sentir bien y por todo lo que das de ti misma.",
            imagePath: "../img/13.jpeg"
        },
        14: {
            message: "Un pequeño detalle puede iluminar todo tu día.",
            imagePath: "../img/14.jpeg"
        },
        15: {
            message: "Creo en ti con todo mi corazón, y sé que harás cosas grandiosas porque tienes el poder de lograrlo todo.",
            imagePath: "../img/15.jpeg"
        },
        16: {
            message: "El simple hecho de saber que estás pensando en mí me hace feliz. ",
            imagePath: "../img/16.jpeg"
        },
        17: {
            message: "Aunque llevamos poco tiempo, siento que ya compartimos algo muy único y especial.",
            imagePath: "../img/17.jpeg"
        },
        18: {
            message: "Recuerda que cada paso te acerca a tu meta. 👣",
            imagePath: "../img/18.jpeg"
        },
        19: {
            message: "Cada día me sorprende más lo increíble que eres, en todos los sentidos.",
            imagePath: "../img/19.jpg"
        },
        20: {
            message: "Lo que más me gusta de estar contigo es la conexión que siento",
            imagePath: "../img/20.jpeg"
        },
        21: {
            message: "Lo increíble de ti no es solo tu lindura y vaya que lo eres, sino todo lo que eres por dentro.",
            imagePath: "../img/21.jpeg"
        },
        22: {
            message: "Eres mucho más fuerte de lo que piensas, y cada día me demuestras lo increíble que eres.",
            imagePath: "../img/22.jpeg"
        },
        23: {
            message: "Nunca olvides lo capaz y valiosa que eres. Tienes un brillo único que hace que todo a tu alrededor sea mejor.",
            imagePath: "../img/23.jpeg"
        },
        24: {
            message: "¡Feliz Navidad! Que la paz este contigo y con nosotros siempre. Gracias por ser parte de mi vida y por hacerme tan feliz. Te quiero mucho mi Linda 💖",
            imagePath: "../img/24.jpeg"
        },
        25: {
            message: "¡FELIZ NAVIDAD! Que la paz y el amor llenen tu familia que es el mejor regalo que tenemos. La vida también es un regalo 💖",
            imagePath: "../img/1.jpeg"
        },
        26: {
            message: "El espíritu navideño continúa. ¡A disfrutar los regalos! 🎁",
            imagePath: "../img/26.jpg"
        },
        27: {
            message: "Tómate un descanso y recarga energías para el año nuevo. ☕",
            imagePath: "../img/27.jpeg"
        },
        28: {
            message: "Día de los Inocentes: ¡que nadie te engañe! 😉",
            imagePath: "../img/28.jpg"
        },
        29: {
            message: "Haz un recuento de todas tus bendiciones este año. 🙏",
            imagePath: "../img/29.jpeg"
        },
        30: {
            message: "Últimos días del año. ¿Qué sueños vas a llevarte al 2026? 🥂",
            imagePath: "../img/30.jpg"
        },
        31: {
            message: "¡Feliz Nochevieja! Que el Año Nuevo te traiga todo lo que deseas. 🎉",
            imagePath: "../img/31.jpg"
        }
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
    for (let i = 1; i <= 24; i++) {
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
            return;
        }

        // 2. Si el día NO ha sido abierto (primer clic)
        if (!openedDays[dayNumber]) {

            dayElement.classList.add('opened');

            // 🚨 ¡CÓDIGO CLAVE PARA INSERTAR LA ETIQUETA <img>!
            const dayData = dailyMessages[dayNumber];

            if (dayData && dayData.imagePath) {
                // 1. Crear la etiqueta <img>
                const imgElement = document.createElement('img');
                imgElement.src = dayData.imagePath;
                imgElement.alt = `Contenido del día ${dayNumber}`;
                imgElement.classList.add('day-content-image');

                // 2. Ocultar el número del día original
                dayElement.textContent = '';

                // 3. Insertar la imagen dentro de la cajita
                dayElement.appendChild(imgElement);
            }

            // 4. Limpiar cualquier estilo de fondo en línea si existía
            dayElement.style.backgroundImage = 'none';
            dayElement.style.backgroundColor = 'transparent';

            openedDays[dayNumber] = true;
            localStorage.setItem('adventOpenedDays', JSON.stringify(openedDays));
        }

        // 3. Mostrar el mensaje
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
        const dayData = dailyMessages[dayNumber] || {
            message: "¡Sorpresa! Un mensaje especial para ti.",
            imagePath: personalImagePath // Usa la imagen de las personas por defecto
        };

        // Crear el overlay y la caja de mensaje dinámicamente
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');

        messageBox.innerHTML = `
        <h2>Día ${dayNumber}</h2>
        <p>${dayData.message}</p>
        <!--img src="${dayData.imagePath}" alt="Imagen del Día ${dayNumber}" class="daily-message-image"-->
        <button id="close-message">Aceptar</button>
    `;

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Activar la animación
        setTimeout(() => overlay.classList.add('active'), 10);

        // Evento para cerrar el mensaje
        document.getElementById('close-message').addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
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