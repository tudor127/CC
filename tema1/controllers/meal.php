<?php

class Meal{

	public function Meal($action, $params = array()){

		self::loadContent($action, $params);
		
	}
	
	public function loadContent($action, $params){

		require_once 'models/meal.php';

		switch ($action) {

			case 'categories':

				echo json_encode(MealModel::getCategories());

				break;

			case 'categories_meals':

				echo json_encode(MealModel::getCategoriesMeals($params));

				break;

			case 'meal':

				echo json_encode(MealModel::getMeal($params));

				break;

			case 'convert':

				MealModel::convertPdf($params);

				break;
			
			default:

				echo 'bad request';

				break;
				
		}
	}

}

?>