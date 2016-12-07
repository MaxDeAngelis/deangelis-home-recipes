<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/recipe.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/utilities.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/database.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/actions.php';

	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/ingredient.php';


	switch ($_GET['action']) {
	    case ACTIONS::GET_LIST:
	        $action = new GetList();
	        break;
		case ACTIONS::GET_RECIPE:
	        $action = new GetRecipe($_GET);
	        break;
		case ACTIONS::GET_DATA_INGREDIENTS:
			$action = new GetDataIngredients();
			break;
		case ACTIONS::GET_DATA_UNITS:
			$action = new GetDataUnits();
			break;
		case ACTIONS::SAVE_RECIPE:
			$action = new SaveRecipe($_GET['recipe']);
			break;
	    default:
	        $action = new Action("");
	        break;
	}

	echo json_encode($action->process());
?>
