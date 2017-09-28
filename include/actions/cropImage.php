<?php

class CropImage extends Action {
    public $data = array();
	function __construct($data) {
        $this->data = $data;
		parent::__construct(ACTIONS::CROP_IMAGE);
	}

	public function process() {
		$data = $_POST['image'];
		$url = $_SERVER['DOCUMENT_ROOT'] . "/" . $_POST['url'];
		
		// Delete the original if not placeholder
		if (strpos($url, "no-image-uploaded") === false) {
			unlink($url);
		}

		$uri = substr($data,strpos($data,",")+1);

		$encodedData = str_replace(' ', '+', $uri);
		$decodedData = base64_decode($encodedData);
		
		$imageUrl = "images/recipes/temp_recipe_".rand().".png";

		file_put_contents($imageUrl, $decodedData);

		return Array(
			"status" => 'success',
			"url" => $imageUrl
		);
	}
}

?>
