<?php
	class Utilities {
		/** encodeArray - Parses through an array and encode the values for the DBs
		 * @param $array - The array to encode
		 **/
		public static function encodeArray($array) {
			$returnArray = array();
			foreach($array as $key => $val) {
				if (is_array($val)) {
					$returnArray[$key] = Utils::encodeArray($val);
				} else {
				    $returnArray[$key] = Utils::encodeString($val);
				}
			}
			return $returnArray;
		}

		/** decodeArray - Parses through an array and decode the values for the DBs
		 * @param $array - The array to decode
		 **/
		public static function decodeArray($array) {
			$returnArray = array();
			foreach($array as $key => $val) {
				if (is_array($val)) {
					$returnArray[$key] = Utils::decodeArray($val);
				} else {
				    $returnArray[$key] = Utils::decodeString($val);
				}
			}
			return $returnArray;
		}

		/** encodeString - Encodes the given string using the DBs encoding
		 * @param $string - The string to encode
		 **/
		public static function encodeString($string) {
			// Get a handle on the DB connection
			$mysqli = Database::getConnection();

			// Strip the special charecters
			$string = htmlspecialchars($string);

			// Escape string for DB usage
			$string = $mysqli->escape_string($string);

			// Close the connection
			$mysqli->close();

			// Return the escaped string
			return $string;
		}

		/** decodeString - Decodes the given string using the DBs encoding
		 * @param $string - The string to decode
		 **/
		public static function decodeString($string) {
			return stripslashes($string);
		}
	}
?>
