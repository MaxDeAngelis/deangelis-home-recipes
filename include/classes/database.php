<?php
class Database {
	/** getConnection - Returns a connection to the DB
	 **/
	public static function getConnection() {
		return new mysqli('localhost', 'recipes', 'recipes', 'recipes');
	}
}

class DatabaseTransaction {
	public $sucess = false;
	public $message = "";
	public $results = array();

	function __construct($sqlList) {
		$conn = Database::getConnection();
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$this->message = "Connection failed: " . $conn->connect_error;
		} else {
			$conn->begin_transaction();

			foreach ($sqlList as $sql) {
				$result = $conn->query($sql);
				#error_log($sql);
				#error_log(print_r($result, true));
				array_push($this->results, $result);
				
	        }

			$conn->commit();
			$conn->close();

			if ($result === false) {
				$this->message = 'Failed to update database';
			} else {
				$this->sucess = true;
			}
		}

	}
}

class DatabaseQuery {
	public $sucess = false;
	public $message = "";
	public $count = 0;
	public $results = array();

	function __construct($sql) {
		$conn = Database::getConnection();
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$this->message = "Connection failed: " . $conn->connect_error;
		} else {
			$result = $conn->query($sql);
			$conn->close();

			if ($result === false) {
				$this->message = 'Failed to retrieve data from server. Query: ' . $sql;
			} else if ($result->num_rows == 0) {
				$this->message = 'No results. Query: ' . $sql;
			} else {
				$this->sucess = true;
				$index = 0;

				while($row = $result->fetch_assoc()) {
					$this->results[] = $row;
					$index++;
				}

				$this->count = $index;
			}
		}
	}
}

class DatabaseUpdate {
	public $sucess = false;
	public $message = "";

	function __construct($sql) {
		$conn = Database::getConnection();
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
			$this->message = "Connection failed: " . $conn->connect_error;
		} else {
			$result = $conn->query($sql);
			$conn->close();

			if ($result === false) {
				$this->message = 'Failed to update database';
			} else {
				$this->sucess = true;
			}
		}
	}
}
?>
