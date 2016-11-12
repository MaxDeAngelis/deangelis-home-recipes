import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete.jsx';
import Dropdown from './dropdown.jsx';
import $ from 'jquery';

var Ingredients = React.createClass({
    getInitialState: function() {
        return {
            ingredients: [],
            units: []
        };
    },
    componentWillMount: function() {
        var me = this;
        $.get('../processAction.php',
            { action: 'GET_DATA_INGREDIENTS' },
            function(response) {
                me.setState({ ingredients: response });
            },
            "json"
        );

        $.get('../processAction.php',
            { action: 'GET_DATA_UNITS' },
            function(response) {
                debugger
                me.setState({ units: response });
            },
            "json"
        );
    },
    renderDisplay: function() {
        var key = 0;
        return this.props.data.ingredients.map(function(ing) {
            return <li key = {key++} >{ing.quantity + " " + ing.units + " " + ing.ingredientName} </li>;
        });
    },
    renderForm: function() {
        var key = 0;
        var me = this;
        return this.props.data.ingredients.map(function(ing) {
            var source = function( request, response ) {
                response(me.state.ingredients.map(function(ingredient) {
                    return ingredient.name;
                }))
            }

            return ( <li key = {key++} className="column column-3">
                    <input value = {ing.quantity}/>
                    <Dropdown options = {me.state.units}
                                   change = {function(){}}/>
                    <AutoComplete value = {ing.ingredientName}
                                 source = {source}
                                 change = {function(){}}/>
                </li>
            );
        });
    },
    render: function() {
        var list;
        if (this.props.data.editable) {
            list = this.renderForm();
        } else {
            list = this.renderDisplay();
        }

        return ( <section>
                <label className="data-label">Ingredients</label>
                <ul>{list}</ul>
            </section>
        );
    }
});

export default Ingredients;
