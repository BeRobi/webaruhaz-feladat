import { kutyaKULCS } from "./adat.js";

let szamlalo = 0;
export function kartyaOsszeallit(lista, hova) {
  let kartyakHelye;
  //hova.innerHTML=""
  if (szamlalo == 0) kartyakHelye = elem_letrehozo(hova, "div", "container");
  if (hova) kartyakHelye = document.querySelector(".container");
  const KARTYA = elem_letrehozo(kartyakHelye, "div", "kutyaKartya");
  elem_letrehozo(KARTYA, "h3").appendChild(
    document.createTextNode("Kutya adatai")
  );
  //lista[i].nev
  for (const KULCS in kutyaKULCS) {
    elem_letrehozo(KARTYA, "p").appendChild(
      document.createTextNode(kutyaKULCS[KULCS] + ": " + lista[KULCS])
    );
  }
}

export function tablazatOsszeallit(lista, hova) {
  let tablaElem = document.querySelector(".tabla");
  if (szamlalo == 0) {
    tablaElem = elem_letrehozo(hova, "table");
    let tablafejElem = elem_letrehozo(tablaElem, "thead", "tablaFej");
    let tablasorElem = elem_letrehozo(tablafejElem, "tr", "fej");
    tablaElem.classList.add("table", "table-dark", "table-striped");

    for (const KULCS in kutyaKULCS)
      elem_letrehozo(tablasorElem, "th", "aria-sort").appendChild(
        document.createTextNode(kutyaKULCS[KULCS])
      );
    elem_letrehozo(tablasorElem, "th", "aria-sort").innerHTML = "Művelet";
  }
  szamlalo += 1;

  let tablatestElem = document.querySelector(".tableBody");
  if (szamlalo == 1)
    tablatestElem = elem_letrehozo(tablaElem, "tbody", "tableBody");
  const tablasorElem = elem_letrehozo(tablatestElem, "tr", "sor");
  //tablaElem.classList.add('table', 'table-dark', 'table-striped')

  //lista[i].nev
  for (const KULCS in lista) {
    elem_letrehozo(tablasorElem, "td", "cella").appendChild(
      document.createTextNode(lista[KULCS])
    );
  }
  const gombHELYE = elem_letrehozo(tablasorElem, "td", "cella");
  elem_letrehozo(gombHELYE, "button", "gomb").innerHTML = "Törlés";

  // elem_letrehozo(gombHELYE, "button").classList.add('btn', 'btn-danger')
  // document.querySelector("button").innerHTML = "Törlés"
  //console.log(szamlalo);
}

export function elem_letrehozo(szuloelem, elem, osztaly = "") {
  const GYEREK = document.createElement(elem);
  szuloelem.appendChild(GYEREK);
  if (osztaly) GYEREK.classList.add(osztaly);
  return GYEREK;
}
