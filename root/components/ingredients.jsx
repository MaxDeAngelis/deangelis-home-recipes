import React from 'react';

var Ingredients = React.createClass({
    renderDisplay: function() {
        return this.props.data.ingredients.map(function(ing) {
            return <li key = {ing.ingredientId} >{ing.quantity + " " + ing.units + " " + ing.ingredientName} </li>;
        });
    },
    renderForm: function() {
        return this.props.data.ingredients.map(function(ing) {
            return ( <li key = {ing.ingredientId} >
                <input value = {ing.quantity}/>
                <input value = {ing.units}/>
                <input value = {ing.ingredientName}/>
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
                <h3>Ingredients: </h3>
                <ul>{list}</ul>
            </section>
        );
    }
});

export default Ingredients;
