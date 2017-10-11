<?php

class Register extends Action {
	public $firstName = "";
	public $lastName = "";
	public $email = "";
	public $username = "";

	function __construct($data) {
		$this->firstName = $data["firstName"];
		$this->lastName = $data["lastName"];
		$this->email = $data["email"];
		$this->username = $data["username"];
		parent::__construct(ACTIONS::REGISTER);
	}

	public function process() {
		# INFO: Cant use a transaction because need the return value from new recipe for id
		# First add a new recipe
		$sql = "SELECT RegisterUser('{$this->firstName}','{$this->lastName}','{$this->username}','{$this->email}');";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			return "{'status' : 'Registered' }";
		}
		
		return null;
	}
}

?>
