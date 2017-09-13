<?php

class GetDataIngredients extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_DATA_INGREDIENTS);
	}

	public function process() {
		// First get the body of the recipe
		$sql = "SELECT ingredientId, ingredientName, defaultUnit
								FROM ingredients
								ORDER BY ingredientName;";
								
		$response = new DatabaseQuery($sql);

		if ($response->sucess) {
			$list = array();
			foreach ($response->results as $value) {
	            $list[] = new Ingredient($value);
	        }
			return $list;
		} else {
			return null;
		}
	}
}

?>
