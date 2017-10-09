<?php

class GET_DATA_RECENT_FEED extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_DATA_RECENT_FEED);
	}

	public function process() {

		if (isset($_SESSION['user'])) {
			$userId = $_SESSION['user']['userId'];
			$sql = "SELECT * 
						FROM recipes.recipes 
						INNER JOIN person ON(person.personId = recipes.ownerId)
						WHERE name != 'New...' AND name != '' AND (public = 1 OR ownerId = {$userId})
						ORDER BY modDate DESC LIMIT 3";
		} else {
			$sql = "SELECT * 
						FROM recipes.recipes 
						INNER JOIN person ON(person.personId = recipes.ownerId)
						WHERE name != 'New...' AND name != '' AND public = 1
						ORDER BY modDate DESC LIMIT 3";
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
