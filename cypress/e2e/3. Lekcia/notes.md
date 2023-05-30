# 3 Lekcia - Co sme sa dnes naucili

## 1.1. Validacie Cypressu

- `.should("be.empty")` - pouzivame na elementy, ktore obsahuju tzv. inner text - predkodeny text, ako napr h1, h2 a pod
- `.should("not.have.value", "SpecificValue")` - overuje ci element neobsahuje specificku value, nezabudnite pridat aj tu specific value, bez nej vam validacia bude vracat undefined

- `.should("have.value", "SpecificValue")` - overuje, ze element ma specificku value, ktoru sme zadali
- `.should("have.prop", "value", "specificValue")` - obdoba have.value validacie, len s tym rozdielom, ze sa dopytujeme priamo property
- `.invoke("val").should("eq", "specificValue")` - obdoba oboch validacii spomenutych vyssie len s pouzitim invoke

**Vsetky tri hore spominane zapisy su spravne**

- `cy.url().should("eq", "specificURL")` - porovnava aktualnu URL na stranke s URL, ktoru sme predali do funkcie ako specificURL. Na to, aby validacia presla, musia byt totozne
- `cy.url().should("include", "specificURL")` - kontroluje substring v aktualnej URL

- `.should("have.length", numberOfExpectedElements)` - overi ci pocet elementov, ktore ocakavam na stranke sedi s aktualnym poctom danych elementov na stranke

- `.should("not.be.checked") a .should("be.checked")` - overi, ze checkbox bol unchecked alebo checked. Nezabudnite napisat spravny selector, ktory bude odkazovat na input element.

- `.should("not.exist")` - validacia, ktora overi, ze element sa nenachadza v DOM. Spomen si na pripad s cookies pop up oknom, ktore zmizlo po schvaleni cookies.

- `.should("have.attr", "menoAtributu", "presnaHodnota")` - overi ci element ma urcity typ atributu, napr. class, value, href a to ci sa v nom nachadza presne dana hodnota

- `.should("have.attr", "menoAtributu").and("include", "castHodnoty")` - obdoba predchadzajucej validacie, ale overi iba substring hodnoty atributu

## 1.2. Cypress funkcie

- `.uncheck() / .check()` - funkcia sluzi na interakciu s checkboxom. Neodporuca sa ju dalej chainovat. Viac info tu: https://docs.cypress.io/api/commands/check

- `cy.setCookie("menoCookie", "hodnota")` - funkcia sluzi na nastavenie cookies. Vzdy ich hadz pred cy.visit. Viac info tu: https://docs.cypress.io/api/commands/setcookie

- `cy.intercept("typMetody", "nazovURL)` - sluzi na pracu s API callmi na stranke. Mozes ich taktiez definovat pred cy.visit(). Viac info tu: https://docs.cypress.io/guides/guides/network-requests a https://docs.cypress.io/api/commands/intercept

- `Cypress._.times(kolkokratZbehnut, () => { SEM IDE IT BLOCK})` - pomocka, ak chces zbehnut test niekolko krat po sebe. Necommituj to spolu s testom do MR, je to len pomocka pre teba, aby si zistil/a ci ti test prechadza a nie je flaky.
  ```
  Cypress._.times(10, () => {
       it("interaction with search form", () => {
           //tu pojde nejaky kod
       })
  })
  ```

## 1.3. Flags

- `{force : true}` - pri pridani do click() alebo check(), preklikne aj elementy, ktore mu stoja v ceste. Pouzivat uvazlivo.
- `{timeout: tvojCas}` - pocka do urciteho casu na napr. zobrazenie elementu, intercept a pod. Ak sa dany element objavi pred uplynutim casomiery, zvysny cas uz necaka a ide na dalsi krok v teste. Cize, ak mame timeout 10 sekund, ale element sa objavi po 3, dalsich 7 sekund uz necaka (tak ako je tomu pri cy.wait(1000)). Hodnota sa udava v ms, nie s.

## 1.4. Zakladne pravidla automation

1. starostlivo vyberajte selectory
2. robime automation TESTING, nezabudajte teda na validacie
3. nepouzivajte IF, ak to nie je potrebne. Volame to conditional testing. Napr. if je button viditelny, urob toto, ak nie je, urob nieco ine. Pri tomto testingu stracame kontrolu nad testom.
4. ak sa mozes zbavit klikania cez FE, zbav sa ho, napr. pouzitim cookies ci localStorage
