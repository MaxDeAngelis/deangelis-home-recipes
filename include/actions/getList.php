<?php

class GetList extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_LIST);
	}

	public function process() {
		if (isset($_SESSION['user'])) {
			$userId = $_SESSION['user']['userId'];

			$sql = "SELECT recipeId, name, picture, firstName, lastName, public, ownerId 
						FROM recipes
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND (public = 1 OR ownerId = {$userId});";

		} else {
			$sql = "SELECT recipeId, name, picture, firstName, lastName, public, ownerId 
						FROM recipes 
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND public = 1;";
		}
	
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			$list = array();

			foreach ($response->results as $value) {
	            $list[] = new Recipe($value);
	        }
			return $list;
		} else {
			return null;
		}
	}
}

?>
