<?php

require_once 'config.php'; 

include('controllers/routes.php');

require_once 'models/metrics.php';

$params = '';

Route::add('/',function(){

	require_once 'controllers/home.php';

	$controller = new Home();

});

Route::add('/services/meal/categories',function(){

	require_once 'controllers/meal.php';

	$controller = new Meal('categories');

});

Route::add('/services/meal/categories/([a-zA-Z0-9]*)/meals',function($category_id){

	require_once 'controllers/meal.php';

	$controller = new Meal('categories_meals', array('category' => $category_id));

});

Route::add('/services/meal/([a-z]*)/([0-9a-zA-Z]*)',function($language, $meal_id){

	require_once 'controllers/meal.php';

	$controller = new Meal('meal', array('language' => $language, 'meal_id' => $meal_id));

});

Route::add('/services/meal/pdf/([a-z]*)/([0-9]*)',function($language , $meal_id){

	require_once 'controllers/meal.php';

	$controller = new Meal('convert', array('language' => $language, 'meal_id' => $meal_id));

});

Route::add('/services/translate/languages',function(){

	require_once 'controllers/translate.php';

	$controller = new Translate('languages');

});

Route::add('/services/translate/([a-z]*)/([a-z]*)',function( $target, $source){

	require_once 'controllers/translate.php';

	$controller = new Translate('translate', array('target' => $target, 'source' => $source));

});

Route::add('/services/pdf/convert',function(){

	require_once 'controllers/pdf.php';

	$controller = new Pdf('convert');

}, 'post');

Route::add('/metrics',function(){

	require_once 'controllers/metrics.php';

	$controller = new Metrics('metrics');

});

Route::run('/');

?>


