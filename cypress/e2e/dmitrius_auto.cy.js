import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/data.json"

describe('Проверка авторизации на сайте login.qa.studio', function() {

    beforeEach('Начало теста', function () {
        cy.visit(data.site);
          });

  afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.close).should('be.visible');
       });

    
    it('Верный логин и пароль', function() {

    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Авторизация прошла успешно');

})

    it('Проверка логики восстановления пароля', function() {

    cy.get(main_page.fogot_pass_btn).click();
    cy.get(recovery_password_page.email).type(data.login);
    cy.get(recovery_password_page.send_button).click();
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');

})

    it('Верный логин и неверный пароль', function() {

    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type(data.NotCorrectPassword);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Такого логина или пароля нет');

})

    it('Неверный логин и верный пароль', function() {

    cy.get(main_page.email).type(data.NotCorrectlogin);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Такого логина или пароля нет');

})

    it('Логин без @', function() {

    cy.get(main_page.email).type(data.loginNoDog);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');

})

    it('Приведение к строчным буквам', function() {

    cy.get(main_page.email).type(data.loginUpDown);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Авторизация прошла успешно');

})

})