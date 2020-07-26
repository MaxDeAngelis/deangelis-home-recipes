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

		$recipe = new Recipe($this->recipe);
		 
		// 1. Need to check if recipe exists in DB first
		// 2. If it does NOT exist then insert new empty recipe
		// TODO: 3. Upload image and generate a new id
		// 4. Get a handle on the new recipe and update it
		// 5. Insert new ingredients

		$updatedRecipeId = $recipe->id;
		// If the recipe is new, meaning the id is -1 then insert new before updating it
		if ($recipe->id == -1) {
			array_push($sqlList, "INSERT INTO recipes (name) VALUES ('');");
			$updatedRecipeId = "LAST_INSERT_ID()";
		}

		if ($this->recipe["public"] == false) {
			$public = 0;
		} else {
			$public = 1;
		}

		// TODO: Need to handle who the creator is!
		array_push($sqlList, "UPDATE recipes 
		SET name = '{$recipe->title}', 
			steps = '{$recipe->getStepsString()}',
			cookTime = '{$recipe->cookTime}', 
			prepTime = '{$recipe->prepTime}', 
			category = '{$recipe->category}', 
			season = '{$recipe->season}', 
			servings = {$recipe->servings},
			ownerId = 0,
			public = {$public},
			modDate = NULL
		
		WHERE recipeId = {$updatedRecipeId};");

		array_push($sqlList, "DELETE FROM recipeingredients WHERE recipeId = {$updatedRecipeId};");

		// Generate calls to add ingredients
		foreach ($recipe->ingredients as $ingredient) {
			array_push($sqlList, "SELECT AddIng('{$ingredient["ingredientName"]}', 
									'{$ingredient["units"]}', 
									'{$ingredient["quantity"]}', 
									{$updatedRecipeId})");
		}		

		$response = new DatabaseTransaction($sqlList);
		if ($response->sucess) {
			return "{'status' : 'Updated' }";
		} else {
			return null;
		}
























		
		$newPicture = $this->recipe["picture"];

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
	}
}

?>
