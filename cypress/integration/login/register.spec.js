describe('register module', () => {
  describe('register enter verify', () => {
    it('enter register module', () => {
      cy.visit('/login');
      // cy.get('register_icon').parent().click();
      cy.get('[class*=register_icon]').parent().click();
      // cy.get('register_container').should('be.visible');
      cy.get('[class*=register_container]').should('be.visible');
    });
  });

  describe('check userName filling successfully', () => {
    it('no empty verify', () => {
      cy.get('#userNameInput')
        .type(' ')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('用户名不能为空');
        });
      cy.get('#userNameInput').clear();
    });
    it('length verify', () => {
      cy.get('#userNameInput')
        .type('wwwwwww')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('用户名不超过6位');
        });
      cy.get('#userNameInput').clear();
    });
    it('fill specified value', () => {
      cy.get('#userNameInput').type('wtz').should('have.value', 'wtz');
    });
  });

  describe('check age filling successfully', () => {
    it('no empty verify', () => {
      cy.get('#ageInput')
        .type(' ')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('年龄不能为空');
        });
      cy.get('#ageInput').clear();
    });
    it('number type verify', () => {
      cy.get('#ageInput')
        .type('lll')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('必须为数字');
        });
      cy.get('#ageInput').clear();
    });
    it('number value limit verify', () => {
      cy.get('#ageInput')
        .type('0')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('必须为1~100之间');
        });
      cy.get('#ageInput').clear();
    });
    it('fill specified value', () => {
      cy.get('#ageInput').type('23').should('have.value', '23');
    });
  });

  describe('check gender filling successfully', () => {
    it('no empty verify', () => {
      cy.get('#genderInput')
        .type(' ')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('性别不能为空');
        });
      cy.get('#genderInput').clear();
    });
    it('value limit verify', () => {
      cy.get('#genderInput')
        .type('mm')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('性别只能为男或女');
        });
      cy.get('#genderInput').clear();
    });
    it('fill specified value', () => {
      cy.get('#genderInput').type('男').should('have.value', '男');
    });
  });

  describe('check password filling successfully', () => {
    it('no empty verify', () => {
      cy.get('#passwordInput')
        .type(' ')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('密码不能为空');
        });
      cy.get('#passwordInput').clear();
    });
    it('value limit verify', () => {
      cy.get('#passwordInput')
        .type('12345678')
        .parent()
        .get('[class*=validateError]')
        .should(($p) => {
          expect($p).to.contain('密码在6位以下');
        });
      cy.get('#passwordInput').clear();
    });
    it('fill specified value', () => {
      cy.get('#passwordInput').type('1234').should('have.value', '1234');
    })
  });

  describe('simulate register', () => {
    sessionStorage.clear();
    it('register successfully alert', function() {
      const alertCallBack = cy.stub();
      cy.on ('window:alert', alertCallBack);
      // cy.on ('window:alert', (str) => {
      //   expect(str).to.equal('注册成功！！');
      // });
      cy.get('[class*=submit_button]')
        .contains('提交')
        .click()
        .then(() => {
          cy.wait(1000);
          console.log('alertCallBack', alertCallBack);
          expect(alertCallBack.getCall(0)).to.be.calledWith('注册成功！！');
        });
    });
  });

  describe('redirect login', () => {
    it('redirect login successfully', () => {
      cy.get('[calss*=login_box]').should('be.visible');
    });
  });

});