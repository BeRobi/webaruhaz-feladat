let lista = [];

$(function () {
  let vegpont = "adat.json";
  adatBeolvas(vegpont, megjelenit);
  console.log(lista);
});

function megjelenit(data) {
    console.log(data);
  }

function megjelenit2(data) {
  console.log(data);
}

function adatBeolvas(vegpont,callbackFv) {
  fetch(vegpont, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {

      callbackFv(data.adatLista)
    })
    .catch((err) => console.log(err));
}
