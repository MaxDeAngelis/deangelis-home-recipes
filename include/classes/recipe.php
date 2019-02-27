<?php
class Recipe {
    private $rawCookTime = "";
    private $rawPrepTime = "";

    public $id = "";
    public $title = "";
    public $firstName = "";
    public $lastName = "";
    public $servings = "";
    public $cookTime = "";
    public $prepTime = "";
    public $totalTime = "";
    public $category = "";
    public $season = "";
    public $steps = "";
    public $dateModified = "";
    public $picture = "";
    public $creator = "";
    public $public = false;
    public $deleted = false;
    public $ingredients = array();

    function __construct($recipe) {
        $this->ingredients[0] = new Ingredient(null);

        if ($recipe == null) {
            return null;
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
                    $this->rawCookTime = $value;
                    $this->cookTime = $this->formatTime($value);
                    break;
                case 'prepTime':
                    $this->rawPrepTime = $value;
                    $this->prepTime = $this->formatTime($value);
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
                    break;
            }
        }

        $this->totalTime = $this->totalTime($this->rawPrepTime, $this->rawCookTime);
    }

    private function totalTime($time1, $time2) {
        // Break the times up into hours and minutes
        $times1 = explode(":", $time1);
        $times2 = explode(":", $time2);

        // Convert time to pure minutes by multiplying the hours by 60
        $minutes1 = intval($times1[1]) + (intval($times1[0]) * 60);
        $minutes2 = intval($times2[1]) + (intval($times2[0]) * 60);

        // Divide and round time by 60 to get hours
        $hours = floor(($minutes1 + $minutes2) / 60);

        // MOD by 60 to get just minutes
        $minutes = ($minutes1 + $minutes2) % 60;

        // Mush together and call format
        return $this->formatTime($hours.":".$minutes);
    }

    private function formatTime($time) {
        $times = explode(":", $time);
        $hours = $times[0];
        $minutes = $times[1];

        if (intval($hours) > 0) {
            $hours = $hours." hrs ";
        } else {
            $hours = "";
        }

        if (intval($minutes) > 0) {
            $minutes = $minutes." min";
        } else {
            $minutes = "";
        }

        return $hours.$minutes;
    }
}


?>
