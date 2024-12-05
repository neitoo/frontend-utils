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

        <button id="close-button" class="gallery__close-button" onclick="closeGallery()">
            <svg xmlns="http://www.w3.org/2000/svg" class="gallery__svg" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div class="gallery__container swiper">
            <div class="swiper-button-prev gallery__left-btn">
                <svg width="34px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z" fill="#000000"></path>
                </svg>
            </div>
            <div class="gallery__slides">
                <div class="slide-content slide-modal-gallery">

                    <div class="swiper-wrapper gallery__images">
                    
                    </div>

                </div>
            </div>
            <div class="swiper-button-next gallery__right-btn">
                <svg width="34px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" fill="#000000"></path>
                </svg>
            </div>
        </div>
    </div>
</div>


<script src="{{ 'assets/js/gallery.controller.js'|theme }}"></script>
```

    
```twig
<!-- на картинку добавить onclick="openGallery()"
На родительский блок в котором есть все картинки добавить class="photos" 
На странице, где находятся изображения добавить Swiper


<link
rel="stylesheet"
href="{{ 'assets/css/swiper.css'|theme }}"
/> 

<script src="{{ 'assets/js/Swiper.js'|theme }}"></script> -->

<div class="photos">
    {% for photo in photos %}
        <div>
            <img src="{{ photo | media }}" onclick="openGallery(this)">
        </div>
    {% endfor %}
</div>
    
```

```css
.gallery__modal-container{position:fixed;inset:0;display:none;z-index:110}.gallery__background{position:absolute;inset:0;background-color:var(--black);opacity:0;transition:opacity 0.5s ease}.gallery__modal{position:relative;z-index:24;margin-left:auto;margin-right:auto;width:100%;height:100%}.gallery__container{position:absolute;top:50%;transform:translateY(-50%);margin-left:auto;margin-right:auto;display:flex;width:100vw}.gallery__slides{width:100vw;display:flex;justify-content:center}.slide-modal-gallery{max-width:none;max-height:80vh}@media (min-width:1024px){.slide-modal-gallery{max-width:1024px}}.swiper-zoom-container{width:100%;height:100%;display:flex;justify-content:center}.gallery__image{height:100%;cursor:default;object-fit:contain}.gallery__left-btn,.gallery__right-btn{position:absolute;top:50%;bottom:auto;transform:translateY(-50%);background-color:var(--white);border-radius:10px;width:30px;height:30px;display:none;justify-content:center;align-items:center;border:1px solid var(--black);cursor:pointer;z-index:111}@media (min-width:640px){.gallery__left-btn,.gallery__right-btn{display:flex}}.gallery__left-btn{left:1rem}.gallery__right-btn{right:1rem}.gallery__close-button{width:40px;height:40px;position:absolute;top:1rem;right:1rem;background-color:#b91c1c;color:var(--black);padding:.5rem;border-radius:10px;cursor:pointer}

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