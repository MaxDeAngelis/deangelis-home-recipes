<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getRecipe.php';

abstract class ACTIONS {
	 const GET_LIST = "GET_LIST";
	 const GET_RECIPE = "GET_RECIPE";
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
