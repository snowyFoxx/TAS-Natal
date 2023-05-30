/* 1. accept cookies
   2. type tokyo
   3. url obsahuje tokyo
   4. destination je len jedna
   4. click na search
*/

describe("3rd lesson", () => {
    it("interaction with search form", () => {
        cy.log("accept cookies")
        cy.setCookie("__kwc_agreed", "true")

        cy.log("uncheck booking checkbox using localStorage")
        localStorage.setItem("bookingcom_extension_default", "false")

        cy.log("wait for umbrella API")
        cy.intercept("GET", "**featureName=UmbrellaPlacesQuery**").as(
            "placepickerResults"
        )

        cy.log("visit the page")
        //mozete pastnut celu URL a tym prepisat baseURL
        cy.visit("https://www.kiwi.com/en/")

        /*
          cy.get("[data-test=CookiesPopup-Accept]").click()
          cy.get("[data-test=CookiesPopup]").should("not.exist")
          */

        //kontrola, po prichode na stranku je button Explore
        cy.log("check that btn is Explore")
        cy.contains("[data-test=LandingSearchButton]", "Explore")
            .should("be.visible")
            .and("have.attr", "href", "/en/search/tiles/vienna-austria/anywhere")
        //dopracovat extra validaciu cez have.text
        cy.contains("[data-test=LandingSearchButton]", "Explore")
            .should("be.visible")
            .and("have.attr", "href")
            .and("include", "/search/tiles/")

        cy.log("type Tokyo")
        cy.get(
            "[data-test=PlacePickerInput-destination] [data-test=SearchField-input]"
        ).type("Tokyo")

        cy.wait("@placepickerResults", { timeout: 15000 })

        cy.contains("[data-test=PlacePickerRow-wrapper]", "Tokyo").click()
        cy.contains("[data-test=LandingSearchButton]", "Search").should(
            "be.visible"
        )

        cy.log("destination is one and only")
        cy.get(
            "[data-test=PlacePickerInput-destination] [data-test=PlacePickerInputPlace]"
        ).should("have.length", 1)

        cy.log("check URL")
        //cekujem substring celej URL
        cy.url().should("include", "?destination=tokyo-japan")
        //tymto kontrolujem celu URL
        cy.url().should("eq", "https://www.kiwi.com/en/?destination=tokyo-japan")

        //odkliknut checkbox
        //moznost cez contains a click()
        //cy.contains("span", "Check accommodation with ").click()

        //strieska vyhlada substring iba v zaciatku nazvu
        /*
           cy.get("[class^=Checkbox] input").uncheck({
             force: true,
           })
           */
        //druha obchadzka je pouzitie *= vyhlada substring v celom nazve classy

        cy.log("checkbox should be unchecked")
        cy.get("[class^=Checkbox] input").should("not.be.checked")

        cy.log("click on Search button")
        cy.get("[data-test=LandingSearchButton]").click()
    })
})
