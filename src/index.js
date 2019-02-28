import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import thunkMiddleware from 'redux-thunk'
import CssBaseline from '@material-ui/core/CssBaseline';
import Application from './components/pages/application';
import siteReducer from './lib/reducers';

const store = createStore(siteReducer, {
        site : {
            loginOpen: false,
            user: null,
            nav : {
                open : false,
                items : [
                    {
                        id : "home",
                        title : "Home",
                        category : "SITE",
                        selected : true
                    },{
                        id : "search",
                        title : "Search results",
                        category : "SITE",
                        selected : false
                    },{
                        id : "new",
                        title : "New recipe",
                        category : "SITE",
                        selected : false
                    }
                ]
            }
        },
        recipe : {
            recents : [],
            searchResults : [],
            open : []
        }
    },
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware
        )
    )
);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main : "#162856"
        },
        secondary: {
            main : "#0E563B"
        },
        background: {
            default : "#e2e2e2",
            paper: "#1226593d"
        }
    },
    overrides : {
        drawerWidth : 250
    }
});

let persistor = persistStore(store)

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CssBaseline />
                <Application/>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>, 
    document.getElementById('root')
);