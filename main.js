//import { kutyaLISTA, kutyaKULCS } from "./adat.js";
import { kartyaOsszeallit, tablazatOsszeallit } from "./adatkezeles.js";
//import { thClick } from "./rendezesSzures.js";
//import { rendezBarmiSzerint } from "./rendezSzur.js";
// Ami az inportáláshoz kell:
// az index.html-ben a type="module" attributum használata
// A importálandó függvény, vagy változó neve elé az export kuclsszó
//majd ahova importáljuk, ott az alább látható módon.
//Figyelj a .js kiterjesztésre!
window.addEventListener("load", jsonAdatok);

let kartyak = document.querySelector(".kartyak");
let tablazatSection = document.querySelector(".tablazat");
let tabla = document.querySelector("table");

let kutyaLISTA = [];

function jsonAdatok() {
  let vegpont = "adat.json";
  adatBeolvas(vegpont, init);
}


function adatBeolvas(vegpont, callbackFv) {
  fetch(vegpont, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      callbackFv(data.adatLISTA);
    })
    .catch((err) => console.log(err));
}


function init(data) {
  kutyaLISTA = data;
  console.log(kutyaLISTA)
  for (const kutya of kutyaLISTA) {
    kartyaOsszeallit(kutya, kartyak);
    //tablazatOsszeallit(kutya, tablazatSection); 
  }
}
