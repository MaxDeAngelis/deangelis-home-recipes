<?php

class DatabaseQuery {
	public $sucess = false;
	public $message = "";
	public $count = 0;
	public $results = array();

	function __construct($sql) {
		$conn = new mysqli('localhost', 'recipes', 'recipes', 'recipes');
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

?>
