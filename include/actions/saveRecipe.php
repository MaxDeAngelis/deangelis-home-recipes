<?php

class SaveRecipe extends Action {
    public $recipe;
	function __construct($data) {
        $this->recipe = $data;
		parent::__construct(ACTIONS::SAVE_RECIPE);
	}

	public function process() {
		// Update the recipe information itself
        $sql = "UPDATE recipes 
					SET name = '{$this->recipe["title"]}', 
					steps = '{$this->recipe["steps"]}', 
					cookTime = '{$this->recipe["cookTime"]}', 
					prepTime = '{$this->recipe["prepTime"]}', 
					category = '{$this->recipe["category"]}', 
					season = '{$this->recipe["season"]}', 
					servings = {$this->recipe["servings"]}
					
					WHERE recipeId = {$this->recipe["id"]};";

        $response = new DatabaseTransaction($sql);

		if ($response->sucess) {
			return "{'status' : 'Updated' }";
		} else {
			return null;
		}
	}
}

?>
