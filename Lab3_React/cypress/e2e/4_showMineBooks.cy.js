describe("Filtrowanie moich książek", () => {
    const email = "272940@student.pwr.edu.pl";
    const password = "NieW4RTO";
    const knownBook = "Testowa książka";
  
    it("Logowanie i filtrowanie moich książek", () => {
      cy.visit("https://ksiegarnia-272940.web.app/login");
  
      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get("button.submit-btn").click();
  
      cy.on("window:alert", (text) => {
        expect(text).to.include("Zalogowano");
      });
  
      // Sprawdzenie obecności checkboxa "moje książki”
      cy.get("input#my-books").should("exist");
  
      // Zaznaczenie checkboxa i kliknięcie "Zastosuj filtry”
      cy.get("input#my-books").check();
      cy.get("button.filter-btn").click();
  
      // Upewnij się, że widoczna jest przynajmniej jedna książka użytkownika
      cy.get(".book").should("exist");
  
      // Sprawdź, że wszystkie widoczne książki mają "Usuń” i "Edytuj"
      cy.get(".book").each(($book) => {
        cy.wrap($book).within(() => {
          cy.contains("Usuń").should("exist");
          cy.contains("Edytuj").should("exist");
        });
      });
    });
  });
  