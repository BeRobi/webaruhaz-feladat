import { kutyaLISTA, kutyaKULCS } from "./adat.js";
import { kartyaOsszeallit, tablazatOsszeallit } from "./adatkezeles.js";
import { thClick, rendez } from "./rendezesSzures.js";
// Ami az inportáláshoz kell:
// az index.html-ben a type="module" attributum használata
// A importálandó függvény, vagy változó neve elé az export kuclsszó
//majd ahova importáljuk, ott az alább látható módon.
//Figyelj a .js kiterjesztésre!
window.addEventListener("load", init);

let kartyak = document.querySelector(".kartyak");
let tablazatSection = document.querySelector(".tablazat");
let tabla = document.querySelector(".tabla");

function init() {
  
  for (const kutya of kutyaLISTA) {
    kartyaOsszeallit(kutya, kartyak);
    tablazatOsszeallit(kutya, tablazatSection);
  }

  for (const th of document.querySelectorAll(".aria-sort")) {
    th.addEventListener("click", thClick);
  }

  torlesFunkcio(kutyaLISTA);

  const SUBMIT = document.querySelector("#rogzites");
  SUBMIT.addEventListener("click", ujKutya);
}

function ujKutya() {
  let kutya = {};

  let szuka = document.querySelector("#szuka");
  let kan = document.querySelector("#kan");
  let kuldheto;
  let hibauzenet = "";
  /**szedjük össze az űrlap adatait,
   * és tegyük bele egy objektumba
   * és fűzzük hozá a KUTYALISTA-hoz
   */
  const NevInputElem = document.querySelector("#kneve");
  const FajInputElem = document.querySelector("#kfajta");
  const LabInputElem = document.querySelector("#klaba");
  const MagInputElem = document.querySelector("#mmag");
  const KorInputElem = document.querySelector("#kkor");

  //itt is érdemes ellenőrizni, hogy megfelelő-e az adat:
  var filter = /[a-zA-Z]/; //^[A-Z]{2,}$
  if (filter.test(FajInputElem.value)) {
    kutya.nev = NevInputElem.value;
    kutya.fajta = FajInputElem.value;
    kutya.lab = LabInputElem.value;
    kutya.marmagassag = MagInputElem.value;

    document.querySelector("#nevhiba").innerHTML = "";
    kuldheto = true;
  } else {
    kuldheto = false;
    hibauzenet = "A név hiányzik, vagy a formátuma hibás!";
    document.querySelector("#nevhiba").innerHTML = hibauzenet;
  }

  const NemInputElem = document.querySelector("#szuka");
  if (NemInputElem.checked) {
    kutya.nem = "szuka";
  } else {
    kutya.nem = "kan";
  }
  kutya.kor = KorInputElem.value;
  console.log(kutya);
  if (kuldheto) {
    kutyaLISTA.push(kutya);
  }

  kartyaOsszeallit(kutya, kartyak);
  tablazatOsszeallit(kutya, tabla);
  torlesFunkcio(kutyaLISTA);

  console.log(kutyaLISTA);
}

function torlesFunkcio(lista) {
  let TORLES = document.querySelectorAll(".gomb");
  console.log(TORLES)
  for (let i = 0; i < lista.length; i++) {
    let kutya = lista[i];
    // let TABLA = document.querySelectorAll(".kutyaTabla")[i];
    // let KARTYA = document.querySelectorAll(".kutyaKartya")[i];

    TORLES[i].addEventListener("click", torlesClick);
  }
}

function torlesClick(event) {
  let target = event.target;
  let td = target.parentElement;
  let tr = td.parentElement;
  console.log("tr", tr.parentElement)

  var child = td
  var parent = child.parentNode;
  // The equivalent of parent.children.indexOf(child)
  var idx = tr.rowIndex - 1

  console.log("idx", idx, kutyaLISTA[idx])
  let kutya = kutyaLISTA[idx]
  console.log(kutya);
//       let  = target.parentElement.parentElement

  tr.remove();

    let kartya = document.querySelectorAll(".kutyaKartya")[idx];
    kartya.remove()


  // console.log("target", target)
  
  // console.log("target parent", tr)
  //if (document.contains(TORLES)) {TABLA.remove(), KARTYA.remove()}
  // console.log(">>", TABLA.parentElement, KARTYA.parentElement);
  // TABLA.parentElement.removeChild(TABLA);
  // KARTYA.parentElement.removeChild(KARTYA);
  // let index = kutyaLISTA.indexOf(kutya);
  
  console.log(idx);
  kutyaLISTA.splice(idx, 1);

  console.log("kutya", kutya);
  //console.log(index);
  //console.log(kutyaLISTA[i]);
  console.log("kutyalista", kutyaLISTA);
}
