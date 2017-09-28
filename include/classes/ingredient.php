<?php
class Ingredient {
    public $ingredientId = "";
    public $ingredientName = "";
    public $quantity = "";
    public $units = "";

    function __construct($ingredient) {
        if ($ingredient == null) {
            return $this;
        }

        foreach ($ingredient as $key => $value) {
            switch ($key) {
                case 'ingredientId':
                    $this->ingredientId = $value;
                    break;
                case 'ingredientName':
                    $this->ingredientName = $value;
                    break;
                case 'units':
                    $this->units = $value;
                    break;
            }
        }
    }
}


?>
