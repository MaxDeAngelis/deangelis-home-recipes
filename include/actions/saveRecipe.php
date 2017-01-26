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
		
		array_push($sqlList, "UPDATE recipes 
					SET name = '{$this->recipe["title"]}', 
					steps = '{$this->recipe["steps"]}', 
					cookTime = '{$this->recipe["cookTime"]}', 
					prepTime = '{$this->recipe["prepTime"]}', 
					category = '{$this->recipe["category"]}', 
					season = '{$this->recipe["season"]}', 
					servings = {$this->recipe["servings"]}
					
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
