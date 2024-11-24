require('dotenv').config();
const chalk = require('chalk');
const { error } = require('console');

let city;

readLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = process.env.API_KEY;


if (!apiKey) {
    console.log("API ключ не найден. Пожалуйста, создайте .env файл и укажите свой ключ.");
    process.exit(1);
}

console.log(`Используется API ключ: ${apiKey}`);
function askCity() {
    readLine.question('Какой город вас интересует?: ', (cityName) => {
        if (!cityName){
            console.log('Вы ничего не ввели');
            process.exit(1);
        }
        city = cityName
        
        api_get(city);   
    });
}

async function api_get(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`)
        .then(response => response.json())
        .then(data => {
            console.log(`В городе ${data.name}: \nтемпература ${chalk.white(data.main.temp)}°C \nветер ${chalk.blue(data.wind.speed)} м/c \nпогода: ${chalk.red(data.weather[0].description)}`);
        })
        .catch(error => {
            console.error('Такого города не существует, попробуйте ещё раз.', error);
        });
    
        askCity();
    }



askCity();