<?php

class Login extends Action {
    public $username = "";
    public $password = "";

	function __construct($data) {
        $this->username = htmlspecialchars($data["username"]);
        $this->password = htmlspecialchars($data["password"]);
		parent::__construct(ACTIONS::LOGIN);
	}

	public function process() {
        if (isset($_SESSION['user'])) {
            return $_SESSION['user'];
        } else {
            //Checks the username and password
            $sql = "SELECT password, userId, firstName, lastName, roleType 
            FROM users RIGHT JOIN person ON(personId = userId) NATURAL JOIN userRole
            WHERE username = '{$this->username}';";

            $response = new DatabaseQuery($sql);

            if ($response->sucess) {
                $result = $response->results[0];
                if ($response->results[0]["password"] == $this->password) {

                    $user = Array(
                        "firstName" => $result["firstName"],
                        "lastName" => $result["lastName"],
                        "roleType" => $result["roleType"],
                        "userId" => $result["userId"],
                    );
                    $_SESSION['user'] = $user;
                    return $user;
                }   
            }
        }
		return null;
	}
}

?>
