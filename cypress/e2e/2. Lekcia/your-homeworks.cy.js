/*
Vytvoriť nový it block
Overiť ze ryan out button je disabled
Pridať jedného Ryana
Odobrať Ryana
Overiť, že button je opäť disabled
A počítadlo je na 0
*/

function addRyan() {
  cy.get("#addRyan").click()
}

describe("Testing Ryan out button", () => {
  beforeEach(() => {
    cy.log("runs once before all tests")
    cy.visit("/gosslingator.php")
  })

  it("Check functionality of Ryan! and RyanOut!", () => {
    cy.log("Button RyanOut! is disabled")
    cy.get("#removeRyan").should("be.visible").and("be.disabled")

    cy.log("Add one Ryan")
    cy.get("#addRyan").click()
    // nezabudnite overit, ze je to visible pre klient
    // pri should have.text iba overujeme vnutorny text elementu v DOM
    cy.get("#ryanCounter").should("have.text", 1).and("be.visible")

    cy.log("Remove one Ryan")
    // pred clickom nemusime pridavat validaciu should be visible, click to spravi sam pred exekuciou
    cy.get("#removeRyan").should("be.visible").click()

    cy.get("#ryanCounter").should("have.text", 0).and("be.visible")

    cy.log("Check if the button RyanOut! is disabled after removing one Ryan")
    //overujeme ci je button naozaj disabled/neklikatelny
    cy.get("#removeRyan").should("be.visible").and("be.disabled")
    //overujeme ci ma button stylizaciu v classe nazvanu disabled
    cy.get("#removeRyan").should("have.class", "disabled")
  })

  it.only("Ryan out button is disabled", () => {
    cy.log("Confirm that ryan out button is disabled")
    cy.get("#removeRyan").should("be.disabled")
    cy.log(
      "Confirm that ryan out button is disabled after adding and deleting one ryan"
    )
    addRyan()
    cy.get("#removeRyan").click()
    cy.get("#removeRyan")
      .should("be.disabled")
      .should("contain.text", "Ryan out!")
    cy.get(".ryan-counter").find("h2").should("have.text", 0)

    //nedostatocna validacia, co ak bude v pocitadle cislo 100? test stale prejde, ale hodnota
    //neodpoveda tomu, co chceme overit
    cy.get(".ryan-counter").find("h2").should("contain.text", 0)
  })
})

// 1. pravidlo: cy.logs su vasi kamarati, pomahaju sprehladnit test a debugovanie
// 2. pravidlo: neprehanaj to s validaciami, kde ich netreba. nie su na skodu, ale spomalujes si test
// 3. pravidlo: class vs atribut disabled, nie je to iste. Class je na stylizaciu elementu, disabled samotny je atribut elementu, jeho vlastnost
