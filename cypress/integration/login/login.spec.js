describe('login module ', () => {
  describe('login enter verify', () => {
    it('login home page successfully', () => {
      cy.visit('/login');
    });
    it('login register module', () => {
      cy.get('[class*=login_icon]').parent().click();
      cy.get('[class*=login_box]').should('be.visible');
    });
  });
  describe('check userName filling successfully', () => {
    it('filling userName', () => {
      cy.get('#username')
        .type('wtz')
        .should('have.value', 'wtz');
    })
  });
  describe('check password filling successfully', () => {
    it('filling password', () => {
      cy.get('#password')
        .type('1234')
        .should('have.value', '1234');
    })
  });
  describe('simulate login', () => {
    // const USER_TOKEN = 'authentication';
    // const USER_ID = 'userId';
    it('login successfully alert', () => {
      // sessionStorage.removeItem(USER_TOKEN);
      // sessionStorage.removeItem(USER_ID);
      cy.wait(500);
      // let alertInfo = ''
      cy.on ('window:alert', (str) => {
        // alertInfo = str;
        expect(str).to.equal('登陆成功！！')
      });
      cy.get('[class*=login_button]')
        .click();
      // cy.wait('@alertCallBack');
      // expect(alertInfo).to.equal('登陆成功！！');
      cy.wait(500);
    });
    it('set authentication token successfully', () => {
      expect(sessionStorage.getItem(USER_TOKEN)).to.be.not.equal(null);
    });
    it('set userId successfully', () => {
      expect(sessionStorage.getItem(USER_ID)).to.be.not.equal(null);
    });
    it('redirect homepage successfully', () => {
      expect(cy.url()).not.to.contain('login');
    });
  })
});