<?php

class ExternalOpen extends Action {
	public $id = "";

	function __construct($data) {
		$this->id = $data["id"];

		parent::__construct(ACTIONS::EXTERNAL_OPEN);
	}

	public function process() {
		$use = 1;

		if ($use == 1) {
			$response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" .  $this->id. "/information",
				array(
					"X-Mashape-Key" => "szCweNvVtTmshzgBOVW0iilv2Brtp1XPFwijsnTw76PcD3MKwf",
					"Accept" => "application/json"
				)
			);
		} else {
			$endpoint = "https://food2fork.com/api/get?";
			$key = "key=1132f2389852e19d629e0b7d9d7b784f";
			$rId = "rId=" . $this->id;

			$response = file_get_contents($endpoint . $key . "&" . $rId);
		}

		return $response;
	}
}

?>
