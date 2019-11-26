<?php
class Step {
    public $selected = false;
    public $text = "";
    function __construct($value) {
        $this->text = $value;
    }
}
class Recipe {
    public $id = -1;
    public $title = "New recipe";
    public $firstName = "";
    public $lastName = "";
    public $servings = "1";
    public $cookTime = "00:00";
    public $prepTime = "00:00";
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
        $this->steps[0] = new Step("");;
        $this->ingredients[0] = new Ingredient(null);

        if ($recipe == null) {
            return $this;
        }

        $this->edit = false;

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
                    $stepsList = array();
                    $stepsTexts = explode("|", $value);

                    foreach ($stepsTexts as $step) {
                        $stepsList[] = new Step($step);
                    }

                    $this->steps = $stepsList;
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
                    break;
            }
        }
    }
}


?>
