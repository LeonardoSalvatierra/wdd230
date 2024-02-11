const newdate = new Date(document.lastModified);
const year = newdate.getFullYear();
const month = newdate.getMonth() + 1;
const day = newdate.getDate();
const hours = newdate.getHours();
const minutes = newdate.getMinutes();
const seconds = newdate.getSeconds();

let currentDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;


document.querySelector("#time").innerHTML = currentDate;
document.querySelector("#year").innerHTML = year;
