describe('list', () => {
  it('should display the list of items', () => {
    cy.fixture('taches.json').as('taches');
    cy.intercept('GET', '**/todoList.json', {
      fixture: 'taches.json'
    });
    cy.visit('/');
    cy.get('@taches').then((taches: any) => {
      const keys = Object.getOwnPropertyNames(taches);
      cy.get('[data-cy=todo-detail]')
        .should('have.length', 3)
        .each((el, index) => {
          const row = taches[keys[index]];
          const detail = cy.wrap(el).within(() => {
            detail.invoke('data', 'complete').should('eq', row.complete);
            detail.get('[data-cy=title]').should('have.text', row.text);
          });
        });
    });
  });
});