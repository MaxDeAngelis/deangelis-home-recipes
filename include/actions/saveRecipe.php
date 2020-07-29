<?php

class SaveRecipe extends Action {
    public $recipe;
	function __construct($data) {
        $this->recipe = $data;
		parent::__construct(ACTIONS::SAVE_RECIPE);
	}

	/**
	 * This function handles updating or creating the recipe. If successful the recipe id
	 * will be returned
	 * 
	 * 1. Need to check if recipe exists in DB first
	 * 2. If it does NOT exist then insert new empty recipe
	 * 3. Get a handle on the new recipe and update it
	 * 4. Delete all referenced ingredients 
	 * 5. Insert all the new references
	 */
	private function update($recipe) {
		Logger::debug("saveRecipe", "Id is " . $this->recipe["id"], __LINE__);
		$sqlList = array();

		$updatedRecipeId = $recipe->id;
		// If the recipe is new, meaning the id is -1 then insert new before updating it
		if ($recipe->id == -1) {
			Logger::debug("saveRecipe", "Recipe is new so INSERT", __LINE__);
			array_push($sqlList, "INSERT INTO recipes (name) VALUES ('');");
			$updatedRecipeId = "LAST_INSERT_ID()";
		}

		if ($recipe->public == false) {
			$public = 0;
		} else {
			$public = 1;
		}

		// Pull the creator from the Session
		$user = $_SESSION['user'];
		array_push($sqlList, "UPDATE recipes 
			SET name = '{$recipe->title}', 
				steps = '{$recipe->getStepsString()}',
				cookTime = '{$recipe->cookTime}', 
				prepTime = '{$recipe->prepTime}', 
				category = '{$recipe->category}', 
				season = '{$recipe->season}', 
				servings = {$recipe->servings},
				ownerId = {$user['userId']},
				public = {$public},
				modDate = NULL
			
			WHERE recipeId = {$updatedRecipeId};");

		array_push($sqlList, "DELETE FROM recipeingredients 
			WHERE recipeId = {$updatedRecipeId};");

		// Generate calls to add ingredients
		foreach ($recipe->ingredients as $ingredient) {
			array_push($sqlList, "SELECT AddIng('{$ingredient["ingredientName"]}', 
									'{$ingredient["units"]}', 
									'{$ingredient["quantity"]}', 
									{$updatedRecipeId})");
		}		

		array_push($sqlList, "SELECT picture, recipeId 
			FROM recipes 
			WHERE recipeId = {$updatedRecipeId};");

		$response = new DatabaseTransaction($sqlList);

		if ($response->sucess) {
			Logger::debug("saveRecipe", "Inital creation/update successful", __LINE__);

			$response = new DatabaseQuery("SELECT picture, recipeId 
				FROM recipes 
				WHERE name = '{$recipe->title}';");

			if ($response->sucess) {
				Logger::debug("saveRecipe", "Recipe data retrieved, id is {$response->results[0]["recipeId"]} with picture {$response->results[0]["picture"]}", __LINE__);
				return array("recipeId"=>$response->results[0]["recipeId"], "picture"=>$response->results[0]["picture"]);
			}
		}

		Logger::error("saveRecipe", "Failed to update recipe where title is, {$recipe->title}", __LINE__);
		return false;
	}

	/**
	 * This function handles updating the image for the given recipe
	 * 
	 * 1. If we are not uploading a new temp image fall out
	 * 2. Calculate the new hardcoded path of the image
	 * 3. Delete the old image that was stored
	 * 4. Rename the uploaded image to the new name with id in it
	 * 5. Query DB to update the recipe with new image in case extension changed.
	 * 
	 * Returns true if successful, false otherwise
	 */
	private function updatePicture($recipeId, $oldPicture, $uploadedPicture) {
		Logger::debug("saveRecipe", "Updating image for recipe {$recipeId}. New image is {$uploadedPicture}", __LINE__);
		if (strpos($uploadedPicture, "temp_") == false) return true;

		$temp = explode(".", $uploadedPicture);
		$extension = end($temp);

		// Take the temporary image that was uploaded and rename to a normalized version
		$newPictureName = "images/recipes/recipe_{$recipeId}.{$extension}";
		$tempPath = "{$_SERVER['DOCUMENT_ROOT']}/{$uploadedPicture}";
		$newPath = "{$_SERVER['DOCUMENT_ROOT']}/{$newPictureName}";

		// Delete the original image if not the placeholder imager
		if (strpos($oldPicture, "no-image-uploaded") === false) {
			Logger::debug("saveRecipe", "Deleting {$oldPicture}", __LINE__);
			unlink($oldPicture);
		}

		// Rename the new temp image to match recipe id
		Logger::debug("saveRecipe", "Renaming {$tempPath} to {$newPath}", __LINE__);
		rename($tempPath, $newPath);

		// Update the recipe with the new image
		$sql = "UPDATE recipes SET picture = '{$newPictureName}' WHERE recipeId = {$recipeId};";
		$response = new DatabaseQuery($sql);

		if ($response->sucess) {
			Logger::debug("saveRecipe", "Image for recipe {$recipeId} updated to {$newPictureName}", __LINE__);
			return true;
		} else {
			Logger::debug("saveRecipe", "Failed to update image using {$sql}", __LINE__);
		}

		return null;
	}

	/**
	 * This function actually processes the action of updating a recipe
	 */
	public function process() {
		// First things first, check authentication!
		if (isset($_SESSION['user']) === false) {
			Logger::critical("saveRecipe", "Attempt to update recipe {$this->recipe["id"]} without authentication!", __LINE__);
			return null;
		}

		$recipe = new Recipe($this->recipe);

		$recipeData = $this->update($recipe);

		if ($recipeData !== false) {
			$pass = $this->updatePicture($recipeData["recipeId"], $recipeData["picture"], $recipe->picture);

			// TODO: Should consider returning the ID and Image to update the client, also update edit to false on client
			if ($pass === true) return "{'status' : 'Updated' }";
		}

		return null;
	}
}

?>
