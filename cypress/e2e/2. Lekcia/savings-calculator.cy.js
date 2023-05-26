var randomEmail = require("random-email")

describe("2nd lesson - Calculator", () => {
  beforeEach(() => {
    cy.visit("savingscalculator.php")
  })

  it("Calculate investment", () => {
    /*
        Uloha:
        Vyber fund
        vypln investiciu
        vypln, kolko rokov chces investovat
        klikni na tlacidlo Calculate
    */
    cy.log("select the fund")
    cy.get("#fundSelect").select("Fellowship investment group")

    cy.log("Type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type("30000")
    cy.get("[id=oneTimeInvestmentInput]").parent().should("not.be.empty")

    cy.log("Type period in years & calculate")
    cy.get("#yearsInput").type("23")

    //prve po com chodte je data test
    cy.get("[data-test=calculate]").click()

    cy.log("check krone in total income")
    cy.get("div.result")
      .find("div")
      .eq(0)
      .find("p")
      .should("contain.text", "kr")

    //pro tip
    cy.contains("span", "Total income")
      .siblings("p")
      .should("contain.text", "kr")

    cy.get(".result div:eq(0) p").should("contain.text", "kr")
  })

  it("Validate email in details", () => {
    const investmentInfo = {
      email: randomEmail({ domain: "kiwi.com" }),
      savings: 2000,
      years: 6,
      fundName: "Hoggwart's Fund",
    }

    //CD-RW CD-cko, veselo prepisujes pocas behu programu
    let email2 = "kikiriki@gmail.com"
    email2 = "zmenenyEmail"
    cy.log(email2)

    //CD-R CDcko, nemenne, zadefinujes raz, uz sa toho nechytis nikdy viac, ako CD od Senzi Senzus :D
    //pravidlo: nezabudajme na rozumne pomenovania premennych

    //CY pravidlo: nikdy!
    const buttonAccept = "[data-test=apply-for-saving]"

    cy.log("select the fund")
    cy.get("#fundSelect").select(investmentInfo.fundName)

    cy.log("Type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type(investmentInfo.savings)
    cy.get("[id=oneTimeInvestmentInput]").parent().should("not.be.empty")

    cy.log("Type period in years & calculate")
    cy.get("#yearsInput").type(investmentInfo.years)

    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").type(investmentInfo.email)
    cy.get(buttonAccept).click()

    cy.get("ul.saving-list").find("li").eq(0).should("be.visible")
    //to iste, len iny zapis
    cy.get(".saving-list li:eq(0)").should("be.visible")

    cy.log("click on detail and validate")
    cy.contains("button", "detail").click()
    cy.get("div.modal-container").should("be.visible")

    cy.contains("p", "Contact")
      .find("span")
      .should("have.text", investmentInfo.email)

    //select vnoreneho elementu cez find/children, obe riesenia su spravne
    cy.contains("p", "Contact")
      .children("span")
      .should("have.text", investmentInfo.email)
  })
})
