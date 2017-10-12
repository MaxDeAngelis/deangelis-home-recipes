<?php
	class Utilities {
		/** sendMail - Uses PHPMailer to send an email
		 * @param $address - Email address to send mail to
		 * @param $name - Name of the recipient
		 * @param $subject - Subject line of the email
		 * @param $message - Body of the message 
		 **/
		 public static function sendMail($address, $name, $subject, $message) {
			$mail = new PHPMailer(); // create a new object
			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'smtp.gmail.com';                       // Specify main and backup server
			$mail->SMTPAuth = true;                               // Enable SMTP authentication
			$mail->Username = "recipes.deangelishome@gmail.com";
			$mail->Password = "awtsatfrhyusuhht";
			$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
			$mail->Port = 587; 

			$mail->SMTPDebug = false; // debugging: 1 = errors and messages, 2 = messages only
			$mail->IsHTML(true);
			$mail->SetFrom("DoNotReply@DeAngelisHome.com", "DeAngelisHome.com");
			$mail->Subject = $subject;
			$mail->Body = $message;
			$mail->addAddress($address, $name);

		 	if(!$mail->Send()) {
		 		return false;
		    } else {
		    	return true;
			}
		}
		/** encodeArray - Parses through an array and encode the values for the DBs
		 * @param $array - The array to encode
		 **/
		public static function encodeArray($array) {
			$returnArray = array();
			foreach($array as $key => $val) {
				if (is_array($val)) {
					$returnArray[$key] = Utilities::encodeArray($val);
				} else {
				    $returnArray[$key] = Utilities::encodeString($val);
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
					$returnArray[$key] = Utilities::decodeArray($val);
				} else {
				    $returnArray[$key] = Utilities::decodeString($val);
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
