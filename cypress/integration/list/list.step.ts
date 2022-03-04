import type { DataTable } from '@cucumber/cucumber';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const completed = 'terminer';

Given('la liste existe :', (table: DataTable) => {
  const body = table.rows().reduce((curr, data, index) => {
    curr[`item${index}`] = {
      id: `item${index}`,
      complete: data[1] === completed,
      text: data[0]
    };
    return curr;
  }, {});

  cy.intercept('GET', '**/todoList.json', { body });
});

When('je consulte la todo liste', () => {
  cy.visit('/');
});

Then('je vois la tache {string} qui est {string}', (name: string, state) => {
  cy.get('[data-cy=todo-detail]').contains('[data-cy=title]', name).should('be.visible')
  cy.get('[data-cy=todo-detail]').filter(`:contains("${name}")`).then(el => {
    cy.wrap(el).invoke('data', 'complete').should('eq', state === completed);
  });
});