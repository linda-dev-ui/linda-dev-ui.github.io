document.addEventListener('DOMContentLoaded', () => {
    const album = document.getElementById('photo-album');

    // 1. DEFINE TUS FOTOS AQUÍ
    // Reemplaza 'path/to/...' con las rutas reales de tus imágenes.
    const photoUrls = [
        'img/1.jpeg',

'img/2.jpeg',

'img/3.jpeg',

'img/4.jpeg',

'img/5.jpeg',

'img/6.jpeg',

'img/7.jpeg',

'img/8.jpeg',

'img/9.jpeg',

'img/10.jpeg',

'img/11.jpeg',

'img/12.jpeg',

'img/13.jpeg',

'img/14.jpeg',

'img/15.jpeg',

'img/16.jpeg',

'img/17.jpeg',

'img/18.jpeg',

'img/19.jpeg',

'img/20.jpeg',

'img/21.jpeg',

'img/22.jpeg',

'img/23.jpeg',

'img/24.jpeg',

        // ... (agrega tantas fotos como quieras, se recomienda un máximo de 20-30 para rendimiento)
        
    ];

    let maxZIndex = 10; // Contador para el apilamiento (z-index)

    // Función para obtener un número aleatorio dentro de un rango
    const getRandom = (min, max) => Math.random() * (max - min) + min;

    // 2. CREAR Y POSICIONAR LAS FOTOS ALEATORIAMENTE
    photoUrls.forEach(url => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';

        const img = document.createElement('img');
        img.src = url;
        // Evita que el navegador arrastre la imagen en lugar del div
        img.draggable = false; 

        photoItem.appendChild(img);
        album.appendChild(photoItem);

        // Tamaños aleatorios para variedad
        const size = getRandom(150, 300); // Tamaño entre 150px y 300px
        photoItem.style.width = `${size}px`;
        photoItem.style.height = `${size * getRandom(0.7, 1.3)}px`; // Altura ligeramente aleatoria

        // Posición inicial aleatoria (utilizando % del viewport para que funcione en cualquier pantalla)
        const left = getRandom(0, 80); // 0% al 80% del ancho
        const top = getRandom(0, 80);  // 0% al 80% de la altura
        photoItem.style.left = `${left}vw`;
        photoItem.style.top = `${top}vh`;

        // Rotación aleatoria (-20 grados a +20 grados)
        const rotation = getRandom(-20, 20);
        photoItem.style.transform = `rotate(${rotation}deg)`;

        // Asignar z-index inicial para el apilamiento
        photoItem.style.zIndex = Math.floor(getRandom(10, 50));
    });

    // 3. FUNCIONALIDAD DE ARRASTRE (DRAG AND DROP)
    const photoItems = document.querySelectorAll('.photo-item');
    let activeItem = null;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let isDragging = false; // Variable clave para detectar si hubo movimiento

    // Eventos para Mouse
    album.addEventListener('mousedown', dragStart, false);
    album.addEventListener('mouseup', dragEnd, false);
    album.addEventListener('mousemove', drag, false);

    // Eventos para Touch (Celulares/Tablets)
    album.addEventListener('touchstart', dragStart, false);
    album.addEventListener('touchend', dragEnd, false);
    album.addEventListener('touchmove', drag, false);
    
    // Función auxiliar para obtener las coordenadas del evento
    function getCoords(e) {
        if (e.type.includes('touch')) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        } else {
            return { x: e.clientX, y: e.clientY };
        }
    }

    function dragStart(e) {
        const targetPhoto = e.target.closest('.photo-item');
        if (!targetPhoto) return;
        
        activeItem = targetPhoto;
        isDragging = false; // Reinicia el estado de arrastre
        
        const coords = getCoords(e);
        initialX = coords.x;
        initialY = coords.y;

        // 1. SUBIR AL TOPE (z-index)
        maxZIndex++;
        activeItem.style.zIndex = maxZIndex;
        activeItem.classList.add('dragging');

        // 2. Cálculo del Offset (distancia desde el borde al clic)
        const currentLeft = parseFloat(activeItem.style.left) || 0;
        const currentTop = parseFloat(activeItem.style.top) || 0;
        
        // Convertir % de vw/vh a px si se usaron en el posicionamiento inicial
        const leftValue = activeItem.style.left.includes('vw') ? 
                          (parseFloat(activeItem.style.left) / 100) * window.innerWidth : 
                          currentLeft;
                          
        const topValue = activeItem.style.top.includes('vh') ? 
                         (parseFloat(activeItem.style.top) / 100) * window.innerHeight : 
                         currentTop;

        xOffset = initialX - leftValue;
        yOffset = initialY - topValue;

        // Evita el arrastre nativo del navegador en dispositivos touch
        if (e.type === 'touchstart') {
            e.preventDefault(); 
        }
    }

    function dragEnd(e) {
        if (!activeItem) return;
        
        activeItem.classList.remove('dragging');
        
        // Si no hubo movimiento significativo, simplemente fue un clic.
        if (!isDragging) {
            // No hacemos nada más que mantener la foto en el tope de la pila.
            // Si quieres que el clic haga algo más (ej. zoom), lo añadirías aquí.
        }

        activeItem = null;
        isDragging = false;
    }

    function drag(e) {
        if (!activeItem) return;

        // 3. Obtener coordenadas actuales
        const coords = getCoords(e);
        currentX = coords.x;
        currentY = coords.y;
        
        // Si el movimiento es mayor a 5px, lo consideramos un arrastre
        if (Math.abs(currentX - initialX) > 5 || Math.abs(currentY - initialY) > 5) {
            isDragging = true;
        }

        // 4. Calcular nueva posición
        const newX = currentX - xOffset;
        const newY = currentY - yOffset;
        
        // 5. Aplicar la nueva posición (usando 'px' para arrastre fluido)
        
        // Mantiene la rotación anterior
        const currentTransform = activeItem.style.transform.match(/rotate\(([^)]+)\)/);
        const rotation = currentTransform ? currentTransform[1] : '0deg';
        
        // Aplicar posición y rotación
        activeItem.style.left = newX + 'px';
        activeItem.style.top = newY + 'px';
        activeItem.style.transform = `translate(0, 0) rotate(${rotation})`;
        
        // Evita el scroll o arrastre nativo mientras se mueve la foto
        e.preventDefault(); 
    }
    


    // --- CÓDIGO PARA EL EFECTO DE PARTÍCULAS ---

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 1. Tamaño aleatorio
        const size = getRandom(5, 20); // Entre 5px y 20px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // 2. Posición X aleatoria (de extremo a extremo de la pantalla)
        const left = getRandom(0, 100);
        particle.style.left = `${left}vw`;

        // 3. Profundidad (z-index) aleatoria
        // Las fotos tienen un z-index base de 10-50.
        // Asignaremos un valor que pueda estar debajo (5) o muy por encima (2000).
        const zIndexValue = Math.random() < 0.5 ? 5 : 2000;
        particle.style.zIndex = zIndexValue; 

        // 4. Retraso aleatorio en la animación para que no suban todas juntas
        const delay = getRandom(0, 15); // Retraso entre 0s y 15s
        particle.style.animationDelay = `${delay}s`;

        // 5. Duración aleatoria para que suban a diferentes velocidades
        const duration = getRandom(10, 25); // Duración entre 10s y 25s
        particle.style.animationDuration = `${duration}s`;
        
        album.appendChild(particle);

        // Remover la partícula después de un ciclo para liberar memoria
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000 + 1000); // 1 segundo extra para asegurar que termina
    }

    // Generar un flujo constante de partículas
    const numParticles = 30; // Número de partículas visibles a la vez

    for (let i = 0; i < numParticles; i++) {
        // Llama a createParticle inmediatamente, y luego cada pocos segundos
        createParticle();
        
        // Crea un nuevo ciclo de aparición cada 1-3 segundos
        const interval = getRandom(1000, 3000);
        setInterval(createParticle, interval * numParticles);
    }
    
    // --- FIN DEL CÓDIGO DE PARTÍCULAS ---
});