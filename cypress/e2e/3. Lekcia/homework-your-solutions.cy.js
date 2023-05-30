var randomEmail = require("random-email")

describe("Prve riesenie", () => {
    const investmentInfo = {
        //email : "email@email.com",
        email: randomEmail(),
        fund: "Tom & Jerry corp",
        investment: 10000,
        period: 5,
    }

    //conditional testing na konci testu je neodporucany, viac v notes.dm
    // should not have value by mal mat este jeden argument, kde by sme urcili
    // aku value nema mat

    it("Calculator homework", () => {
        cy.visit("https://furbo.sk/waw/savingscalculator.php")
        cy.log("Drop down menu - Select your fund")
        cy.get("#fundSelect").select(investmentInfo.fund)

        cy.log("Input type number - One time investment")
        cy.get("[id=oneTimeInvestmentInput]").type(investmentInfo.investment)

        cy.log("Input type number - Period in years")
        cy.get("#yearsInput").type(investmentInfo.period)
        cy.get("[data-test=calculate]").click()

        cy.log("Text box - Email address")
        cy.get("#emailInput").type(investmentInfo.email)

        cy.log("Button - Apply for saving")
        cy.get("[data-test=apply-for-saving]").click()

        cy.log("Overenie ci su vsetky polia prazdne")
        cy.log("Najprv ci sa zobrazilo okno s Recent requests")
        cy.get("div.saving-detail").should("be.visible")

        cy.log("Check the field 'Select your fund' is empty???")
        cy.get("#fundSelect").should("not.have.value")

        cy.log("Check the field 'One time investment' is empty???")
        cy.get("#fundSelect").should("not.have.value")

        cy.log("Check the field 'Period in years' is empty???")
        cy.get("#yearsInput").should("not.have.value")

        cy.log("Check the field 'Email address' is empty???")
        cy.get("#emailInput").should("not.have.value")

        /* Chcela  som trochu carovat s IF condition,
            v pripade ak nie je vyplneny mail, tak len Calculate inak button Apply for saving
            Sily nestacili :D
            if(cy.get("#emailInput").parent().should("not.be.empty")){
                cy.log("Button - Apply for saving")
                cy.get("[data-test=apply-for-saving]").click()
            }else{
                cy.get("[data-test=calculate]").click()
            }
            */
    })
})

// v tomto rieseni bolo pouzite be.empty, ktore sa nad input fieldmi nepouziva, viac s notes.md
describe("druhe riesenie", () => {
    it("uloha", () => {
        cy.log("Define consts")
        const email = "erika.slavikova@goodrequest.com"
        const savings = "3000"
        const years = "20"

        cy.visit("https://furbo.sk/waw/savingscalculator.php")

        cy.log("Select fund")
        cy.get("#fundSelect").select("Fellowship investment group")

        cy.log("Type amount of money")
        cy.get("[id=oneTimeInvestmentInput]").type(savings)
        cy.get("[id=oneTimeInvestmentInput]").should("be.empty")
        cy.get("[id=oneTimeInvestmentInput]").parent().should("not.be.empty")

        cy.log("Type period in years")
        cy.get("#yearsInput").type(years)

        cy.log("Type mail")
        cy.get("#emailInput").type(email)

        cy.log("Apply for your saving")
        cy.get("[data-test=apply-for-saving]").click()

        cy.log("Check empty fields")
        cy.get("[id=fundSelect]").should("not.have.value").and("be.visible")
        cy.get("[id=oneTimeInvestmentInput]").should("be.empty").and("be.visible")
        cy.get("#yearsInput").should("be.empty").and("be.visible")
        cy.get("#emailInput").should("be.empty").and("be.visible")
    })
})


// toto riesenie bolo idealne
describe("tretie riesenie", () => {
    const investmentInfo = {
        email: randomEmail({ domain: "kiwi.com" }),
        fund: "Fellowship investment group",
        oneTimeInvestmentInput: "30000",
        yearsInput: "25",
    }

    it("Confirm empty fields after creating and deleting a new request", () => {
        cy.visit("savingscalculator.php")

        cy.log("Select fund")
        cy.get("#fundSelect").select(investmentInfo.fund)

        cy.log("Type amount of money")
        cy.get("[id=oneTimeInvestmentInput]").type(
            investmentInfo.oneTimeInvestmentInput
        )

        cy.log("Type period in years")
        cy.get("[id=yearsInput]").type(investmentInfo.yearsInput)

        cy.log("Type in email address and apply for savings")
        cy.get("[id=emailInput]").type(investmentInfo.email)
        cy.get("[data-test=apply-for-saving]").click()
        cy.get("ul.saving-list").find("li").eq(0).should("be.visible")

        cy.log("Verify that input fields are empty")
        cy.get("#fundSelect").should("have.value", null)
        cy.get("[id=yearsInput]").should("have.value", "")
        cy.get("[id=yearsInput]").should("have.value", "")
        cy.get("[id=emailInput]").should("have.value", "")
    })
})
