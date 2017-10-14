<?php

class UpdateUserStatus extends Action {
	public $userId = "";
	public $status = "";
	public $url = "";

	function __construct($data) {
		$this->userId = $data["userId"];
		$this->status = $data["status"];
		$this->url = $data["url"];
		parent::__construct(ACTIONS::UPDATE_USER_STATUS);
	}
	private function setPending() {
		$sql = "SELECT firstName, lastName, email, userName 
					FROM person RIGHT JOIN users ON(userId = personId)
					WHERE userId = {$this->userId};";
		
		$response = new DatabaseQuery($sql);
		if ($response->sucess) {
			$firstName = $response->results[0]['firstName'];
			$lastName = $response->results[0]['lastName'];
			$email = $response->results[0]['email'];
			$username = $response->results[0]['userName'];

			$tempPassword = "TempPassword-" . rand(0, 999999);
			$hashed = md5($tempPassword);

			$message = 	"Welcome <b>{$firstName} {$lastName}</b> to DeAngelisHome.com!<br><br>" . 
			"Please click the following link to finish registration.<br><br>" . 
			"<a href='{$this->url}#name={$username}&id={$this->userId}&key={$hashed}' >Click to register</a><br><br>" . 
			"<b>Username:</b> {$username}<br><br>Thank You!";

			Utilities::sendMail($email, $lastName, "DeAngelisHome.com - Account Request Approved", $message);

			// Update user in the database
			$response = new DatabaseQuery("UPDATE users SET password ='{$hashed}', status = 'pending' WHERE userId = {$this->userId};");					
			if ($response->sucess) {
				return "{'status' : 'Pending' }";
			}
			return null;
		}
	}

	private function setDisabled() {
		$response = new DatabaseQuery("UPDATE users SET status = 'disabled' WHERE userId = {$this->userId};");					
		if ($response->sucess) {
			return "{'status' : 'Disabled' }";
		}
	}

	public function process() {
		switch ($this->status) {
			case "pending":
				return $this->setPending();
			case "disable":
				return $this->setDisabled();
			default:
				return null;
		}
	}
}

?>
