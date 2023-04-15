//rendezés by zschopper (thClick, rendez) - https://github.com/zschopper/js_kutya_kartya_tabla_form/blob/main/script.js

export function thClick(event) {


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

export function rendez() {
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
