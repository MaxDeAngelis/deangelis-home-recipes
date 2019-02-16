<?php

class Search extends Action {
	public $searchText = "";

	function __construct($data) {
		$this->searchText = $data["searchText"];
		parent::__construct(ACTIONS::SEARCH);
	}

	public function process() {
		if (isset($_SESSION['user'])) {
			$userId = $_SESSION['user']['userId'];

			$sql = "SELECT recipeId, name, picture, firstName, lastName, public, ownerId, modDate 
						FROM recipes
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND (public = 1 OR ownerId = {$userId}) AND recipes.name LIKE '%{$this->searchText}%';";

		} else {
			$sql = "SELECT recipeId, name, picture, firstName, lastName, public, ownerId, modDate
						FROM recipes 
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND public = 1 AND recipes.name LIKE '%{$this->searchText}%';";
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
