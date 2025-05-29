describe('Check Main Page', () => {
    beforeEach(() => {
      cy.visit("https://ksiegarnia-272940.web.app/");
    });
  
    it('Test navigation', () => {
      // Sprawdź czy pasek nawigacyjny zawiera dokładnie 2 linki
      cy.get('nav a').should('have.length', 2);
    });
  
    it("Filter the genre 'Klasyka'", () => {
      // Wybierz "Klasyka" z listy
      cy.get("#genre-filter").select("Klasyka");
  
      // Kliknij "Zastosuj filtry”
      cy.get("button.filter-btn").click();
  
      // Sprawdź, że pojawiły się książki z tagiem "Klasyka”
      cy.get(".book").each(($book) => {
        cy.wrap($book).find(".tag").should("contain", "Klasyka");
      });
    });
  
    it("Filter the price 0 – 130 zł", () => {
      cy.get("#price-min").type("0");
      cy.get("#price-max").type("130");
  
      cy.get("button.filter-btn").click();
  
      cy.get(".book-price").each(($price) => {
        const price = parseFloat($price.text().replace("zł", "").trim().replace(",", "."));
        expect(price).to.be.lte(130);
      });
    });
  });
  