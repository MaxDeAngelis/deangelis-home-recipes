require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';

ReactDOM.render(<Header/>,
    document.querySelector("header")
);
ReactDOM.render(<Navigation/>,
    document.querySelector(".navigation")
);
