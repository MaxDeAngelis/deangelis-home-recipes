<?php

class UploadImage extends Action {
    public $image = array();
	function __construct($data) {
        $this->image = $data;
		parent::__construct(ACTIONS::UPLOAD_IMAGE);
	}

	public function process() {
		$imagePath = $_SERVER['DOCUMENT_ROOT'] . "/images/recipes/";
		$allowedExts = array("gif", "jpeg", "jpg", "png", "GIF", "JPEG", "JPG", "PNG");
		$temp = explode(".", $this->image["name"]);

        
		$extension = end($temp);

		//Check write Access to Directory
		if (!is_writable($imagePath)) {
			$response = Array(
				"status" => 'error',
				"message" => 'Can`t upload File; no write Access' );
			return $response;
		}

		if ( in_array($extension, $allowedExts)) {
			if ($this->image["error"] > 0) {
				$response = array(
					"status" => 'error',
					"message" => 'ERROR Return Code: '. $this->image["error"]
				);			
			} else {
				$filename = $this->image["tmp_name"];
				list($width, $height) = getimagesize( $filename );

				$newLocation = "temp_recipe_".rand().".".$extension;
				move_uploaded_file($filename,  $imagePath . $newLocation);

				$response = array(
					"status" => 'success',
					"url" => "images/recipes/" . $newLocation,
					"width" => $width,
					"height" => $height );
			}
		} else {
			$response = array(
			"status" => 'error',
			"message" => 'something went wrong, most likely file is to large for upload. check upload_max_filesize, post_max_size and memory_limit in you php.ini' );
		}

        return $response;
	}
    
}

?>
