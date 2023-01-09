describe('Main', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the correct title', () => {
    cy.title().should('equal', 'Suggest Me')
  })
})
