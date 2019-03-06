<?php
class Recipe {
    public $id = -1;
    public $title = "New recipe";
    public $firstName = "";
    public $lastName = "";
    public $servings = "";
    public $cookTime = "";
    public $prepTime = "";
    public $category = "";
    public $season = "";
    public $steps = array();
    public $dateModified = "";
    public $picture = "images/no-image-uploaded.png";
    public $creator = "";
    public $public = true;
    public $deleted = false;
    public $ingredients = array();
    public $edit = true;

    function __construct($recipe) {
        $this->ingredients[0] = new Ingredient(null);

        if ($recipe == null) {
            return $this;
        }

        foreach ($recipe as $key => $value) {
            switch ($key) {
                case 'recipeId':
                    $this->id = $value;
                    break;
                case 'name':
                    $this->title = $value;
                    break;
                case 'firstName':
                    $this->firstName = $value;
                    break;
                case 'lastName':
                    $this->lastName = $value;
                    break;
                case 'servings':
                    $this->servings = $value;
                    break;
                case 'cookTime':
                    $this->cookTime = $value;
                    break;
                case 'prepTime':
                    $this->prepTime = $value;
                    break;
                case 'category':
                    $this->category = $value;
                    break;
                case 'season':
                    $this->season = $value;
                    break;
                case 'steps':
                    $this->steps = explode("|", $value);
                    break;
                case 'modDate':
                    $this->dateModified = $value;
                    break;
                case 'picture':
                    $this->picture = $value;
                    break;
                case 'ownerId':
                    $this->creator = $value;
                    break;
                case 'public':
                    $this->public = boolval($value);
                    break;
                case 'deleted':
                    $this->deleted = boolval($value);
                    break;
                case 'ing':
                    $list = array();

                    foreach ($value as $ingredient) {
                        $list[] = new Ingredient($ingredient);
                    }

                    $this->ingredients = $list;
                    $this->edit = false;
                    break;
            }
        }
    }
}


?>
