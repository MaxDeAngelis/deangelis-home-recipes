<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getRecipe.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getDataIngredients.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getDataUnits.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/saveRecipe.php';

abstract class ACTIONS {
	 const GET_LIST = "GET_LIST";
	 const GET_RECIPE = "GET_RECIPE";
	 const GET_DATA_INGREDIENTS = "GET_DATA_INGREDIENTS";
	 const GET_DATA_UNITS = "GET_DATA_UNITS";
	 const SAVE_RECIPE = "SAVE_RECIPE";
}

class Action {
	public $name = "";
	public $sucess = false;

	function __construct($action_name) {
		$this->name = $action_name;
	}

	// EXTENSIONS
	public function process() {}
}

?>
