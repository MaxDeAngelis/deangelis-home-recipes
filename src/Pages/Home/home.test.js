import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home from './index';

const mockStore = configureMockStore();
function renderHome(state) {
  const store = mockStore(state);
  const root = document.createElement('div');
  render(
    <Provider store={store}>
      <Home site="test" />
    </Provider>,
    root
  );
}

describe('GIVEN DeAngelis Home Recipe site is active', () => {
  describe('WHEN the home tab is loaded', () => {
    beforeEach(() => {
      renderHome({
        site: {
          user: null,
        },
        recipe: {
          recents: [],
        },
      });
    });
    it('THEN the welcome message exists', async () => {
      expect(screen.getByTestId('home-welcome-message')).toBeTruthy();
    });
    it('THEN the welcome message ', async () => {
      expect(screen.getByTestId('home-welcome-message').textContent).toEqual(
        'Welcome to DeAngelis Home!'
      );
    });
  });
  describe('WHEN the home tab is loaded for a logged in user', () => {
    beforeEach(() => {
      renderHome({
        site: {
          user: {
            firstName: 'Max',
            lastName: 'DeAngelis',
          },
        },
        recipe: {
          recents: [],
        },
      });
    });
    it('THEN the welcome message welcomes the logged in user', async () => {
      expect(screen.getByTestId('home-welcome-message').textContent).toEqual(
        'Welcome back Max DeAngelis'
      );
    });
  });
});
