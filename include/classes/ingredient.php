<?php
class Ingredient {
    public $id = "";
    public $name = "";
    public $defaultUnit = "";

    function __construct($ingredient) {
        foreach ($ingredient as $key => $value) {
            switch ($key) {
                case 'ingredientId':
                    $this->id = $value;
                    break;
                case 'ingredientName':
                    $this->name = $value;
                    break;
                case 'defaultUnit':
                    $this->defaultUnit = $value;
                    break;
            }
        }
    }
}


?>
