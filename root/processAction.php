<?php
	include_once $_SERVER['DOCUMENT_ROOT'] . '/../include/modules/PHPMailer/PHPMailerAutoload.php';
	
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/recipe.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/utilities.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/database.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/actions/actions.php';
	require_once $_SERVER['DOCUMENT_ROOT'] . '/../include/classes/ingredient.php';

	session_start();

	$str_json = file_get_contents('php://input');
	
	if (isset($_POST['action'])) {
		$data = $_POST;
	} else {
		$data = json_decode($str_json, true);		
	}
	
	$data = Utilities::encodeArray($data);

	switch ($data['action']) {
	case ACTIONS::SEARCH_EXTERNAL:
		error_log("IN HERE");
		$response = file_get_contents("https://food2fork.com/api/search?key=1132f2389852e19d629e0b7d9d7b784f&q=Salad");
		echo json_encode($response);
		break;
	case ACTIONS::REGISTER:
		$action = new Register($data);
		break;
	case ACTIONS::UPDATE_USER_STATUS:
		$action = new UpdateUserStatus($data);
		break;
	case ACTIONS::UPDATE_PASSWORD:
		$action = new UpdatePassword($data);
		break;
	case ACTIONS::LOGIN:
		$action = new Login($data);
		break;
	case ACTIONS::LOGOUT:
		$action = new Logout($data);
		break;
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
	case ACTIONS::GET_DATA_RECENT_FEED:
		$action = new GET_DATA_RECENT_FEED();
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
