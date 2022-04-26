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
          .last()
              .contains('Ricky bobby')
            .next()
              .contains('http://localhost:3001/example2')
                .click()
            .next()
              .contains('https://www.youtube.com/watch?v=prZBPTfcrbA')

  })

  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('form input[name="title"]')
      .should('have.attr', 'placeholder', 'Title...')
    cy.get('form input[name="urlToShorten"]')
      .should('have.attr', 'placeholder', 'URL to Shorten...')
    cy.get('form button')
      .contains('Shorten Please!')
  })

  it('When a user fills out the form, the information is reflected in the input fields', () => {
    cy.get('form input[name="title"]')
      .type('Awesome photo')
        .should('have.value', "Awesome photo")
    cy.get('form input[name="urlToShorten"]')
      .type("https://images.unsplash.com/photo...")
        .should('have.value', 'https://images.unsplash.com/photo...')
  })

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.get('form input[name="title"]')
      .type('Awesome photo')

    cy.get('form input[name="urlToShorten"]')
      .type("https://images.unsplash.com/photo...")

    cy.get('form button')
        .click();

    cy.get('section')
      .children()
        .should('have.length', 3)
        .last()
            .contains('Awesome photo')
          .next()
            .contains('http://localhost:3001/example3')
              .click()
          .next()
            .contains('https://images.unsplash.com/photo...')

  })
})
