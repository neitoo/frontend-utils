let modalSwiper = null;

// Открытие галереи
function openGallery(clickedImage) {
    const modal = document.getElementById('modal');
    const modalBg = document.getElementById('modal-bg');

    modal.style.display = 'block';
    modalBg.style.opacity = '0.7';

    // Вызываем функцию для заполнения галереи
    populateModalGallery(clickedImage);
}

// Закрытие галереи
function closeGallery() {
    const modal = document.getElementById('modal');
    const modalBg = document.getElementById('modal-bg');

    modalBg.style.opacity = '0';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);
}

// Закрытие при клике на фон
document.getElementById('modal-bg').addEventListener('click', closeGallery);

document.querySelector('.gallery__modal').addEventListener('click', function (event) {
    const target = event.target;

    // Проверяем, не было ли нажатие на кнопки навигации или само изображение
    if (!target.closest('.slide-modal-gallery') && 
        !target.closest('.gallery__close-button') &&
        !target.closest('.gallery__left-btn') &&
        !target.closest('.gallery__right-btn')) {
        closeGallery();
    }
});

// Заполнение галереи
function populateModalGallery(clickedImage) {
    const modalGallery = document.querySelector('.gallery__images');

    if (!modalGallery || !clickedImage) {
        console.error('Модальное окно или нажатое изображение не найдены.');
        return;
    }

    // Находим родительский блок с классом photos
    const photosBlock = clickedImage.closest('.photos');

    if (!photosBlock) {
        console.error('Родительский блок с классом "photos" не найден.');
        return;
    }

    modalGallery.innerHTML = ''; // Очищаем галерею

    const images = photosBlock.querySelectorAll('img');
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        // Создаем контейнер для зума
        const zoomContainer = document.createElement('div');
        zoomContainer.classList.add('swiper-zoom-container');

        const modalImage = document.createElement('img');
        modalImage.src = image.src;
        modalImage.alt = image.alt || `Image ${index + 1}`;
        modalImage.classList.add('gallery__image');

        zoomContainer.appendChild(modalImage); // Добавляем изображение в контейнер зума
        slide.appendChild(zoomContainer); // Добавляем контейнер зума в слайд
        modalGallery.appendChild(slide); // Добавляем слайд в галерею
    });

    console.log(`${images.length} картинок добавлено в модальное окно.`);

    // Пересоздаем Swiper
    initializeModalSwiper();
}

// Инициализация Swiper с поддержкой зума
function initializeModalSwiper() {
    if (modalSwiper) {
        modalSwiper.destroy(true, true); // Уничтожаем старый экземпляр Swiper
    }

    modalSwiper = new Swiper('.slide-modal-gallery', {
        speed: 500,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 25,
        navigation: {
            nextEl: '.gallery__right-btn',
            prevEl: '.gallery__left-btn',
        },
        zoom: { // Включаем модуль зума
            maxRatio: 3, // Максимальный уровень зума
            minRatio: 1, // Минимальный уровень зума
            toggle: true, // Зум по двойному нажатию
        },
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#modal').addEventListener('show', function () {
        // Галерея будет заполняться при вызове openGallery
    });
});