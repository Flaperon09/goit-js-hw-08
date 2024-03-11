import throttle from 'lodash.throttle';

// Константа имени ключа
const DATA_KEY = 'feedback-form-state';

// Создание объекта параметров формы
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

// Слушатель кнопки Submit
refs.form.addEventListener('submit', onFormSubmit);

// Слушатель полей формы. Создаёт объект со значениями полей ввода
// и записывает его в локальное хранилище
refs.form.addEventListener('input', throttle(event => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(DATA_KEY, JSON.stringify(formData));
}, 500));

// Вызов функции заполения полей при перезагрузке
loadForm();

// Функция по нажатию Submit
function onFormSubmit(event) {
    // Запрет действий по умолчанию
    event.preventDefault();

    console.log(formData);
    
    // Очистка формы после отправки
    event.currentTarget.reset();

    // Очистка локального хранилища после отправки
    localStorage.removeItem(DATA_KEY);
};

function loadForm() {
    // Получение строки объекта параметров
    const saveDataStr = localStorage.getItem(DATA_KEY);
    // Преобразование строки к объекту
    const saveData = JSON.parse(saveDataStr);
    // Проверка на существование объекта
    if (saveData) {
        // Если объект есть, в поле email добавить email из локального хранилища
        // или пустую строку
        refs.form.email.value = saveData.email || '';
        // Если объект есть, в поле message добавить message из локального хранилища
        // или пустую строку
        refs.form.message.value = saveData.message || '';
    }
}
