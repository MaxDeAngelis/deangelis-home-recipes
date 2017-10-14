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
		$sql = "SELECT RegisterUser('{$this->firstName}','{$this->lastName}','{$this->username}','{$this->email}', 'user');";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			return "{'status' : 'Registered' }";
		}
		
		return null;
	}
}

?>
