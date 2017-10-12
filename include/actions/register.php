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
		//Utilities::sendMail($this->email, $this->lastName, "Register from - " . $this->username, "<div style='background-color: blue;'><h1>Hello There Test!</h1></div>");

		$sql = "SELECT RegisterUser('{$this->firstName}','{$this->lastName}','{$this->username}','{$this->email}');";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			return "{'status' : 'Registered' }";
		}
		
		return null;
	}
}

?>
