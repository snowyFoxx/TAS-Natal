var randomEmail = require("random-email")

const savingInfo = {
    email: randomEmail({ domain: "kiwi.com" }),
    savings: 2000,
    years: 6,
    fundName: "Hoggwart's Fund",
}

describe("Homework - Calculator", () => {
    beforeEach(() => {
        cy.visit("/savingscalculator.php")
    })

    it("Validate empty input fields", () => {
        cy.log("select the fund")
        cy.get("[id=fundSelect]").select(savingInfo.fundName)

        cy.get("#fundSelect")
            .find("option")
            .eq(2)
            .should("have.prop", "selected", true)
            .and("have.text", savingInfo.fundName)

        cy.log("Type amount of money")
        cy.get("#oneTimeInvestmentInput").type(savingInfo.savings)

        cy.log("Type no of years")
        cy.get("#yearsInput").type(savingInfo.years)

        cy.log("Fill in email")
        cy.get("#emailInput").type(savingInfo.email)
        cy.get("[data-test=apply-for-saving]").click()

        cy.log("Check that saving appeared")
        cy.get(".saving-list li").eq(0).should("be.visible")

        //za tymto sa nachadza logika prazdneho drop downu, preto null, nie empty string.
        cy.log("Dropdown should be empty")
        //obe riesenia su spravne
        cy.get("#fundSelect").invoke("val").should("eq", null)
        cy.get("#fundSelect").should("have.value", null)

        //extra validacia, ze preselectnuta je prva option s tymto nazvom
        cy.get("#fundSelect")
            .find("option")
            .first()
            .should("have.prop", "selected", true)
            .and("have.text", "Select your fund")

        // jeden druh zapisu
        cy.get("#oneTimeInvestmentInput").should("have.value", "")

        //druhy druh zapisu
        cy.get("#yearsInput").should("have.prop", "value", "") //cekuje property

        //treti druh zapisu
        cy.get("#emailInput").invoke("val").should("eq", "")
    })
})
