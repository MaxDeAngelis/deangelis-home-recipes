<?php

class SaveRecipe extends Action {
    public $recipe;
	function __construct($data) {
        $this->recipe = $data;
		parent::__construct(ACTIONS::SAVE_RECIPE);
	}

	public function process() {
		$recipeId = $this->recipe["id"];
		$sqlList = array();

		array_push($sqlList, "INSERT INTO recipes (name) VALUES ('');");
		array_push($sqlList, "UPDATE recipes SET name = 'HELLOP' WHERE recipeId = LAST_INSERT_ID()");
		
		$response = new DatabaseTransaction($sqlList);

		#$response = new DatabaseInsert("INSERT INTO recipes (name) VALUES ('');");
		#$response = new DatabaseQuery("SELECT LAST_INSERT_ID();");

		#error_log(print_r($response, true));
		

		return $response;


		$newPicture = $this->recipe["picture"];

		if ($this->recipe["public"] == false) {
			$public = 0;
		} else {
			$public = 1;
		}

		// If the image was changed then delete the old one and rename the new one
		// because of cropper it will have a temp in the name since it was just cropped
		// TODO: Somehow this sometimes runs when name does not contain temp and image is delete :(
		if (strpos($this->recipe["picture"], "temp_") !== false) {
			$response = new DatabaseQuery("SELECT picture FROM recipes WHERE recipeId = {$recipeId};");

			if ($response->sucess) {
				$temp = explode(".", $this->recipe["picture"]);
				$extension = end($temp);			

				// Recalculate the new image name with extension
				$newPicture = "images/recipes/recipe_" . $recipeId . "." . $extension;
				$oldPicture = $response->results[0]["picture"];

				// Get the full paths
				$oldPath = $_SERVER['DOCUMENT_ROOT'] . "/" . $this->recipe["picture"];
				$newPath = $_SERVER['DOCUMENT_ROOT'] . "/" . $newPicture;

				// Delete the original image if not the placeholder
				if (strpos($oldPicture, "no-image-uploaded") === false) {
					unlink($oldPicture);
				}

				// Rename the new temp image to match recipe id
				rename($oldPath, $newPath);
			}
		}

		array_push($sqlList, "UPDATE recipes 
					SET name = '{$this->recipe["title"]}', 
						steps = '{$this->recipe["steps"]}', 
						cookTime = '{$this->recipe["cookTime"]}', 
						prepTime = '{$this->recipe["prepTime"]}', 
						category = '{$this->recipe["category"]}', 
						season = '{$this->recipe["season"]}', 
						servings = {$this->recipe["servings"]},
						ownerId = {$this->recipe["creator"]},
						public = {$public},
						picture = '{$newPicture}',
						modDate = NULL
					
					WHERE recipeId = {$recipeId};");

		array_push($sqlList, "DELETE FROM recipeingredients WHERE recipeId = {$recipeId};");
		
		// Generate calls to add ingredients
        foreach ($this->recipe["ingredients"] as $ingredient) {
			array_push($sqlList, "SELECT AddIng('{$ingredient["ingredientName"]}', 
												'{$ingredient["units"]}', 
												'{$ingredient["quantity"]}', 
												{$recipeId})");
		}

		$response = new DatabaseTransaction($sqlList);
		if ($response->sucess) {
			return "{'status' : 'Updated' }";
		} else {
			return null;
		}
	}
}

?>
