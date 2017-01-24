import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete.jsx';
import Dropdown from './dropdown.jsx';

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
                me.setState({ units: response });
            },
            "json"
        );
    },
    saveIngredients: function(e, key) {
        var value = e.currentTarget.value;
        var i = e.currentTarget.parentNode.dataset.ingKey;

        var tempIngredientsList = this.props.ingredients;

        tempIngredientsList[i][key] = value;

        this.setState({
           currentIngredients: tempIngredientsList
        });

        this.props.update("ingredients", this.props.ingredients);
    },
    updateQuantity: function(e) {
        this.saveIngredients(e, "quantity");
    },
    updateUnit: function(e) {
        this.saveIngredients(e, "units");
    },
    updateIngredientName: function(e) {
        this.saveIngredients(e, "ingredientName");
    },
    deleteIngredient: function(e) {
        var index = e.target.parentNode.dataset.ingKey;

        this.props.delete(index);
    },
    renderDisplay: function() {
        var key = 0;
        return this.props.ingredients.map(function(ing) {
            return <li key = {key++} >{ing.quantity + " " + ing.units + " " + ing.ingredientName}</li>;
        });
    },
    renderForm: function() {
        var key = -1;
        var me = this;
        var source = function( request, response ) {
            response(me.state.ingredients.map(function(ingredient) {
                return ingredient.name;
            }))
        }

        return this.props.ingredients.map(function(ing) {
            key++;
            return ( <li key={key} data-ing-key={key} className="ingredient column column-3">
                    <input value = {ing.quantity} onChange = {me.updateQuantity}/>
                    <Dropdown options = {me.state.units}
                                   change = {me.updateUnit}/>
                    <AutoComplete value = {ing.ingredientName}
                                 source = {source}
                                 change = {me.updateIngredientName}/>
                    <a className="ti-trash" onClick={me.deleteIngredient}/>
                </li>
            );
        });
    },
    render: function() {
        var list;
        var addLink;
        if (this.props.editable) {
            list = this.renderForm();
            addLink = <a className="ti-plus" onClick={this.props.add}>Add ingredient</a>
        } else {
            list = this.renderDisplay();
        }

        return ( <section>
                <label className="data-label">Ingredients</label>
                <ul>{list}</ul>
                {addLink}
            </section>
        );
    }
});

export default Ingredients;
