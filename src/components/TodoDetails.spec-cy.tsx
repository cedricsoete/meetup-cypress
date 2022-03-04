import { mount } from '@cypress/react';
import TodoDetails, { TodoDetailsProps } from './TodoDetails';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../App.css';
describe('TodoDetails', () => {
  it('should render complete tache', () => {
    const props: TodoDetailsProps = {
      todo: {
        id: 'id',
        complete: true,
        text: 'tache A',
      }
    }

    mount(<TodoDetails {...props} />)
    cy.get('[data-cy=title]').should('have.text', 'tache A')
    cy.get('[data-cy=todo-detail]').invoke('data', 'complete').should('be.true')
  })

  it('should render in progress tache', () => {
    const props: TodoDetailsProps = {
      todo: {
        id: 'id',
        complete: false,
        text: 'tache A',
      }
    }

    mount(<TodoDetails {...props} />)
    cy.get('[data-cy=title]').should('have.text', 'tache A')
    cy.get('[data-cy=todo-detail]').invoke('data', 'complete').should('be.false')
  })

  it('should edit tache', () => {
    const props: TodoDetailsProps = {
      todo: {
        id: 'id',
        complete: false,
        text: 'tache A',
      }
    }

    mount(<TodoDetails {...props} />)
    cy.get('[data-cy=edit]').click();
    cy.get('[data-cy=edit-title]').clear().type('Tache Edit{enter}');
    cy.get('[data-cy=title]').should('have.text', 'Tache Edit')
  })
})