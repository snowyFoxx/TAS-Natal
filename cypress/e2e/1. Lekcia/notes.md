# 1 Lekcia

## 1.1. Get vs Contains

Je viacero spôsobov ako pracovať s elementom na stránke:

- `cy.get("h1")` - assertuje element h1
- `cy.get("#element")` - assertuje element pomocou id 
- `cy.get(".element")` - assertuje element pomocou class

Ak element nemá id a class je nepoužiteľný, vieme ho získať pomocou textu:

- `cy.contains("text")` - assertuje element pomocou textu

**Nezabudnúť** - ak je na stránke viacero elementov s rovnakým textom, `cy.contains("text")` tak nájde prvý z nich. Taktiež `contains` nie je validácia a vždy treba použiť aj `should("be.visible")`

## 1.2. Ako assertovať prvý z viacerých elementov

Ak máme na stránke viacero elementov, ktoré chceme assertovať, tak môžeme použiť `first()` alebo `eq(0)` - `eq` ide podľa indexu, preto 0.  

## 1.3. Find vs Within

`find` a `within` sú podobné, ale `within` je viac "chainable" a môžeme ho použiť na viaceré elementy v rámci scope. 

Find:

- `cy.get(".ryan-counter").find("h2")`

Ak chceme nájsť pomocou `find` iný element v rámci `.ryan-counter`, tak musíme použiť znovu:

- `cy.get(".ryan-counter").find("h3")`

Within:

V rámci within nám stačí assertovať `.ryan-counter` iba jeden krát a potom môžeme pracovať s elementami pomocou `get`:

```
 cy.get(".ryan-counter").within(() => {
            cy.get("h2").should("have.text", 2)
            cy.get("h3").should("have.text", "ryans")
        })
```

## 1.4. Visibility a viacero elementov

Ak máme napríklad 3 elemnty a chceme overiť, že sú viditeľné, nestačí použiť `cy.get(#elements).should("be.visible")` pretože táto validácia prejde aj v prípade, že iba jeden element je viditeľný.

Preto je potrebné použiť `each`:

```
cy.get(#elements).each(element => {
    expect(element).to.be.visible
})

```

## 1.5. Debugging

- `cy.log()` je veľmi nápomocný a je dobrou praxou ho používať kvôli prehľadnosti testov.
- `cy.pause()` - pozastaví test a nemusíme čakať kým sa test skončí

## 1.6. Práca s textom

- `cy.get("element").should("have.text", "text")` - overí, že text elementu je rovnaký ako text v teste, napr. "cypress framework" je rovnaký ako "cypress framework"
- `cy.get("element").should("contain.text", "text")` - overí, že element obsahuje text napr. "cypress framework" obsahuje "cypress"

