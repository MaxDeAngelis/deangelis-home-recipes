<?php
class Recipe {
    public $id = "";
    public $title = "";
    public $firstName = "";
    public $lastName = "";
    public $servings = "";
    public $cookTime = "";
    public $prepTime = "";
    public $category = "";
    public $season = "";
    public $steps = "";
    public $dateCreated = "";
    public $picture = "";
    public $creator = "";
    public $ingredients = array();

    function __construct($recipe) {
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
                    $this->steps = $value;
                    break;
                case 'modDate':
                    $this->dateCreated = $value;
                    break;
                case 'picture':
                    $this->picture = $value;
                    break;
                case 'ownerId':
                    $this->creator = $value;
                    break;
                case 'ing':
                    $this->ingredients = $value;
                    break;
            }
        }
    }
}


?>
