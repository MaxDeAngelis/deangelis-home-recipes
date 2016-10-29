<?php

class GetList extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_LIST);
	}

	public function process() {
		$list = array();
		$response = new DatabaseQuery("SELECT recipeId, name FROM recipes");

		if ($response->sucess) {
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
