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
		$sql = "SELECT userName 
					FROM users 
					WHERE userName = '{$this->username}';";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			if ($response->results[0] != null) {
				return Array(
						"status" => "fail",
						"field" => "username",
                        "message" => "An account with this username already exists, please choose a different username"
                );
			}
		}

		$sql = "SELECT email
					FROM person RIGHT JOIN users ON(userId = personId)
					WHERE email = '{$this->email}';";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			if ($response->results[0] != null) {
				return Array(
						"status" => "fail",
						"field" => "email",
                        "message" => "An account with this email address already exists, please contact the administrator if you believe this is an error"
                );
			}
		}


		$sql = "SELECT RegisterUser('{$this->firstName}','{$this->lastName}','{$this->username}','{$this->email}', 'user');";
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			$message = 	"The user <b>{$this->firstName} {$this->lastName}</b> has requested an account with DeAngelisHome.com!<br><br>" . 
			"Please login to review the request.<br><br>" . 
			"<a href='www.DeAngelisHome.com' >DeAngelis Home</a><br><br>" . 
			"<br><br>Thank You!";
			Utilities::sendMail('Maxwell.DeAngelis@gmail.com', 'Max', "DeAngelisHome.com - Account Request", $message);

			return Array(
				"status" => "success"
			);
		}
		
		return Array("status" => "fail");
	}
}

?>
