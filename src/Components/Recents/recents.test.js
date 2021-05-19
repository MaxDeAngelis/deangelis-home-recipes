import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import Recents from './index';

const mockRecents = [
  {
    id: '1',
    title: 'Buttermilk and honey wheat bread',
    firstName: 'Katie',
    lastName: 'DeAngelis',
    picture: 'images/recipes/recipe_1.png',
  },
  {
    id: '2',
    title: 'Teriyaki beef jerky',
    firstName: 'Max',
    lastName: 'DeAngelis',
    picture: 'images/recipes/recipe_2.png',
  },
];

function renderRecents(recipes) {
  const root = document.createElement('div');
  render(<Recents recipes={recipes} />, root);
}

function textMatches(id, testid, text) {
  const container = screen.getByTestId(`recents-recipe-${id}`);
  expect(within(container).getByTestId(testid).textContent).toEqual(text);
}

describe('GIVEN the home tab is loaded', () => {
  describe('WHEN recent recipes are available', () => {
    beforeEach(() => {
      renderRecents(mockRecents);
    });
    it('THEN the recents header is displayed', async () => {
      expect(screen.getByTestId('recents-header').textContent).toEqual(
        'Recent recipes'
      );
    });
    it('THEN the recents list has 3 columns by default', async () => {
      expect(screen.getByTestId('recents-columns-3'));
    });
    it('THEN the recent recipe image is displayed for 1st recipe', async () => {
      const container = screen.getByTestId('recents-recipe-1');
      expect(within(container).getByTestId('recents-recipe-image').src).toEqual(
        'http://localhost/images/recipes/recipe_1.png'
      );
    });
    it('THEN the recent recipe title is displayed for 1st recipe', async () => {
      textMatches(
        1,
        'recents-recipe-title',
        'Buttermilk and honey wheat bread'
      );
    });
    it('THEN the recent recipe creator is displayed for 1st recipe', async () => {
      textMatches(1, 'recents-recipe-creator', 'by: Katie DeAngelis');
    });
    it('THEN the recent recipe image is displayed for 2nd recipe', async () => {
      const container = screen.getByTestId('recents-recipe-2');
      expect(within(container).getByTestId('recents-recipe-image').src).toEqual(
        'http://localhost/images/recipes/recipe_2.png'
      );
    });
    it('THEN the recent recipe title is displayed for 2nd recipe', async () => {
      textMatches(2, 'recents-recipe-title', 'Teriyaki beef jerky');
    });
    it('THEN the recent recipe creator is displayed for 2nd recipe', async () => {
      textMatches(2, 'recents-recipe-creator', 'by: Max DeAngelis');
    });
  });
  describe('WHEN there are no recent recipes', () => {
    beforeEach(() => {
      renderRecents([]);
    });
    it('THEN no recipes are displayed', async () => {
      expect(screen.getByTestId('recents-columns-3').children.length).toEqual(
        1
      );
    });
  });
  describe('WHEN the window is small', () => {
    beforeEach(() => {
      global.outerWidth = 500;
      renderRecents(mockRecents);
    });
    it('THEN the recents list has 1 column', async () => {
      expect(screen.getByTestId('recents-columns-1'));
    });
  });
});
