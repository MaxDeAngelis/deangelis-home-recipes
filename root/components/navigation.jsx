import React from 'react';
import ReactDOM from 'react-dom';
require("../style/components/navigation.scss");

var Navigation = React.createClass({
    home: function() {
        var openContent = document.querySelector(".open-content");
        ReactDOM.unmountComponentAtNode(openContent);
        //ReactDOM.render(<Recipe data={response} />, openContent);
    },
    toggle: function() {
        var nav = document.querySelector(".navigation");
        if (nav.className == "navigation") {
            nav.className += " show";
        } else {
            nav.className = "navigation";
        }
    },
    _getId: function(element) {
        var currentElement = element;
        while (!currentElement.classList.contains("link")) {
            currentElement = currentElement.parentElement;
        }
        return currentElement.dataset.id;
    },
    handleClick: function(e) {
        this.props.aOpenContent(this._getId(e.target));
        e.stopPropagation();
    },
    handleClose: function(e) {
        this.props.aCloseRecipe(this._getId(e.target));
        e.stopPropagation();
    },
    render: function() {
        var nav = this;
        var list = this.props.sOpenList.map(function (item) {
            var classes = "link hover"; 
            if (item.active) {
                classes = "link hover active";
            }
            
            if (item.id == "home") {
                classes += " ti-home";
                return (<li key={item.id} className={classes} data-id="home" onClick={nav.handleClick}>
                    <span className="text">Home</span>
                </li>);
            } else if (item.id == "new") {
                if (nav.props.sUser != null) {
                    classes += " ti-plus";
                    return (<li key={item.id} className={classes} data-id="new" onClick={nav.props.aNewRecipe}>
                        <span className="text">New</span>
                    </li>);                    
                }            
            } else {
                return (<li key={item.id} data-id={item.id} className={classes} onClick={nav.handleClick}>
                    <img className="image" src={item.recipe.picture + "?" + new Date().getTime()} />
                    <span className="text truncate" title={item.recipe.title}>{item.recipe.title}</span>
                    <a className="ti-close" onClick={nav.handleClose}></a>{close}
                </li>);
            }
        });
        
        return (<ul className="navigation-content">
            <li className="link"><a className="toggle" onClick={this.toggle}></a></li>
            {/*<li className="link ti-user hover" data-id="user" onClick={this.home}><span className="text">Administrator</span></li>*/}
            {list}
        </ul>
        );
    }
});

export default Navigation;
