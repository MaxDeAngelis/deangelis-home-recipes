<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getList.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getRecipe.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/newRecipe.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getDataIngredients.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getDataUnits.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/getDataRecentFeed.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/saveRecipe.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/uploadImage.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/cropImage.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/login.php';

abstract class ACTIONS {
	 const GET_LIST = "GET_LIST";
	 const GET_RECIPE = "GET_RECIPE";
	 const NEW_RECIPE = "NEW_RECIPE";
	 const GET_DATA_INGREDIENTS = "GET_DATA_INGREDIENTS";
	 const GET_DATA_UNITS = "GET_DATA_UNITS";
	 const GET_DATA_RECENT_FEED = "GET_DATA_RECENT_FEED";
	 const SAVE_RECIPE = "SAVE_RECIPE";
	 const UPLOAD_IMAGE = "UPLOAD_IMAGE";
	 const CROP_IMAGE = "CROP_IMAGE";
	 const LOGIN = "LOGIN";
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
