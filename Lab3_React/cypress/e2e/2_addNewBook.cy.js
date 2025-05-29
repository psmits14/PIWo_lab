describe("Logowanie i dodawanie książki", () => {
    const email = "272940@student.pwr.edu.pl";
    const password = "NieW4RTO";      
    const bookTitle = "Testowa książka";
    const author = "Autor Testowy";
    const updatedTitle = "Zmieniona książka";

    it("Logowanie i dodawanie książki", () => {
      cy.visit("https://ksiegarnia-272940.web.app/login");
  
      // Logowanie
      cy.get('input#email').type(email);
      cy.get('input#password').type(password);
      cy.get('button.submit-btn').click();
  
      cy.on("window:alert", (text) => {
        expect(text).to.contains("Zalogowano!");
      });
  
      // Sprawdź czy przycisk Wyloguj się pojawił
      cy.get("nav button").eq(1).should("contain.text", "Wyloguj");
  
      // Kliknij "Dodaj książkę"
      cy.get('[data-cy="add-book-btn"]').click();
  
      // Wypełnij formularz
      cy.get("#title").type(bookTitle);
      cy.get("#author").type(author);
      cy.get("#description").type("To jest testowy opis książki.");
      cy.get("#price").clear().type("29.99");
      cy.get("#year").type("2024");
      cy.get("#cover").select("hard-cover");
      cy.get("#pages").type("300");
      cy.get("#genre").select("klasyka");
  
      // Wyślij formularz
      cy.get("button.submit-btn").click();
  
      cy.contains(".book", bookTitle).within(() => {
        cy.contains(author);
        cy.contains("29.99 zł");
        cy.contains("Klasyka");
        cy.contains("2024");
    });
  });
});