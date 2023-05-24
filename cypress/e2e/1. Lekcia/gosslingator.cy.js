/// <reference types="cypress" />

function addRyan() {
    cy.get("#addRyan").click()
}

describe("Testing Gosslingator page", () => {
    before(() => {
        cy.log("runs once before all tests")
    })

    beforeEach(() => {
        cy.log("runs before every test block")
        cy.visit("gosslingator.php")
    })

    it("Check title, h1 and button ", () => {
        cy.log("Title is correct")
        cy.title().should("eq", "Gosslingate me!" )

        cy.log("H1 should be visible and has correct text")
        cy.get("h1").should("be.visible").and("have.text", "Goslingate me")

        cy.log("Add Ryan button is visible and has correct text")
        cy.get("#addRyan").should("be.visible").and("have.text", "Ryan!")
    })
    
    it("Counter is working", () => {
        cy.log("Click twice on add ryan button")
        addRyan()
        addRyan()
        
        cy.log("Confirm there are two images")
        cy.get("img").should("have.length", 2)

        cy.log("Check counter is correct")
        cy.get(".ryan-counter").within(() => {
            cy.get("h2").should("have.text", 2)
            cy.get("h3").should("have.text", "ryans")
        })
    })
})
    