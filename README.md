# Сборник скриптов для сайтов

## Описание
Этот репозиторий содержит JavaScript-скрипты, предназначенные для управления различными элементами пользовательского интерфейса на сайте. Каждый скрипт является независимым модулем и отвечает за определённую функциональность, такую как открытие модальных окон, управление галереей, обработка попапов и многое другое.



## Структура репозитория
- README.md # Документация по репозиторию 
- src/ # Исходные файлы скриптов 
    - galleryController.js # Скрипт для управления модальными окнами 
    - modalOpenController.js # Скрипт для управления галереей
    - phoneMask.js # Скрипт для управления галереей


## Использование скриптов

### **[galleryController.js](src/galleryController.js)**

> Скрипт открытия картинки в модальном окне. Если в родительском блоке есть несколько изображений, позволяет листать их.


    
<details>
<summary>Пример использования</summary>

```html
<!-- Верстка модального окна -->

<div id="modal" class="gallery__modal-container">
    <div id="modal-bg" class="gallery__background"></div>
    <div class="gallery__modal">
        <div class="gallery__images">
            <img id="modal-image" class="gallery__image" src="" alt="">
        </div>

        <button class="gallery__slide slide_left">
            ...svg картинка (кнопка влево)
        </button>
        <button class="gallery__slide slide_right">
            ...svg картинка (кнопка вправо)
        </button>

        <button id="close-button" class="gallery__close-button" onclick="closeGallery()">
            ...svg картинка (закрытие)
        </button>
    </div>
</div>

<script src="{{ 'assets/js/gallery.controller.js'|theme }}"></script>
```

    
```twig
<!-- на картинку добавить onclick="openGallery(this) -->
<!-- На родительский блок в котором есть все картинки добавить class="photos" -->
<div class="photos">
    {% for photo in photos %}
        <div>
            <img src="{{ photo | media }}" onclick="openGallery(this)">
        </div>
    {% endfor %}
</div>
    
```

```css
.gallery__modal-container{position:fixed;inset:0;display:none;z-index:110}.gallery__background{position:absolute;inset:0;background-color:var(--black);opacity:0;transition:opacity 0.5s ease}.gallery__modal{position:relative;z-index:24;margin-left:auto;margin-right:auto;width:100%;height:100%}.gallery__images{width:100%;height:100%;display:flex;justify-content:center;align-items:center;padding:0}@media (min-width:768px){.gallery__images{padding:2rem}}.gallery__image{max-height:100%;width:100vw;cursor:default;object-fit:contain}@media (min-width:768px){.gallery__image{width:80vw}}@media (min-width:1280px){.gallery__image{width:60vw}}.gallery__slide{position:absolute;top:auto;bottom:1rem;transform:translateY(0);background-color:var(--white);border-radius:9999px;width:40px;height:40px;display:none;justify-content:center;align-items:center;border:1px solid var(--black);cursor:pointer;z-index:111}@media (min-width:768px){.gallery__slide{top:50%;bottom:auto;transform:translateY(-50%)}}.gallery__slide.slide_left{left:1rem}.gallery__slide.slide_right{right:1rem}.gallery__close-button{width:40px;height:40px;position:absolute;top:1rem;right:1rem;background-color:var(--white);color:var(--black);padding:.5rem;border-radius:50%;cursor:pointer}

```

</details>

### **[modalOpenController.js](src/modalOpenController.js)**

> Скрипт открытия модального окна (например: форма отправки заявки) с возможностью передачи параметра (например: тема звонка)


    
<details>
<summary>Пример использования</summary>

```javascript
// Вызов функций для конкретных окон (создать свои функции в конце скрипта modalOpenController)

// Аргументами являются id диалогового окна, тема звонка (опционально)

function openModalContact(theme) {
    openModal('contactModal',theme);
}
function openReview() {
    openModal('reviewModal');
}
```

```html
<!-- Кнопка вызова модального окна -->

<button onclick="openModalContact('текст')" type="button">текст</button>
```

```html
<!-- Верстка модального окна -->

<dialog id="contactModal" class="modal">
    <div class="modal__container">
        <div class="modal__content container-modal">
            <div class="modal__main animate_fade-up">
                <div class="modal__close">
                    <button type="button" class="modal__close-button" onclick="closeModal(document.getElementById('contactModal'))">
                        ...svg картинка (закрытие)
                    </button>
                </div>
                <form
                    <input type="hidden" name="info:Тема формы" id="theme" value='Заказ звонка'>
                </form>
                
            </div>
        </div>
    </div>
</dialog>
```

```css
.modal{position:fixed!important;top:0px!important;left:0px!important;right:0px!important;bottom:0px!important;z-index:100!important;height:100%!important;width:100%!important;background-color:rgb(0 0 0 / .4)!important}.modal__container{overflow-y:auto;display:flex;width:100%;height:100%;justify-content:center;align-items:center}.modal__content{max-width:80rem;margin-left:auto;margin-right:auto;padding-top:3rem;padding-bottom:3rem;padding-left:1rem;padding-right:1rem}.modal__main{max-width:25rem;box-shadow:0 10px 15px -3px rgb(0 0 0 / .1),0 4px 6px -4px rgb(0 0 0 / .1);margin-left:auto;margin-right:auto;padding-top:2rem;padding-bottom:2rem;padding-left:1rem;padding-right:1rem;border-radius:5px;z-index:120;position:relative;background-color:var(--white);text-align:left;display:flex;flex-direction:column;gap:1rem;align-items:center}@keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-down{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(20px)}}.animate_fade-up{animation:fade-up 0.2s both}.animate_fade-up-reverse{animation:fade-down 0.2s both}.modal__close{display:flex;justify-content:space-between;width:100%}.form_mini{display:flex;flex-direction:column;width:100%;gap:1rem;color:var(--black)}
```

</details>


### **[phoneMask.js](src/phoneMask.js)**

> Скрипт маски для инпута номера телефона в формате +7(xxx)xxx-xx-xx

> [!NOTE]
> Поддерживает ввод номера начинающегося с +7(9...

> [!WARNING]
> Убирает из поля ввода номер имеющий одинаковые цифры (+79999999999)

    
<details>
<summary>Пример использования</summary>

```html
<!-- Инпут ввода номера телефона -->

<input type="tel" name="phone" required pattern="[\+]{1}[7]{1}[\(]{1}[9]{1}[0-9]{2}[\)]{1}[0-9]{3}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2}" placeholder="+7 (___) ___ __ __">
```


</details>