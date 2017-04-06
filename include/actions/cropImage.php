<?php

class CropImage extends Action {
    public $data = array();
	function __construct($data) {
        $this->data = $data;
		parent::__construct(ACTIONS::CROP_IMAGE);
	}

	public function process() {
		$imgUrl = $_SERVER['DOCUMENT_ROOT'] . "/" . $this->data['imgUrl'];
		
		// original sizes
		$imgInitW = $this->data['imgInitW'];
		$imgInitH = $this->data['imgInitH'];
		// resized sizes
		$imgW = $this->data['imgW'];
		$imgH = $this->data['imgH'];
		// offsets
		$imgY1 = $this->data['imgY1'];
		$imgX1 = $this->data['imgX1'];
		// crop box
		$cropW = $this->data['cropW'];
		$cropH = $this->data['cropH'];
		// rotation angle
		$angle = $this->data['rotation'];

		$output_filename = "images/recipes/temp_recipe_".rand();

		// uncomment line below to save the cropped image in the same location as the original image.
		//$output_filename = dirname($imgUrl) . "/croppedImg_".rand();

		$what = getimagesize($imgUrl);
		switch(strtolower($what['mime'])) {
			case 'image/png':
				$img_r = imagecreatefrompng($imgUrl);
				$source_image = imagecreatefrompng($imgUrl);
				$type = '.png';
				break;
			case 'image/jpeg':
				$img_r = imagecreatefromjpeg($imgUrl);
				$source_image = imagecreatefromjpeg($imgUrl);
				$type = '.jpeg';
				break;
			case 'image/gif':
				$img_r = imagecreatefromgif($imgUrl);
				$source_image = imagecreatefromgif($imgUrl);
				$type = '.gif';
				break;
			default: 
				die('image type not supported');
		}


		//Check write Access to Directory

		if (!is_writable(dirname($imgUrl))) {
			$response = Array(
				"status" => 'error',
				"message" => 'Can`t write cropped File' );	
		} else {

			// resize the original image to size of editor
			$resizedImage = imagecreatetruecolor($imgW, $imgH);
			imagecopyresampled($resizedImage, $source_image, 0, 0, 0, 0, $imgW, $imgH, $imgInitW, $imgInitH);

			// rotate the rezized image
			$rotated_image = imagerotate($resizedImage, -$angle, 0);

			// find new width & height of rotated image
			$rotated_width = imagesx($rotated_image);
			$rotated_height = imagesy($rotated_image);

			// diff between rotated & original sizes
			$dx = $rotated_width - $imgW;
			$dy = $rotated_height - $imgH;

			// crop rotated image to fit into original rezized rectangle
			$cropped_rotated_image = imagecreatetruecolor($imgW, $imgH);
			imagecolortransparent($cropped_rotated_image, imagecolorallocate($cropped_rotated_image, 0, 0, 0));
			imagecopyresampled($cropped_rotated_image, $rotated_image, 0, 0, $dx / 2, $dy / 2, $imgW, $imgH, $imgW, $imgH);

			// crop image into selected area
			$final_image = imagecreatetruecolor($cropW, $cropH);
			imagecolortransparent($final_image, imagecolorallocate($final_image, 0, 0, 0));
			imagecopyresampled($final_image, $cropped_rotated_image, 0, 0, $imgX1, $imgY1, $cropW, $cropH, $cropW, $cropH);

			// finally output png image
			//imagepng($final_image, $output_filename.$type, $png_quality);
			imagejpeg($final_image, $_SERVER['DOCUMENT_ROOT'] . "/" . $output_filename.$type, 100);

			// Delete the original image
			unlink($imgUrl);

			$response = Array(
				"status" => 'success',
				"url" => $output_filename.$type);
		}

		return $response;
	}
}

?>
