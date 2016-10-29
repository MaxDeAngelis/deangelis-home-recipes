<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/recipe.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/utilities.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/database.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/actions.php';

	switch ($_POST['action']) {
	    case ACTIONS::GET_LIST:
	        $action = new GetList();
	        break;
		case ACTIONS::GET_RECIPE:
	        $action = new GetRecipe($_POST);
	        break;
	    default:
	        $action = new Action;
	        break;
	}

	echo json_encode($action->process());
?>
