<?php
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/recipe.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/utilities.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/database.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/actions.php';

	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/ingredient.php';

	$data = array();

	if (isset($_POST['action'])) {
		$data = $_POST;
	} elseif(isset($_GET['action'])) {
		$data = $_GET;
	}

	switch ($data['action']) {

	case ACTIONS::GET_LIST:
		$action = new GetList();
		break;
	case ACTIONS::GET_RECIPE:
		$action = new GetRecipe($data);
		break;
	case ACTIONS::NEW_RECIPE:
		$action = new NewRecipe($data);
		break;
	case ACTIONS::GET_DATA_INGREDIENTS:
		$action = new GetDataIngredients();
		break;
	case ACTIONS::GET_DATA_UNITS:
		$action = new GetDataUnits();
		break;
	case ACTIONS::SAVE_RECIPE:
		$action = new SaveRecipe($data['recipe']);
		break;
	case ACTIONS::UPLOAD_IMAGE:
		$action = new UploadImage($_FILES["img"]);
		break;
	case ACTIONS::CROP_IMAGE:
		$action = new CropImage($data);
		break;
	default:
	        $action = new Action("");
	        break;
	}

	echo json_encode($action->process());
?>
