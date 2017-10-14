<?php

class UpdatePassword extends Action {
	public $userId = "";
	public $oldPassword = "";
	public $newPassword = "";

	function __construct($data) {
		$this->userId = $data["userId"];
		$this->oldPassword = $data["oldPassword"];
		$this->newPassword = $data["newPassword"];
		parent::__construct(ACTIONS::UPDATE_PASSWORD);
	}

	public function process() {
		$sql = "SELECT userName, password 
					FROM users
					WHERE userId={$this->userId};";

		$response = new DatabaseQuery($sql);
		if ($response->sucess && $response->results[0]["password"] == $this->oldPassword) {
			$username = $response->results[0]["userName"];
			$sql = "UPDATE users 
						SET password ='{$this->newPassword}', status = 'current' 
						WHERE userId = {$this->userId};";

			$response = new DatabaseUpdate($sql);
			if ($response->sucess) {
				$data = Array(
					"username" => $username,
					"password" => $this->newPassword
				);

				$logout = new Logout($data);
				$logout->process();

				$login = new Login($data);
				return $login->process();
			}
		}		
		return null;
	}
}

?>
