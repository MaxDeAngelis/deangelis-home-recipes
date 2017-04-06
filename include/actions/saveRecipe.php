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
		
		$newPicture = $this->recipe["picture"];
		error_log("-----------------------------------------------------------------------------------");
		error_log("Before: " . $newPictureLocation);


		$response = new DatabaseQuery("SELECT picture FROM recipes WHERE recipeId = {$recipeId};");

		// If the image was changed then delete the old one and rename the new one
		if ($response->sucess && strpos($this->recipe["picture"], "temp_") !== false) {
			$temp = explode(".", $this->recipe["picture"]);
			$extension = end($temp);			

			// Recalculate the new image name with extension
			$newPicture = "images/recipes/recipe_" . $recipeId . "." . $extension;
			$oldPicture = $response->results[0]["picture"];

			// Get the full paths
			$oldPath = $_SERVER['DOCUMENT_ROOT'] . "/" . $this->recipe["picture"];
			$newPath = $_SERVER['DOCUMENT_ROOT'] . "/" . $newPicture;

			// Delete the original image
			unlink($oldPath);

			// Rename the new image
			rename($oldPath, $newPath);
		}
		error_log("After: " . $newPicture);

		array_push($sqlList, "UPDATE recipes 
					SET name = '{$this->recipe["title"]}', 
					steps = '{$this->recipe["steps"]}', 
					cookTime = '{$this->recipe["cookTime"]}', 
					prepTime = '{$this->recipe["prepTime"]}', 
					category = '{$this->recipe["category"]}', 
					season = '{$this->recipe["season"]}', 
					servings = {$this->recipe["servings"]},
					picture = '{$newPicture}'
					
					WHERE recipeId = {$recipeId};");

		array_push($sqlList, "DELETE FROM recipeingredients WHERE recipeId = {$recipeId};");
		
		// Generate calls to add ingredients
        foreach ($this->recipe["ingredients"] as $ingredient) {
			array_push($sqlList, "SELECT AddIng('{$ingredient["ingredientName"]}', 
												'{$ingredient["units"]}', 
												'{$ingredient["quantity"]}', 
												{$recipeId}, 
												{$ingredient["refId"]});");
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
