<?php

class MealModel{
	
	public static function getCategories(){

		$output = array();

		$reqUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

		$reqStartTime = microtime(true);

		$reqResponse = '';

		$cURLConnection = curl_init();

		curl_setopt($cURLConnection, CURLOPT_URL, $reqUrl);
		
		curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

		$categories = curl_exec($cURLConnection);

		$reqStatus = curl_getinfo($cURLConnection, CURLINFO_HTTP_CODE);

		curl_close($cURLConnection);

		$categories = json_decode($categories, true);

		$reqResponse = json_encode($categories);

		$categories = $categories['categories'];

		if($categories){

			$output['status'] = 200;

			foreach ($categories as $category) {
				
				$output['categories'][] = array(

												'id' => $category['idCategory'],

												'name' => $category['strCategory'],

												'image' => $category['strCategoryThumb']


				);
			}

		}else{

			$output['status'] = 500;

			$output['message'] = 'internal server error';

		}

		$reqLatency = microtime(true) - $reqStartTime;

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus);

		return $output;

	}


	public static function getCategoriesMeals($params){
	
		$output = array();

		$reqUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';	

		$reqResponse = '';

		$reqStartTime = microtime(true);

		if(!$params['category']){

			$output['status'] = 400;

			$output['message'] = 'bad request';

			$reqStatus = 400;

		}else{

			$category = $params['category'];

			$reqUrl = $reqUrl . $category;

			$cURLConnection = curl_init();

			curl_setopt($cURLConnection, CURLOPT_URL, $reqUrl);
			
			curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

			$meals = curl_exec($cURLConnection);

			$reqStatus = curl_getinfo($cURLConnection, CURLINFO_HTTP_CODE);

			curl_close($cURLConnection);

			$meals = json_decode($meals, true);

			$reqResponse = json_encode($meals);

			$meals = $meals['meals'];

			if($meals){

				$output['status'] = 200;

				foreach ($meals as $meal) {
					
					$output['meals'][] = array(

													'id' => $meal['idMeal'],

													'name' => $meal['strMeal'],

													'image' => $meal['strMealThumb']

					);
				}

			}else{

				$output['status'] = 400;

				$output['message'] = 'bad request';

			}

		}

		$reqLatency = microtime(true) - $reqStartTime;

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus);

		return $output;
	}


	public static function getMeal($params){
	
		$output = array();

		$reqResponse = '';

		$reqStartTime = microtime(true);

		$reqUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

		if(!$params['meal_id']){

			$output['status'] = 400;

			$output['message'] = 'bad request';

			$reqStatus = 400;

		}else{

			$language = 'en';

			if(isset($params['language'])){

				$language = $params['language'];

			}

			$meal = $params['meal_id'];

			$reqUrl = $reqUrl . $meal;

			$cURLConnection = curl_init();

			curl_setopt($cURLConnection, CURLOPT_URL, $reqUrl);
			
			curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

			$meal = curl_exec($cURLConnection);

			$reqStatus = curl_getinfo($cURLConnection, CURLINFO_HTTP_CODE);

			curl_close($cURLConnection);

			$meal = json_decode($meal, true);

			$reqLatency = microtime(true) - $reqStartTime;

			$reqResponse = json_encode($meal);	

			$meal = $meal['meals'];	

			if($meal){

				require_once 'models/translate.php';

				$output['status'] = 200;

				$meal = $meal[0];

				$ingredients = array();

				for($i = 1; $i <= 20; $i++){

					if(trim($meal['strIngredient'.$i]) != '' && $meal['strIngredient'.$i]){

						$ingredients[] = array( 'ingredient' => TranslateModel::translate($meal['strIngredient'.$i],$language , 'en')['text'], 'measure' => TranslateModel::translate($meal['strMeasure'.$i], $language, 'en')['text']);

					}

				}
					
				$output['meal'] = array(

												'id' => $meal['idMeal'],

												'name' => TranslateModel::translate($meal['strMeal'], $language, 'en')['text'],

												'image' => $meal['strMealThumb'],

												'category' => $meal['strCategory'],

												'instructions' => TranslateModel::translate($meal['strInstructions'], $language, 'en')['text'],

												'youtube' => $meal['strYoutube'],

												'ingredients' => $ingredients, 

												'ingredients_text' => TranslateModel::translate('Ingredients', $language, 'en')['text'],

												'instructions_text' => TranslateModel::translate('Instructions', $language, 'en')['text']

				);

			}else{

				$output['status'] = 400;

				$output['message'] = 'bad request';

				$reqStatus = 400;

			}

		}

		if(!$reqLatency){

			$reqLatency = microtime(true) - $reqStartTime;

		}

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus);

		return $output;
	}

	public static function convertPDF($params){

		$output = array();

		if(!$params['meal_id'] || !is_numeric($params['meal_id'])){

			$output['status'] = 400;

			$output['message'] = 'bad request';

			return $output;

		}

		$language = 'en';

		if(isset($params['language'])){

			$language = $params['language'];

		}

		$meal_id = (int)$params['meal_id'];

		$meal = self::getMeal(array('language' => $language ,'meal_id' => $meal_id));

		if((int)$meal['status'] != 200){

			$output['status'] = 400;

			$output['message'] = 'bad request';

			return $output;

		}

		$meal = $meal['meal'];

		$json = self::jsonFormat($meal);

		require_once 'models/pdf.php';

		PdfModel::convert($json, $meal['name']);

	}

	public static function jsonFormat($meal){
	
		$ingredients = '';

		foreach ($meal['ingredients'] as $ingredient) {
			
			$ingredients .= ', ["paragraph", {"align":"left", "size": 10}, "'.addslashes($ingredient['ingredient']).' : '.addslashes($ingredient['measure']).'"]';
		}

		$json = '[{"title":"'.addslashes($meal['name']).'", "size":"a4"},["heading", {"style": {"size":15, "align":"center"}}, "'.addslashes($meal['name']).'"], ["spacer", 3] , ["image",{"xscale":1,"yscale" : 0.8,
           "align":"center"} , "'.addslashes($meal['image']).'"], ["spacer", 3], ["paragraph", {"style":"bold","align":"left", "size": 12}, "'.addslashes($meal['ingredients_text']).':"], ["spacer", 1] '.$ingredients.' ,["spacer", 3], ["paragraph", {"style":"bold","align":"left", "size": 12}, "'.addslashes($meal['instructions_text']).':"], ["spacer", 1], ["paragraph", {"align":"left", "size": 10}, "'.addslashes($meal['instructions']).'"] ]';

	   return $json;

	}
}