<?php

class Logout extends Action {
	function __construct($data) {
		parent::__construct(ACTIONS::LOGOUT);
	}

	public function process() {
        session_unset();
        session_destroy();
		return null;
	}
}

?>
