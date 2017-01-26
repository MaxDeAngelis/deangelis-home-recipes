import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete.jsx';
import Dropdown from './dropdown.jsx';

require("../style/components/ingredients.scss");

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
        var list = this.props.ingredients.map(function(ing) {
            return <li key = {key++} >{ing.quantity + " " + ing.units + " " + ing.ingredientName}</li>;
        });

        return (<ul>{list}</ul>);
    },
    renderForm: function() {
        var key = -1;
        var me = this;
        var source = function( request, response ) {
            response(me.state.ingredients.map(function(ingredient) {
                return ingredient.name;
            }))
        }

        var list = this.props.ingredients.map(function(ing) {
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

        return (<ul className="editable">
            {list}
            <li><a className="ti-plus" onClick={this.props.add}>Add ingredient</a></li>
        </ul>);
    },
    render: function() {
        var list;
        if (this.props.editable) {
            list = this.renderForm();
        } else {
            list = this.renderDisplay();
        }

        return ( <section className="recipe-ingredients">
                <label className="data-label">Ingredients</label>
                {list}
            </section>
        );
    }
});

export default Ingredients;
