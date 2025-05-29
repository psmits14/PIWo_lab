describe("Edytowanie i usuwanie książki", () => {
  const email = "272940@student.pwr.edu.pl";
  const password = "NieW4RTO";
  const bookTitle = "Testowa książka";
  const updatedTitle = "Zmieniona książka";

  it("Edytowanie i usuwanie książki", () => {
    cy.visit("https://ksiegarnia-272940.web.app/login");

    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("button.submit-btn").click();

    cy.on("window:alert", (text) => {
      expect(text).to.include("Zalogowano");
    });

    // EDYTUJ
    cy.contains(".book", bookTitle).within(() => {
      cy.contains("Edytuj").click();
    });

    cy.get("#title").should("have.value", bookTitle);
    cy.get("#title").clear().type(updatedTitle);
    cy.get("button.submit-btn").click();

    cy.contains(".book", updatedTitle).should("exist");

    // USUŃ
    cy.on("window:confirm", (text) => {
      expect(text).to.include("Czy na pewno chcesz usunąć");
      return true;
    });

    cy.contains(".book", updatedTitle).within(() => {
      cy.contains("Usuń").click();
    });

    cy.contains(".book", updatedTitle).should("not.exist");
  });
});
