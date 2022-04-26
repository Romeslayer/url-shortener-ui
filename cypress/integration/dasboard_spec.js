import { exampleURLS, examplePost } from '../fixtures/urlshorts.js';
console.log(exampleURLS, examplePost);
describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', exampleURLS)
      .as('get-urls')

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', examplePost)
      .as('post-url')

      cy.visit('http://localhost:3000/')

  })


  it('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('header')
      .contains('URL Shortener')

    cy.get('section')
      .children()
        .should('have.length', 2)
        .first()
            .contains('Rocky balboa')
          .next()
            .contains('http://localhost:3001/example1')
              .click()
          .next()
            .contains('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

      cy.get('section')
        .children()
          .should('have.length', 2)
          .last()
              .contains('Ricky bobby')
            .next()
              .contains('http://localhost:3001/example2')
                .click()
            .next()
              .contains('https://www.youtube.com/watch?v=prZBPTfcrbA')

  })
})
