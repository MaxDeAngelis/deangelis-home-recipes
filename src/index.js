import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import thunkMiddleware from 'redux-thunk'
import CssBaseline from '@material-ui/core/CssBaseline';
import Application from './components/application';
import siteReducer from './lib/reducers';

const store = createStore(siteReducer, {
        site : {
            nav : {
                open : false,
                items : [
                    {
                        id : "home",
                        selected : true
                    }
                ]
            }
        },
        recipe : {
            recents : [],
            searchResults : []
        }
    },
    applyMiddleware(
        thunkMiddleware
    )
);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main : "#0E563B"
        },
        secondary: {
            main : "#0E563B"
        },
        background: {
            default : "#e2e2e2",
            paper: "#A3AF8D"
        }
    },
    overrides : {
        drawerWidth : 250
    }
});

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <Application/>
        </Provider>
    </MuiThemeProvider>, 
    document.getElementById('root')
);