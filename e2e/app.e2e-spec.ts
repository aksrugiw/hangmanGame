import { HangmanPage } from './app.po';

describe('hangman App', function() {
  let page: HangmanPage;

  beforeEach(() => {
    page = new HangmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
