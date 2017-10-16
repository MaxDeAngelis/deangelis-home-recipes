import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from './autocomplete.jsx';

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
        this.props.aServerRequest(
            { 
                action: 'GET_DATA_INGREDIENTS' 
            },
            function (response) {
                me.setState({ ingredients: response });
            },
            true
        );

        this.props.aServerRequest(
            { 
                action: 'GET_DATA_UNITS' 
            },
            function (response) {
                me.setState({ units: response });
            },
            true
        );
    },
    saveIngredients: function(e, key) {
        var value = e.target.value;
        var ingKey = null;
        var currentElement = e.currentTarget;
        while (ingKey == null) {
            if (currentElement.dataset.ingKey != null) {
                ingKey = currentElement.dataset.ingKey;
                break;
            } else {
                currentElement = currentElement.parentNode;
            }
        }

        var tempIngredientsList = this.props.ingredients;

        tempIngredientsList[ingKey][key] = value;

        this.setState({
           currentIngredients: tempIngredientsList
        });

        this.props.aUpdateValue("ingredients", this.props.ingredients);
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
        var ingredients = this.props.ingredients;
        ingredients.splice(index, 1);

        this.props.aUpdateValue("ingredients", ingredients);
    },
    renderDisplay: function() {
        var key = 0;
        var list = this.props.ingredients.map(function(ing) {
            if (ing.ingredientName == "") {
                return <li key = {key++} >Please enter ingredient...</li>;                
            } else {
                return <li key = {key++} >{ing.quantity + " " + ing.units + " " + ing.ingredientName}</li>;                
            }
        });

        return (<ul>{list}</ul>);
    },
    renderForm: function() {
        var key = -1;
        var me = this;
        var ingredientList = [];
        for (var i = 0; i < this.state.ingredients.length; i++) {
            ingredientList.push(this.state.ingredients[i].ingredientName);
        }

        var list = this.props.ingredients.map(function(ing) {
            var quantityClasses = "quantity";
            var unitsClasses = "units";
            var ingredientClasses = "name";

            if (me.props.validate) {
                if (ing.quantity == null || ing.quantity == "") {
                    quantityClasses += " required";
                }
                if (ing.units == null || ing.units == "") {
                    unitsClasses += " required";
                }
                if (ing.ingredientName == null || ing.ingredientName == "") {
                    ingredientClasses += " required";
                }
            }
            key++;
            return ( <li key={key} data-ing-key={key} className="ingredient column column-3">
                    <input value = {ing.quantity} 
                                type="number"
                                placeholder = "Quantity..."
                                className = {quantityClasses}
                                onChange = {me.updateQuantity}
                    />
                    <AutoComplete value = {ing.units}
                                 placeholder = "Unit..."
                                 customClass = {unitsClasses}
                                 source = {me.state.units}
                                 change = {me.updateUnit}/>        
                    <AutoComplete value = {ing.ingredientName}
                                 placeholder = "Ingredient..."
                                 customClass = {ingredientClasses}
                                 source = {ingredientList}
                                 change = {me.updateIngredientName}/>
                    <a className="ti-trash" onClick={me.deleteIngredient}/>
                </li>
            );
        });

        return (<ul className="editable">
            {list}
            <li><a className="ti-plus" onClick={this.props.aAddIngredient}>Add ingredient</a></li>
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
