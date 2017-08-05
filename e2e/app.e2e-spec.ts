import { ContactlistPage } from './app.po';

describe('contactlist App', () => {
  let page: ContactlistPage;

  beforeEach(() => {
    page = new ContactlistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
