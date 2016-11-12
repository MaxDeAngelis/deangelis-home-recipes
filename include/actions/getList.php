<?php

class GetList extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_LIST);
	}

	public function process() {
		$response = new DatabaseQuery("SELECT recipeId, name FROM recipes");

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
