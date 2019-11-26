<?php

class Search extends Action {
	public $searchText = "";

	function __construct($data) {
		$this->searchText = $data["searchText"];
		parent::__construct(ACTIONS::SEARCH);
	}

	public function process() {
		if (isset($_SESSION['user'])) {
			$userId = $_SESSION['user']['userId'];

			$sql = "SELECT *
						FROM recipes
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND (public = 1 OR ownerId = {$userId}) AND recipes.name LIKE '%{$this->searchText}%';";

		} else {
			$sql = "SELECT *
						FROM recipes 
						INNER JOIN person ON(person.personId = recipes.ownerId) 
						WHERE recipes.name != '' AND public = 1 AND recipes.name LIKE '%{$this->searchText}%';";
		}

		// https://api.edamam.com/search?app_id=d7649fcb&app_key=d896c35fda02920d86e256e9cb260541&q=gyro

		//$external = file_get_contents("https://api.edamam.com/search?app_id=d7649fcb&app_key=d896c35fda02920d86e256e9cb260541&q=gyro");
		
		/*$external = Unirest\Request::get("https://api.edamam.com/search",
			array('Accept' => 'application/json'),
			array(
				"app_id" => "d7649fcb",
				"app_key" => "d896c35fda02920d86e256e9cb260541",
				"q" => $this->searchText
			)
		);

		foreach ($external->body->hits as $hit) {
			error_log(print_r($hit->recipe->label, true));
		}*/

	
		//error_log(print_r($external->body->hits, true));

		$response = new DatabaseQuery($sql);
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
