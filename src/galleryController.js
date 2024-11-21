let scale = 1; // Начальный масштаб
let lastScale = 1;
let startDistance = 0;
let translateX = 0; // Смещение по X
let translateY = 0; // Смещение по Y
let lastTranslateX = 0;
let lastTranslateY = 0;
let startX = 0;
let startY = 0;

// Открытие галереи
function openGallery(image) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalBg = document.getElementById('modal-bg');

    modalImage.src = image.src;

    modal.style.display = 'block';
    modalImage.style.opacity = '1';
    modalBg.style.opacity = '0.7';

    // Сброс масштаба и позиции при открытии
    modalImage.style.transform = 'translate(0, 0) scale(1)';
    scale = 1;
    lastScale = 1;
    translateX = 0;
    translateY = 0;
    lastTranslateX = 0;
    lastTranslateY = 0;
}

// Закрытие галереи
function closeGallery() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalBg = document.getElementById('modal-bg');

    modalImage.style.opacity = '0';
    modalBg.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
        modalImage.style.opacity = '1';
    }, 200);
}

// Вспомогательная функция для вычисления расстояния между двумя точками
function getDistance(touch1, touch2) {
    const deltaX = touch1.pageX - touch2.pageX;
    const deltaY = touch1.pageY - touch2.pageY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Вспомогательная функция для ограничения смещения
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Обработчики для жестов
const modalImage = document.getElementById('modal-image');

// Начало перемещения или масштабирования
modalImage.addEventListener('touchstart', function (event) {
    if (event.touches.length === 2) {
        startDistance = getDistance(event.touches[0], event.touches[1]);
        lastScale = scale;
    } else if (event.touches.length === 1 && scale > 1) {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    }
});

// Обработка перемещения или масштабирования
modalImage.addEventListener('touchmove', function (event) {
    event.preventDefault();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imageWidth = modalImage.offsetWidth * scale;
    const imageHeight = modalImage.offsetHeight * scale;

    if (event.touches.length === 2) {
        // Масштабирование
        const currentDistance = getDistance(event.touches[0], event.touches[1]);
        const newScale = lastScale * (currentDistance / startDistance);
        scale = Math.max(1, newScale); // Минимальный масштаб — 1

        if (scale < lastScale) {
            // Если масштаб уменьшается, сбрасываем смещение
            translateX = 0;
            translateY = 0;
        }

        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    } else if (event.touches.length === 1 && scale > 1) {
        // Перемещение
        const deltaX = event.touches[0].pageX - startX;
        const deltaY = event.touches[0].pageY - startY;
        translateX = lastTranslateX + deltaX;
        translateY = lastTranslateY + deltaY;

        // Ограничение смещения
        const maxTranslateX = Math.max(0, (imageWidth - screenWidth) / 2);
        const maxTranslateY = Math.max(0, (imageHeight - screenHeight) / 2);

        translateX = clamp(translateX, -maxTranslateX, maxTranslateX);
        translateY = clamp(translateY, -maxTranslateY, maxTranslateY);

        modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
});

// Сброс координат при окончании жеста
modalImage.addEventListener('touchend', function () {
    if (scale === 1) {
        translateX = 0;
        translateY = 0;
        modalImage.style.transform = `translate(0, 0) scale(1)`;
    }
});

// Закрытие при клике на фон
document.getElementById('modal-bg').addEventListener('click', closeGallery);

document.querySelector('.gallery__modal').addEventListener('click', function (event) {
    const target = event.target;

    // Проверяем, не было ли нажатие на кнопки навигации или само изображение
    if (!target.classList.contains('gallery__image') && 
        !target.closest('.gallery__slide') && 
        !target.closest('.gallery__close-button')) {
        closeGallery();
    }
});


function searchImagesInBlock(image) {
    const photosBlock = image.closest("#photos"); // Находим родительский блок с id "photos"
    if (photosBlock) {
        const images = Array.from(photosBlock.querySelectorAll("img")); // Получаем все картинки в этом блоке
        const modalImage = document.getElementById("modal-image"); // Изображение в модальном окне
        const slideButtons = document.querySelectorAll(".gallery__slide"); // Кнопки навигации

        // Индекс текущего изображения
        let currentIndex = images.findIndex(img => img.src === image.src);

        // Показываем/скрываем кнопки в зависимости от количества изображений
        if (images.length > 1) {
            slideButtons.forEach(button => {
                button.style.display = "flex"; // Показываем кнопки
            });
        } else {
            slideButtons.forEach(button => {
                button.style.display = "none"; // Скрываем кнопки
            });
        }

        // Навигация по слайдам
        function updateImage(direction) {
            if (direction === "next") {
                currentIndex = (currentIndex + 1) % images.length; // Следующее изображение
            } else if (direction === "prev") {
                currentIndex = (currentIndex - 1 + images.length) % images.length; // Предыдущее изображение
            }
            modalImage.src = images[currentIndex].src; // Обновляем изображение
        }

        // Обработчики для кнопок
        document.querySelector(".slide_right").addEventListener("click", () => updateImage("next"));
        document.querySelector(".slide_left").addEventListener("click", () => updateImage("prev"));

        // Устанавливаем начальное изображение в модальном окне
        modalImage.src = image.src;
    } else {
        console.log("Блок с id 'photos' не найден для данной картинки.");
    }
}

// Пример использования:
document.querySelectorAll("#photos img").forEach(img => {
    img.addEventListener("click", function () {
        searchImagesInBlock(this); // Вызываем функцию при клике на картинку
    });
});

