let szamlalo = 0;
export function osszeallit1(lista, hova) {
  let kartyakHelye;
  if (szamlalo == 0) kartyakHelye = elem_letrehozo(hova, "div", "container");
  if (hova) kartyakHelye = document.querySelector(".container");
  const KARTYA = elem_letrehozo(kartyakHelye, "div", "kutyaKartya");
  elem_letrehozo(KARTYA, "h3").appendChild(document.createTextNode("Kutya adatai"));
  //lista[i].nev
  for (const KULCS in lista) {
    elem_letrehozo(KARTYA, "p").appendChild(
      document.createTextNode(KULCS + ": " + lista[KULCS]));
  }
}

export function osszeallit2(lista, hova) {
  let tablaElem = document.querySelector(".tabla");
  if (szamlalo == 0) {
    tablaElem = elem_letrehozo(hova, "table", "tabla");
    let tablafejElem = elem_letrehozo(tablaElem, "thead", "tabla");
    let tablasorElem = elem_letrehozo(tablafejElem, "tr", "fej");

    for (const KULCS in lista)
      elem_letrehozo(tablasorElem, "th", "aria-sort").appendChild(document.createTextNode(KULCS));
      elem_letrehozo(tablasorElem, "th").innerHTML = "Művelet";
  }
  szamlalo += 1;
  let tablatestElem = document.querySelector(".tableBody");
  if (szamlalo == 1)
    tablatestElem = elem_letrehozo(tablaElem, "tbody", "tableBody");
  const tablasorElem = elem_letrehozo(tablatestElem, "tr", "kutyaTabla");

  //lista[i].nev
  for (const KULCS in lista) {
      elem_letrehozo(tablasorElem, "td", "kutyaCella").appendChild(document.createTextNode(lista[KULCS]));
  }
  const gombElem = elem_letrehozo(tablasorElem, "td");
      elem_letrehozo(gombElem, "button", "gomb").innerHTML = "Törlés";
  //console.log(szamlalo);
}

export function elem_letrehozo(szuloelem, elem, osztaly = "") {
  const GYEREK = document.createElement(elem);
  szuloelem.appendChild(GYEREK);
  if (osztaly) GYEREK.classList.add(osztaly);
  return GYEREK;
}
