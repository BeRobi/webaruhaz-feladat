export function rendezBarmiSzerint(lista,kulcs, irany=1) {
    /**név szerint ABC sorrendbe rendezzük az adatokat
     * Ezzel az eredeti lista is megváltozik!
     */
    console.log(lista);
    //A sort függvény működése:
    // a sort függvény paramétere egy névtelen függvény. 
    //A névtelen függvénynek két paramétere van: a, b. 
    //A sort végigmegy a lista elemein páronként miden lehetséges sorrendben, 
    // ezeket az elempárokat jelenti az a és  b. 
    //A visszatérési értéke esetében csak az számít, hogy negatív-e, vagy pozitív-e? 
    //Ha negatív, akkor megcseréli az a és b elemeket, ha pozitív, akkor nem nyúl hozzájuk,
    //A végén az eredeti listánk rendezett lesz. 
  
  
    lista.sort(function (a, b) {
      console.log(a.nev);
      console.log(b.nev);
  
      console.log("következő a, b");
      let ertek = 1;
    /*   if (a.nev < b.nev) { //név szerinti rendezés: a <=> jelek értelmezve vannak a szövegeken, és rendes ABC szerinti rendezést végez a JS alapból. Ezt tudja. 
        ertek = -1;  //ha rossz sorrndben vannak, akkor egy negatív értéket kell generálnunk. 
      } */
      if (a[kulcs] < b[kulcs]) {//Így már tetszőleges kucls szerint rendezhetünk. 
        ertek = -1;
      }
      ertek*=irany; /**Így azt is meg tudjuk adni, hogy növekvő, vagy csökkenő sorrendbe rendezzünk.  */
      return ertek;/**vissszatérünk pozitív vagy negatív számmal */
    });
  }
  
  /**filter - szűrés 
   *  új listát hoz létre , 
   * megadhatunk egy szűrési feltételt 
   * 
   */
  