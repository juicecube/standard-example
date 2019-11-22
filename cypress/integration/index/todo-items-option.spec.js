
describe('todo items option', () => {
  describe('login home page', () => {
    it('login home page successfully', () => {
      cy.login('wtz', '1234');
    });
  });
  describe('add todo items', () => {
    it('add todo a item successfully', () => {
      localStorage.clear();
      cy.get('[class*=add_new_item]').click();
      // localStorage.getItem('todoListData').length.should('');
      cy.get('[class*="todo-list-item-index__container"]').should('be.visible');
    });
  });
  describe('spread function successfully', () => {
    it('spread function', () => {
      cy.get('[class*="todo-list-item-index__container"]').click();
      cy.get('[class*="list-item-index__details"]').should('be.visible');
    });
  });
  describe('edit remark content', () => {
    it('click edit button, then display the inputarea', () => {
      cy.get('[class*="todo-list-item-index__edit_button"]').click();
      cy.get('[class*="mark_details_textarea"]').should('be.visible');
    });
    it('change remark content', () => {
      cy.get('[class*="mark_details_textarea"]').type('这是一个备注').should('have.value', '这是一个备注');
      cy.get('[class*="todo-list-item-index__save_button"]').click();
      cy.get('[class*="mark_details_span"]').should('contain.value', "这是一个备注");
    });
  });
  describe('change todo title', () => {
    it('show edit status', () => {
      cy.get('[class*="todo-list-item-index__container"]').click();
      cy.get('[class*="overview_editable_area"]').click();
      cy.get('[class*="overview_input"]').should('be.visible');
    });
    it('change todo title', () => {
      cy.get('[class*="overview_input"]').type('这是一个标题').should('have.value', '这是一个标题');
      cy.get('[class*="overview_input_save_button"]').click();
      cy.get('[class*="overview_editable_area"]').should('have.value', '这是一个标题');
    });
  });
  describe('delete todo items', () => {
    it('delete todo item', () => {
      cy.get('[class*="delete_icon"]').click();
      cy.get('[class*="todo-list-item-index__container"]').should('not.be.visible');
    });
  });
})