# 2 Lekcia - Co sme sa dnes naucili

## 1.1. Funkcie Cypressu

Zakladne funkcie na pracu v Cypress:

- `cy.get().click()` - vyber/kliknutie na element
- `cy.get().select()` - vyber z dropdownu pomocou funkcie select
- `cy.get().type()` - vpisovanie do input fieldov

**Nezabudnúť** - `cy.contains()` nie je plnohodnotna validacia. Ak to chcete pouzit na najdenie a overenie elementu, doplne `cy.contains` o `.should("be.visible")`

## 1.2. Selectovanie elementov

- `cy.contains("selector", "text elementu")` - selectovanie elementu na zaklade textu v elemente
- `cy.get("selector").contains("text elementu")` - alternativa k predoslemu selectu
- `data-test` - atribut, ktory sluzi na automation ucely. Pri selectovani elementov v prvom rade hladajte v elemente data-test, ak sa tam nenachadza, vypytajte si jeho pridanie od developer.
- ak si nie ste isty ako spravne selectovat elementy, pouzite Best practices od Cypressu: https://docs.cypress.io/guides/references/best-practices#Selecting-Elements

- ak sa v strukture HTML nenechadzaju ziadne data-tests ani id, zvolte taktiku postupneho selectovania. Postupnym sposobom sa nakoniec dostanete k elementu, co potrebujete. Ak uz mate selector hotovy, mozete ho skusit pripadne optimalizovat.

  ```
  cy.get("div.result")
    .find("div")
    .eq(0)
    .find("p")
    .should("contain.text", "kr")

  cy.contains("span", "Total income")
    .siblings("p")
    .should("contain.text", "kr")

  cy.get(".result div:eq(0) p").should("contain.text", "kr")

  ```

- nezabudnite si pomahat selectormi ako `parent()`, `siblings()`, `children()`

## 1.3. Premenne

- ak nechcete duplikovat hodnoty skrz test, ako email, meno, ciselne hodnoty, mozete ich ulozit do tzv. premennych. Preco pouzit premenne? Ak sa raz rozhodnete zmenit email ci meno, nemusite ich menit na X miestach v kode, staci ich prepisat v premennej.
- v ramci premennych rozlisujeme medzi let a const.

**const** - premenna, ktora je nemenne, jej hodnotu nemozete menit pocas behu testu. Je to ako CD-R, ktore napalite raz a uz nikdy viac. Ak by ste sa snazili hodnotu prepisat na inom mieste ako pri deklaracii, Cypress by vam spadol.
`const email = "example@gmail.com"`

**let** - premenna, ktoru mozete menit pocas behu programu. Ako CD-RW.
`let email = "example@gmail.com"`

**Nezabudnúť** - nazvy premennych by mali vzdy davat zmysel

## 1.3. JSON

- skratka pre JavaScript Object Notation alias nakupna taska pre moje premenne
- zoznam premennych mozete zapuzdrit do JSON fileov

```
const investmentInfo = {
  email: randomEmail({ domain: "kiwi.com" }),
  savings: 2000,
  years: 6,
  fundName: "Hoggwart's Fund",
}
```

Deklaracia bude vyzerat nasledovne:
`cy.get("[id=oneTimeInvestmentInput]").type(investmentInfo.savings)`
