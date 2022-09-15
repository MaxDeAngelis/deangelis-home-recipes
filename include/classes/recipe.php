<?php
class Step {
    public $selected = false;
    public $text = "";
    public $id = "";
    function __construct($value) {
        $this->text = $value;
        $this->id = uniqid();
    }
}
class Recipe {
    public $id = "new";
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
                case 'id':
                    $this->id = $value;
                    break;
                case 'name':
                case 'title':
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
                    if (is_array($value) === true) {
                        $this->steps = $value;
                    } else {
                        $stepsList = array();
                        $stepsTexts = explode("|", $value);
    
                        foreach ($stepsTexts as $step) {
                            $stepsList[] = new Step($step);
                        }
    
                        $this->steps = $stepsList;
                    }
                    
                    break;
                case 'modDate':
                case 'dateModified':
                    $this->dateModified = $value;
                    break;
                case 'picture':
                    $this->picture = $value;
                    break;
                case 'ownerId':
                case 'creator':
                    $this->creator = $value;
                    break;
                case 'public':
                    $this->public = boolval($value);
                    break;
                case 'deleted':
                    $this->deleted = boolval($value);
                    break;
                case 'ingredients':
                    $this->ingredients = $value;
                    break;
                case 'ing':
                    $list = array();

                    foreach ($value as $ingredient) {
                        $list[] = new Ingredient($ingredient);
                    }

                    $this->ingredients = $list;
                    break;
                default:
                    Logger::info("recipe", "Key missing - " . $key, __LINE__);
            }
        }
    }

    /**
     * This function handles taking the steps object stored on the recipe 
     * and converting it to the deliminated string that the DB expects 
     * 
     * ex.
     * Before:
     *  (
     *      [text] => Step one
     *  ),(
     *      [text] => Step two
     *  ),(
     *      [text] => Step three
     *  )
     * 
     * After:
     *  "Step one|Step two|Step three"
     */
    public function getStepsString() {
        $stepsTexts = array();

        foreach ($this->steps as $step) {
            if ($step['text'] != "") {
                $stepsTexts[] = $step['text'];
            }
        }

        return implode("|", $stepsTexts);
    }
}


?>
