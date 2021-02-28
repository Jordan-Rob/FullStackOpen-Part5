describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          name: 'Jona',
          username:'jod3s',
          password:'jona2021'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login')
      cy.contains('username')
      cy.contains('password')
    })

    describe('login', function() {
        it('succeeds with correct credentials', function(){
            cy.get('#username').type('jod3s')
            cy.get('#password').type('jona2021')
            cy.get('#login-button').click()
            cy.contains('Jona is logged in')
        })
        
        it('fails with wrong credentials', function(){
            cy.get('#username').type('jod3s')
            cy.get('#password').type('jona2021234')
            cy.get('#login-button').click()
            cy.contains('wrong credentials entered')

            cy.get('.error')
              .should('have.css', 'color', 'rgb(255, 0, 0)')
        })

    })
  })