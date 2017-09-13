<?php

class NewRecipe extends Action {
	public $id = "";

	function __construct() {
		parent::__construct(ACTIONS::NEW_RECIPE);
	}

	public function process() {
		# INFO: Cant use a transaction because need the return value from new recipe for id
		# First add a new recipe
		$response = new DatabaseQuery("SELECT NewRecipe();");

		if ($response->sucess) {
			$newId = $response->results[0]["NewRecipe()"];
			# Once in the DB query the object and pass to recipe class
			$response = new DatabaseQuery("SELECT * FROM recipes WHERE recipeId = {$newId};");
			if ($response->sucess) {
				return new Recipe($response->results[0]);
			}
		}
		
		return null;
	}
}

?>
