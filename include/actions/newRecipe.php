<?php

class NewRecipe extends Action {
	public $id = "";

	function __construct() {
		parent::__construct(ACTIONS::NEW_RECIPE);
	}

	public function process() {
		return new Recipe(null);
	}
}

?>
