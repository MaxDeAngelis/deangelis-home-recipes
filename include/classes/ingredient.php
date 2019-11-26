<?php
class Ingredient {
    public $ingredientId = "";
    public $ingredientName = "";
    public $quantity = "";
    public $units = "";
    public $selected = false;

    function __construct($ingredient) {
        if ($ingredient == null) {
            return $this;
        }

        foreach ($ingredient as $key => $value) {
            switch ($key) {
                case 'quantity':
                    $this->quantity = $this->convertUnit($value);
                    break;
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

    private function convertUnit($unit) {
        $prefix = "";
        $parts = explode(".", $unit);
        //error_log(print_r($parts, true));

        if (sizeof($parts) > 1) {
            if ($parts[0] != "0") {
                $prefix = $parts[0]." ";
            }
            $unit = "0.".$parts[1];
        }

        if ($unit == "0.25") {
            return $prefix."1/4";
        } elseif ($unit == "0.33") {
            return $prefix."1/3";
        } else if ($unit == "0.5") {
            return $prefix."1/2";
        } else if ($unit == "0.66") {
            return $prefix."2/3";
        } else if ($unit == "0.75") {
            return $prefix."3/4";
        }
        return $prefix.$unit;
    }
}


?>
