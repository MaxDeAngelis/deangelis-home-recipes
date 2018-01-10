<?php

class ExternalOpen extends Action {
	public $id = "";

	function __construct($data) {
		$this->id = $data["id"];

		parent::__construct(ACTIONS::EXTERNAL_OPEN);
	}

	public function process() {
		$endpoint = "https://food2fork.com/api/get?";
		$key = "key=1132f2389852e19d629e0b7d9d7b784f";
		$rId = "rId=" . $this->id;

		$response = file_get_contents($endpoint . $key . "&" . $rId);
		return $response;
	}
}

?>
