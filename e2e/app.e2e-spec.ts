import { LocksidianNgPage } from './app.po';

describe('locksidian-ng App', function() {
  let page: LocksidianNgPage;

  beforeEach(() => {
    page = new LocksidianNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
