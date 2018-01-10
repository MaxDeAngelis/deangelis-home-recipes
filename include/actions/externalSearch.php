<?php

class ExternalSearch extends Action {
	public $query = "";

	function __construct($data) {
		$this->query = $data["query"];

		parent::__construct(ACTIONS::EXTERNAL_SEARCH);
	}

	public function process() {
		$endpoint = "https://food2fork.com/api/search?";
		$key = "key=1132f2389852e19d629e0b7d9d7b784f";
		$search = "q=" . $this->query;

		$response = file_get_contents($endpoint . $key . "&" . $search);
		return $response;
	}
}

?>
