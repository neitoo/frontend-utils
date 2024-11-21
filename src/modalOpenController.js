// Универсальная функция для открытия модального окна
function openModal(modalId, theme = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return; // Проверка на существование модального окна

    modal.show(); // Открываем модальное окно
    const themeInput = modal.querySelector('#theme');
    if(theme) {
        themeInput.value = theme;
    }
    
    // Небольшая задержка, чтобы браузер успел отобразить диалог перед добавлением анимации
    setTimeout(() => {
        const animationblock = modal.querySelector('.animate_fade-up');
        if (animationblock) {
            animationblock.classList.add('animate_fade-up');
        }
    }, 10);

    // Добавляем обработчик клика вне содержимого модального окна
    modal.addEventListener('click', (event) => handleOutsideClick(modal, event));
}

// Обработчик кликов вне модального окна
function handleOutsideClick(modal, event) {
    const contentBlock = modal.querySelector('.container-modal');
    if (!contentBlock.contains(event.target)) {
        closeModal(modal);
    }
}

// Универсальная функция закрытия модального окна с анимацией
function closeModal(modal) {
    if (!modal) return;

    const contentBlock = modal.querySelector('.container-modal');
    const animationblock = modal.querySelector('.animate_fade-up');

    if (contentBlock) {
        animationblock.classList.add('animate_fade-up-reverse');
    }

    // Закрытие модального окна после завершения анимации
    setTimeout(() => {
        modal.close();
        if (animationblock) {
            animationblock.classList.remove('animate_fade-up-reverse'); // Убираем класс после закрытия
        }
    }, 200); // Если это compare modal, закрываем сразу, иначе ждем анимацию
}



// Вызов функций для конкретных окон
function openModalContact(theme) {
    openModal('contactModal',theme);
}
function openReview() {
    openModal('reviewModal');
}

