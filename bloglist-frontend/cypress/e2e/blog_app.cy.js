
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Sana Kesänen',
      username: 'doglover',
      password: '123454e4'
    }
    const user2 = {
      name: 'Cat Cat',
      username: 'catlover',
      password: '123454w4'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) // create user
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2) // create user
    cy.visit('')

  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('doglover')
      cy.get('#password').type('123454e4')
      cy.get('#login-button').click()

      cy.contains('Sana Kesänen logged in')
    })

    // it('fails with wrong credentials', function () {
    //   cy.get('#username').type('doglover')
    //   cy.get('#password').type('wrong')
    //   cy.get('#login-button').click()
    //   cy.contains('Wrong username or password')
    //   cy.get('.warn').should('have.css', 'color', 'rgb(255, 0, 0)')
    // })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'doglover', password: '123454e4' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by')
      cy.get('#author').type('Sana Kesänen')
      cy.get('#url').type('cypress@blog')
      cy.get('.create-btn').click()
      cy.contains('a blog created by Sana Kesänen')
    })

    describe('When blog is created', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by')
        cy.get('#author').type('Sana Kesänen')
        cy.get('#url').type('cypress@blog')
        cy.get('.create-btn').click()
        cy.contains('a blog created by Sana Kesänen')

      })

      it('A blog can be liked', function () {
        cy.createBlog({
          title: 'Blog with some amount of likes',
          author: 'Keke',
          url: 'keke@like.com'
        })
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('Like').click()
        cy.contains('likes 1')
      })
    })
  })

  describe('Delete button is visible only to blog author', function () {
    beforeEach(function () {
      cy.login({ username: 'doglover', password: '123454e4' })
      cy.createBlog({
        title: 'Blog with some amount of likes',
        author: 'Keke',
        url: 'keke@like.com',
      })
    })
      it('Delete button is visible', function () {
        cy.createBlog({
          title: 'Blog with some amount of likes',
          author: 'Keke',
          url: 'keke@like.com'
        })
        cy.contains('view').click()
        cy.contains('Remove')
      })
  })
  describe('Blogs are ordered by likes', function () {
    beforeEach(function () {
      cy.login({ username: 'doglover', password: '123454e4' })
      cy.createBlog({
        title: 'Blog with 6 likes',
        author: 'Keke',
        url: 'keke@like.com',
        likes: 6
      })
      cy.createBlog({
        title: 'Blog with 1 like',
        author: 'Keke',
        url: 'keke@like.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Blog with 5 likes',
        author: 'Keke',
        url: 'keke@like.com',
        likes: 5
      })
    })
      it('Blogs are ordered by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'Blog with 6 likes')
        cy.get('.blog').eq(1).should('contain', 'Blog with 5 likes')
        cy.get('.blog').eq(2).should('contain', 'Blog with 1 like')
        
      })
  })
  
})




