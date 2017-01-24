<?php

class GetRecipe extends Action {
	public $id = "";

	function __construct($data) {
		$this->id = $data["id"];

		parent::__construct(ACTIONS::GET_LIST);
	}

	public function process() {
		// First get the body of the recipe
		$sql = "SELECT recipeId, firstName, lastName, name, servings, cookTime, prepTime, category, season, modDate, steps, picture, A.rating AS 'rating', A.total AS 'totRating', ownerId
					FROM recipes INNER JOIN person ON(person.personId = recipes.ownerId), (SELECT AVG(rating) AS rating, COUNT(rating) AS total FROM ratingref WHERE recipeId = {$this->id}) A
					WHERE recipeId = {$this->id};";
		$response = new DatabaseQuery($sql);

		if ($response->sucess) {
			$recipe = $response->results[0];

			// Get the ingredients for the given recipe
			$sql = "SELECT refId, quantity, units, ingredientName, ingredientId
						FROM recipes NATURAL JOIN recipeingredients LEFT JOIN ingredients USING(ingredientId)
						WHERE recipeId = {$this->id};";
			$response = new DatabaseQuery($sql);

			// If the ingredients were found then return the entire recipe
			if ($response->sucess) {
				$recipe["ing"] = $response->results;

				return new Recipe($recipe);
			}
		}
		return null;
	}
}

?>
