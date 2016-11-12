<?php

class GetDataUnits extends Action {
	function __construct() {
		parent::__construct(ACTIONS::GET_DATA_UNITS);
	}

	public function process() {
		// First get the body of the recipe
		$sql = "SELECT DISTINCT defaultUnit FROM ingredients;";
		$response = new DatabaseQuery($sql);

		if ($response->sucess) {
			$list = array();
			foreach ($response->results as $value) {
	            array_push($list, $value['defaultUnit']);
	        }
			return $list;
		} else {
			return null;
		}
	}
}

?>
