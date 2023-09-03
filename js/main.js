
const persons = [
    {personId: 1, lastName: 'Иванов', firstName: 'Иван', patronymicName: 'Иванович', telephone: '0638926217', email: 'ivanov@ivanov.ru'},
    {personId: 2, lastName: 'Петров', firstName: 'Пётр', patronymicName: 'Петрович', telephone: '0988323921', email: 'petrov@petrov.net'},
    {personId: 3, lastName: 'Сидоров', firstName: 'Исидор', patronymicName: 'Исидорович', telephone: '0681127245', email: 'sidorov@gmail.com'},
    {personId: 4, lastName: 'Иванов', firstName: 'Иван', patronymicName: 'Иванович', telephone: '0731127278', email: 'ivan@mail.ru'},
    {personId: 5, lastName: 'Петров', firstName: 'Анатолий', patronymicName: 'Леонидович', telephone: '0981275181', email: 'petrov@hotmail.com'}
];

console.log(persons);

const body = document.querySelector('body');
const personsBox = document.querySelector('.persons-box');
fillWithPersonCards(persons, personsBox);

const inputSearch = document.querySelector('.search label input');
// inputSearch.onchange = function() {
//     console.log(this.value);
// }
inputSearch.oninput = function() {
    // console.log('oninput ' + this.value);
    const personsFiltered = searchFiltered(persons, this.value);
    // console.log(personsFiltered);
    fillWithPersonCards(personsFiltered, personsBox);
}

const buttonSearch = document.querySelector('.button_search');
buttonSearch.onclick = function() {
    const personsFiltered = searchFiltered(persons, inputSearch.value);
    fillWithPersonCards(personsFiltered, personsBox);
}

const buttonAdd = document.querySelector('.button_add');
const buttonDelete = document.querySelector('.button_delete');
const addPersonWindow = document.querySelector('.add-person-window');
const personClose = addPersonWindow.querySelector('.add-person-window__close');
const personInputText = addPersonWindow.querySelectorAll('.input-text');
const buttonAddPerson = addPersonWindow.querySelector('.button_add-person');
const personAlert = addPersonWindow.querySelector('.person__alert');
buttonAdd.onclick = function() {
    // console.log('add click');
    personAlert.innerText = '';
    addPersonWindow.classList.add('add-person-window_show');
}

personClose.onclick = function() {
    // console.log('person close');
    addPersonWindow.classList.remove('add-person-window_show');
}

buttonAddPerson.onclick = function() {
    let fieldsFilled = true;
    for (let i = 0; i < personInputText.length; i++) {
        if (personInputText[i].hasAttribute('name')) {
            if (personInputText[i].getAttribute('name') == 'lastName') {
                // console.log(personInputText[i]);
                if (personInputText[i].value == '') {
                    fieldsFilled = false;
                    personInputText[i].classList.add('empty');
                }
                else {
                    personInputText[i].classList.remove('empty');
                }
            }
            if (personInputText[i].getAttribute('name') == 'firstName') {
                // console.log(personInputText[i]);
                if (personInputText[i].value == '') {
                    fieldsFilled = false;
                    personInputText[i].classList.add('empty');
                }
                else {
                    personInputText[i].classList.remove('empty');
                }
            }
            if (personInputText[i].getAttribute('name') == 'telephone') {
                // console.log(personInputText[i]);
                if (personInputText[i].value == '') {
                    fieldsFilled = false;
                    personInputText[i].classList.add('empty');
                }
                else {
                    personInputText[i].classList.remove('empty');
                }
            }
        }
    }
    // Если необходимые поля заполнены.
    if (fieldsFilled) {
        personAlert.innerText = '';
        personAlert.classList.remove('person__alert_show');
        let person = {
            personId: '', 
            lastName: '', 
            firstName: '', 
            patronymicName: '', 
            telephone: '', 
            email: ''
        };
        const inputLastName = addPersonWindow.querySelector('.person label input[name=lastName]');
        const inputFirstName = addPersonWindow.querySelector('.person label input[name=firstName]');
        const inputPatronymicName = addPersonWindow.querySelector('.person label input[name=patronymicName]');
        const inputTelephone = addPersonWindow.querySelector('.person label input[name=telephone]');
        const inputEmail = addPersonWindow.querySelector('.person label input[name=email]');
        person.lastName = inputLastName.value;
        person.firstName = inputFirstName.value;
        person.patronymicName = inputPatronymicName.value;
        person.telephone = inputTelephone.value;
        person.email = inputEmail.value;
        let maxPersonsId = maxId(persons);
        // Если массив пользователей пустой.
        if (maxPersonsId == -1) {
            person.personId = 1;
        }
        // Если массив пользователей не пустой.
        else {
            person.personId = maxPersonsId + 1;
        }
        persons.push(person);
        addPersonWindow.classList.remove('add-person-window_show');
        inputLastName.value = '';
        inputFirstName.value = '';
        inputPatronymicName.value = '';
        inputTelephone.value = '';
        inputEmail.value = '';
        fillWithPersonCards(persons, personsBox);
    }
    // Если необходимые поля не заполнены.
    else {
        personAlert.innerText = 'Заполните необходимые поля';
        personAlert.classList.add('person__alert_show');
    }
}

buttonDelete.onclick = function() {
    const personCards = personsBox.children;
    // Массив выбранных объектов, которые нужно убрать.
    const personIdArray = [];
    for (let i = 0; i < personCards.length; i++) {
        const cardCheckbox = personCards[i].querySelector('.person-header__item input');
        if (cardCheckbox.checked == true) {
            let idInt = parseInt(personCards[i].dataset.personId)
            personIdArray.push(idInt);
        }
    }
    console.log('checked id');
    console.log(personIdArray);
    for (let i = 0; i < personIdArray.length; i++) {
        if (personIdArray[i] != null) {
            // Списано с 
            // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
            // let arr = [
            //     { name:"string 1", value:"this", other: "that" },
            //     { name:"string 2", value:"this", other: "that" }
            // ];
            // let obj = arr.find(o => o.name === 'string 1');
            // console.log(obj);
            let indexToDelete = persons.findIndex(p => p.personId == personIdArray[i]);
            if (indexToDelete != null) {
                // https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                persons.splice(indexToDelete, 1);
            }
        }
    }
    fillWithPersonCards(persons, personsBox);
}

// Обработка всех onclick body.
body.onclick = function(event) {
    // Закрытие окна add-person-window по клику вне окна person.
    if (event.target.closest('.person') == null) {
        // Если не нажималась кнопка Добавить.
        if (event.target.closest('.button_add') == null) {
            // console.log('Вне окна');
            // Если показано окно person.
            if (addPersonWindow.classList.contains('add-person-window_show') == true) {
                addPersonWindow.classList.remove('add-person-window_show');
            }
        }
    }
}

// Функция заполняет parent контактами.
function fillWithPersonCards(persons, parent) {
    const personCardsMap = persons.map(function(item) {
        return '<div class="person-card" data-person-id="' + item.personId + '">' + 
            '<div class="person-header">' + 
                '<div class="person-header__item person-header__item_checkbox">' +
                    '<input type="checkbox" />' +
                '</div>' +
                '<div class="person-header__item person-header__item_last-name">' + 
                    item.lastName +
                '</div>' +
                '<div class="person-header__item person-header__item_first-name">' + 
                    item.firstName +
                '</div>' +
                '<div class="person-header__item person-header__item_telephone">' + 
                    item.telephone +
                '</div>' +
                '<div class="person-header__item person-header__item_drop-down">' + 
                    '<img src="img/arrow_drop_down.png" alt="drop down" />' +
                '</div>' +
            '</div>' +
            '<div class="person-content">' + 
                '<div class="person-content-item">' + 
                    '<div class="person-content-item__parameter">Фамилия</div>' + 
                    '<div class="person-content-item__value">' +
                        item.lastName +
                    '</div>' +
                '</div>' +
                '<div class="person-content-item">' + 
                    '<div class="person-content-item__parameter">Имя</div>' + 
                    '<div class="person-content-item__value">' +
                        item.firstName +
                    '</div>' +
                '</div>' +
                '<div class="person-content-item">' + 
                    '<div class="person-content-item__parameter">Отчество</div>' + 
                    '<div class="person-content-item__value">' +
                        item.patronymicName +
                    '</div>' +
                '</div>' +
                '<div class="person-content-item">' + 
                    '<div class="person-content-item__parameter">Телефон</div>' + 
                    '<div class="person-content-item__value">' +
                        item.telephone +
                    '</div>' +
                '</div>' +
                '<div class="person-content-item">' + 
                    '<div class="person-content-item__parameter">E-mail</div>' + 
                    '<div class="person-content-item__value">' +
                        item.email +
                    '</div>' +
                '</div>' +
                '<div class="person-content-item person-content-item_buttons">' + 
                    '<button class="button button_call">Позвонить</button>'  +
                    '<button class="button button_hang-up">Завершить</button>'  +
                '</div>' +
                '<div class="calling-window">' + 
                    '<div class="calling-window__text">'+ 
                        'Вызов<br /><span>'+ item.telephone +'</span>'+
                    '</div>' + 
                '</div>' +
            '</div>' +
        '</div>';
    });
    parent.innerText = '';
    for (let i = 0; i < personCardsMap.length; i++) {
        personsBox.innerHTML += personCardsMap[i];
    }
    // Обработка событий onclick.
    const personCards = personsBox.children;
    for (let i = 0; i < personCards.length; i++) {
        const personHeader = personCards[i].querySelector('.person-header');
        personHeader.onclick = function(event) {
            // Если не нажимался checkbox. 
            if (event.target.closest('.person-header__item input') == null) {
                let isShown;
                // console.log('header click');
                const parent = this.parentElement;
                const personContent = parent.querySelector('.person-content');
                if (personContent.classList.contains('person-content_show')) {
                    isShown = true;
                }
                else {
                    isShown = false;
                }
                removeClass(personCards, '.person-content', 'person-content_show');
                if (isShown == false) {
                    personContent.classList.add('person-content_show');
                }
                // else можно не выполнять потому что всё равно все person-content скрыты.
                // else {
                //     personContent.classList.remove('person-content_show');
                // }
            }
        }
        const buttonCall = personCards[i].querySelector('.button_call');
        buttonCall.onclick = function() {
            const parent = this.parentElement.parentElement;
            const callingWindow = parent.querySelector('.calling-window');
            const buttonHangUpLocal = parent.querySelector('.button_hang-up');
            callingWindow.classList.add('calling-window_show');
            this.classList.add('button_call-calling');
            buttonHangUpLocal.classList.add('button_hang-up-calling');
        }
        const buttonHangUp = personCards[i].querySelector('.button_hang-up');
        buttonHangUp.onclick = function() {
            const parent = this.parentElement.parentElement;
            const callingWindow = parent.querySelector('.calling-window');
            const buttonCallLocal = parent.querySelector('.button_call');
            callingWindow.classList.remove('calling-window_show');
            buttonCallLocal.classList.remove('button_call-calling');
            this.classList.remove('button_hang-up-calling');
        }
    }
}

function removeClass(itemsArray, contentSelector, className) {
    for (let i = 0; i < itemsArray.length; i++) {
        const content = itemsArray[i].querySelector(contentSelector);
        content.classList.remove(className);
    }
}

function searchFiltered(persons, query) {
    const personsFiltered = persons.filter(function(item) {
        // Списано с 
        // https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        if(item.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
        if(item.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
        if(item.patronymicName.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
        if(item.telephone.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
        if(item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            return true;
        }
    });
    return personsFiltered;
}

function maxId(persons) {
    let maxId = -1;
    if (persons.length > 0) {
        maxId = persons[0].personId;
    }
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].personId > maxId) {
            maxId = persons[i].personId;
        }
    }
    return maxId;
}
