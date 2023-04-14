import { kutyaLISTA, kutyaKULCS } from "./adat.js";
import { osszeallit1, osszeallit2 } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";
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
    osszeallit1(kutya, kartyak);
    osszeallit2(kutya, tablazatSection);
  }

  torlesFunkcio(kutyaLISTA);

  for (const th of document.querySelectorAll(".aria-sort")) {
    th.addEventListener("click", thClick);
  }

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

  osszeallit1(kutya, kartyak);
  osszeallit2(kutya, tabla);
  torlesFunkcio(kutyaLISTA);

  console.log(kutyaLISTA);
}

function torlesFunkcio(lista) {
  for (let i = 0; i < lista.length; i++) {
    let kutya = lista[i];
    let TORLES = document.querySelectorAll(".gomb")[i];
    let TABLA = document.querySelectorAll(".kutyaTabla")[i];
    let KARTYA = document.querySelectorAll(".kutyaKartya")[i];

    TORLES.addEventListener("click", () => {
      //if (document.contains(TORLES)) {TABLA.remove(), KARTYA.remove()}
      TABLA.parentElement.removeChild(TABLA);
      KARTYA.parentElement.removeChild(KARTYA);
      let index = lista.indexOf(kutya);
      lista.splice(index, 1);

      console.log(kutya);
      //console.log(index);
      //console.log(lista[i]);
      console.log(lista);
    });
  }
}

//rendezés by zschopper (thClick, rendez) - https://github.com/zschopper/js_kutya_kartya_tabla_form/blob/main/script.js

function thClick(event) {
  let target = event.target;
  let parent = target.parentNode;
  // hányadik oszlopra kattintottunk (0-tól számolódik)
  let idx = Array.prototype.indexOf.call(parent.children, target);

  // Csak "név", "kor" és a "nem" rendezhető.
  // Ha másik oszlop küldte az eseményt, simán befejezzük a futást,
  // nem változtatunk semmit.

  if (![0, 1, 2, 3, 4, 5].includes(idx)) {
    return;
  }
  let sorted = document.querySelector("[aria-sort]");

  if (sorted) {
    if (sorted == target) {
      if (sorted.ariaSort == "ascending") target.ariaSort = "descending";
      else if (sorted.ariaSort == "descending") target.ariaSort = "ascending";
    } else {
      sorted.removeAttribute("aria-sort");
      target.ariaSort = "ascending";
    }
  } else {
    target.ariaSort = "ascending";
  }
  rendez();
}

function rendez() {
  // a táblázat törzsében lévő sorokat (tr) rendezzük, és adjuk újra hozzá
  // rendezetten a tbody-hoz, ezzel rendezetts lesz a táblázat.
  let tbody = document.querySelector(".tableBody");
  let sorted = document.querySelector("[aria-sort]");
  let sortCol = Array.prototype.indexOf.call(
    sorted.parentNode.children,
    sorted
  );
  let sortDir = sorted.ariaSort == "ascending" ? 1 : -1;

  // betesszük a tbody gyerekeit (a sorokat - tr elemek)) egy tömbbe

  let rows = Array.from(tbody.childNodes);

  // a rendezett elemeket újra a tbody-hoz adjuk, mivel egy elem nem lehet két helyen,
  // ezzel eltávolítódik a régi, az újak viszont sorrendben lesznek

  rows
    .sort((r1, r2) => {
      // v1 és v2 az összehasonlítandó cellák egyszerű szöveges tartalma (textContent)
      let v1 = r1.childNodes[sortCol].textContent;
      let v2 = r2.childNodes[sortCol].textContent;

      switch (sortCol) {
        case 0: // név - szövegként rendezzük
          return v1.localeCompare(v2) * sortDir;
        case 1: // fajta - szövegként rendezzük
          return v1.localeCompare(v2) * sortDir;
        case 2: // láb - számként rendezzük
          return (parseInt(v1) - parseInt(v2)) * sortDir;
        case 3: // magasság - számként rendezzük
          return (parseInt(v1) - parseInt(v2)) * sortDir;
        case 4: // nem - szövegként, de fordítottan rendezzük (szuka előre)
          return v1.localeCompare(v2) * -1 * sortDir;
        case 5: // kor - számként rendezzük
          return (parseInt(v1) - parseInt(v2)) * sortDir;

        default:
          // mivel fent kezeljük, hogy csak az 1-3 oszlopokat rendezhetik,
          // ezért ide elvileg nem futhat a vezérlés, de önvédelemként jó,
          // ha nem hagyunk nyilvánvaló lyukat. Egy fv. MINDIG térjen vissza
          // valami eredménnyel.
          return 1;
      }
    })
    .map((row) => {
      tbody.appendChild(row);
    });
}
