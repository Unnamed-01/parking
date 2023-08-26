/**
 * +1. Визуальная часть HTML+CSS:
 *  - форма содания машины
 *  - поле отображение парковки
 *  - сама машина
 *  - добавить несколько машин на парковку
 * 
 * +2. Содание машины и её добавление на парковку
 *  - обработка формы
 *  - создание машины
 *  - написать на машине её гос. номер
 *  - добавить машину на страницу в нужные координаты
 * 
 * +3. Сделать уровни парковки
 *  - добавить id кнопок уровней
 *  - выбрать кнопки
 *  - сделать для них события клика
 *  - при клике менять класс active кнопки (classList.remove, classList.add)
 *  - заменить картинку парковки
 *  - при переключении на другой уровень (display: ""), display: none у не активных
 *  - добвлять авто на активный блок
 *      - определить позиции для каждого уровня
 * 
 * +4. Сделать удаление машин
 */

console.log("All right. Let`s start...");

// !__________Выбор полей формы__________!
let number = document.querySelector("input[name=number]");
let color = document.querySelector("input[name=color]");
let type = document.querySelector("select[name=type]");
let place = document.querySelector("select[name=place]");
let btnAdd = document.querySelector("#btn-add");
let btnLvl_1 = document.querySelector("#btn-lvl_1");
let btnLvl_2 = document.querySelector("#btn-lvl_2");
let btnLvl_3 = document.querySelector("#btn-lvl_3");
let parkingImg = document.querySelector("#block-parking img");

let carsBlock_1 = document.querySelector("#cars-1");
let carsBlock_2 = document.querySelector("#cars-2");
let carsBlock_3 = document.querySelector("#cars-3");

let activeLvl = 1;
let occupiedPlaces = [new Array, new Array, new Array];

// console.dir(number);
// console.dir(color);
// console.dir(type);
// console.dir(place);
// console.dir(btnAdd);
// console.dir(btnLvl_1);
// console.dir(btnLvl_2);
// console.dir(btnLvl_3);
// console.dir(parkingImg);

// Заполнение select номерами мест
function addOptions() {
    // console.log("Adding Options");
    place.innerHTML = "";
    switch (activeLvl) {
        case 1:
            for (let i = 0; i < 30; i++) {
                let tempOption = new Option(i + 1, i);
                let dupl = false;
                for (let j = 0; j < occupiedPlaces[activeLvl - 1].length; j++) {
                    if (occupiedPlaces[activeLvl - 1][j] == i)
                        dupl = true;
                }
                if (!dupl)
                    place.append(tempOption);
            }
            break;

        case 2:
            for (let i = 0; i < 36; i++) {
                let tempOption = new Option(i + 1, i);
                let dupl = false;
                for (let j = 0; j < occupiedPlaces[activeLvl - 1].length; j++) {
                    if (occupiedPlaces[activeLvl - 1][j] == i)
                        dupl = true;
                }
                if (!dupl)
                    place.append(tempOption);
            }
            break;

        case 3:
            for (let i = 0; i < 10; i++) {
                let tempOption = new Option(i + 1, i);
                let dupl = false;
                for (let j = 0; j < occupiedPlaces[activeLvl - 1].length; j++) {
                    if (occupiedPlaces[activeLvl - 1][j] == i)
                        dupl = true;
                }
                if (!dupl)
                    place.append(tempOption);
            }
            break;
    }
}
addOptions();


btnAdd.onclick = function () {
    let info = new Array;

    if (number.value == "") {
        alert("Вы не ввели номер машины. Введите номер машины!");
        return;
    }

    info.push(number.value, color.value, type.value, place.value);

    // console.dir(info);

    createCar(info);
}

btnLvl_1.onclick = function () {
    if (!btnLvl_1.classList.contains("active")) {
        btnLvl_2.classList.remove("active");
        btnLvl_3.classList.remove("active");
        btnLvl_1.classList.add("active")
        activeLvl = 1;
        // console.log("activeLvl was changed to ", activeLvl);
        parkingImg.src = "assets/images/lvl_1.jpg";
        carsBlock_1.style.display = "block";
        carsBlock_2.style.display = "none";
        carsBlock_3.style.display = "none";
        addOptions();
    }
}

btnLvl_2.onclick = function () {
    if (!btnLvl_2.classList.contains("active")) {
        btnLvl_1.classList.remove("active");
        btnLvl_3.classList.remove("active");
        btnLvl_2.classList.add("active")
        activeLvl = 2;
        // console.log("activeLvl was changed to ", activeLvl);
        parkingImg.src = "assets/images/lvl_2.jpg";
        carsBlock_1.style.display = "none";
        carsBlock_2.style.display = "block";
        carsBlock_3.style.display = "none";
        addOptions();
    }
}

btnLvl_3.onclick = function () {
    if (!btnLvl_3.classList.contains("active")) {
        btnLvl_2.classList.remove("active");
        btnLvl_1.classList.remove("active");
        btnLvl_3.classList.add("active")
        activeLvl = 3;
        // console.log("activeLvl was changed to ", activeLvl);
        parkingImg.src = "assets/images/lvl_3.jpg";
        carsBlock_1.style.display = "none";
        carsBlock_2.style.display = "none";
        carsBlock_3.style.display = "block";
        addOptions();
    }
}

// !__________Добавление машины__________!
function getPosition(place) {
    switch (activeLvl) {
        case 1:
            if ((place >= 0) && (place <= 9))
                return { top: "1%", left: place.toString() + (10 - place).toString() + "%" }
            else if ((place >= 10) && (place <= 19)) {
                place -= 10;
                return { top: "25%", left: place.toString() + (10 - place).toString() + "%" }
            }
            else {
                place -= 20;
                return { top: "80%", left: place.toString() + (10 - place).toString() + "%" }
            }

        case 2:
            if ((place >= 0) && (place <= 8))
                return { top: "3%", left: place.toString() + "6%" }
            else if ((place >= 9) && (place <= 17)) {
                place -= 9;
                return { top: "27%", left: place.toString() + "6%" }
            }
            else if ((place >= 18) && (place <= 26)) {
                place -= 18;
                return { top: "54%", left: place.toString() + "6%" }
            }
            else {
                place -= 27;
                return { top: "77%", left: place.toString() + "6%" }
            }

        case 3:
            if ((place >= 0) && (place <= 4))
                return { top: "12%", left: (9 + (place * 8.7)).toString() + "%" }
            else {
                place -= 5
                return { top: "76%", left: (9 + (place * 8.7)).toString() + "%" }
            }
    }
}

function getPlace(positionLeft, positionTop) {
    // console.log("getPlace\nPos Left: ", positionLeft, "\nPos Top: ", positionTop);
    positionLeft = parseInt(positionLeft);
    switch (activeLvl) {
        case 1:
            if (positionLeft == 10)
                positionLeft = 0;
            // console.log("Pos Left: ", positionLeft, "\nPos Top: ", positionTop);
            if (positionTop == "1%")
                return parseInt(positionLeft / 10);
            else if (positionTop == "25%")
                return parseInt(positionLeft / 10) + 10;
            else /*if (positionTop == "80%")*/
                return parseInt(positionLeft / 10) + 20;

        case 2:
            // console.log("Pos Left: ", positionLeft, "\nPos Top: ", positionTop);
            if (positionTop == "3%")
                // console.log("return: ", parseInt(positionLeft / 10));
                return parseInt(positionLeft / 10);
            else if (positionTop == "27%")
                // console.log("return: ", parseInt(positionLeft / 10) + 9);
                return parseInt(positionLeft / 10) + 9;
            else if (positionTop == "54%")
                // console.log("return: ", parseInt(positionLeft / 10) + 18);
                return parseInt(positionLeft / 10) + 18;
            else
                // console.log("return: ", parseInt(positionLeft / 10) + 27);
                return parseInt(positionLeft / 10) + 27;

        case 3:
            // console.log("Pos Left: ", positionLeft, "\nPos Top: ", positionTop);
            if (positionTop == "12%")
                // console.log("return: ", parseInt(positionLeft / 10));
                return parseInt(positionLeft / 10);
            else
                // console.log("return: ", parseInt(positionLeft / 10) + 27);
                return parseInt(positionLeft / 10) + 5;
    }
}

function invertColor(color) {
    return "#" + (parseInt(color.slice(1), 16) ^ 0xFFFFFF | 0x1000000).toString(16).substring(1);
}

// console.dir(carsBlock_1);

function createCar(carInfo) {
    let carPosition = getPosition(carInfo[3]);
    let newCar = '<div class="car type-' + carInfo[2] + '" style="top: ' + carPosition.top + '; left: ' + carPosition.left + '; background: ' + carInfo[1] + '">\n<div class="head"></div>\n<div class="middle"><p style="color: ' + invertColor(carInfo[1]) + '">' + carInfo[0] + '</p></div>\n<div class="footer"></div>\n</div>';

    switch (activeLvl) {
        case 1:
            carsBlock_1.innerHTML += newCar;
            break;
        case 2:
            carsBlock_2.innerHTML += newCar;
            break;
        case 3:
            carsBlock_3.innerHTML += newCar;
            break;
    }

    // place.removeChild(place.querySelector("[value='" + carInfo[3] + "']"));
    occupiedPlaces[activeLvl - 1].push(carInfo[3]);
    number.value = "";
    addOptions();
}

// !__________Удаление машины__________!
function deleteCar(element) {
    if (element.parentElement.classList.contains("car")) {
        if (confirm("Удалить машину с парковки?")) {
            releasePlace = occupiedPlaces[activeLvl - 1].indexOf(getPlace(element.parentElement.style.left, element.parentElement.style.top).toString());
            // console.log("occupiedPlaces = ", occupiedPlaces);
            if (releasePlace >= 0)
                occupiedPlaces[activeLvl - 1].splice(releasePlace, 1);
            // console.log("occupiedPlaces aft del = ", occupiedPlaces);
            element.parentElement.remove();
            addOptions();
        }
    }
}

carsBlock_1.onclick = function (event) {
    // console.dir(element);
    deleteCar(event.target);
}
carsBlock_2.onclick = function (event) {
    // console.dir(element);
    deleteCar(event.target);
}
carsBlock_3.onclick = function (event) {
    // console.dir(element);
    deleteCar(event.target);
}