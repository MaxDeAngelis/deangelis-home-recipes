<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/modules/Unirest/Unirest.php';

class ExternalSearch extends Action {
	public $query = "";

	function __construct($data) {
		$this->query = $data["query"];

		parent::__construct(ACTIONS::EXTERNAL_SEARCH);
	}

	public function process() {
		$use = 3;
		if ($use == 1) {
			$response = Unirest\Request::get("https://food2fork.com/api/search", null,
				array(
					"key" => "1132f2389852e19d629e0b7d9d7b784f",
					"q" => $this->query
				)
			);
		} elseif ($use == 2) {
			$response = Unirest\Request::get("https://api.edamam.com/search", null,
				array(
					"app_id" => "19ffa89f",
					"app_key" => "e85df3f5fe982b53d140271c94193b40",
					"q" => $this->query
				)
			);
		} elseif ($use == 3) {
			$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search",
				array(
					"X-Mashape-Key" => "szCweNvVtTmshzgBOVW0iilv2Brtp1XPFwijsnTw76PcD3MKwf",
					"Accept" => "application/json"
				),
				array(
					"query" => $this->query
				)
			);
		}

		return $response;
	}
}

?>
