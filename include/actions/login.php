<?php

class Login extends Action {
    public $username = "";
    public $password = "";

	function __construct($data) {
        if (isset($data["username"])) {
            $this->username = htmlspecialchars($data["username"]);            
        }
        if (isset($data["password"])) {
            $this->password = htmlspecialchars($data["password"]);            
        }
		parent::__construct(ACTIONS::LOGIN);
	}

	public function process() {
        if (isset($_SESSION['user'])) {
            return $_SESSION['user'];
        } else if ($this->username != "") {
            //Checks the username and password
            $sql = "SELECT password, userId, firstName, lastName, roleType 
                        FROM users RIGHT JOIN person ON(personId = userId) NATURAL JOIN userRole
                        WHERE username = '{$this->username}';";

            $response = new DatabaseQuery($sql);

            if ($response->sucess) {
                $result = $response->results[0];
                if ($response->results[0]["password"] == $this->password) {
                    $requests = [];
                    if ($result["roleType"] == "admin") {
                        $requestsSql ="SELECT firstName, lastName, email, userId, userName, status
                                    FROM person RIGHT JOIN users ON(userId = personId)
                                    WHERE status = 'request';";

                        $getRequests = new DatabaseQuery($requestsSql);
                        if ($getRequests->sucess) {
                            $requests = $getRequests->results;
                        }
                    }


                    $user = Array(
                        "firstName" => $result["firstName"],
                        "lastName" => $result["lastName"],
                        "roleType" => $result["roleType"],
                        "userId" => $result["userId"],
                        "requests" => $requests
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
