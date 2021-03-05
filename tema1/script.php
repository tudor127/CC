<?php

$mealURL = 'homework.localhost/services/meal/en/';

$mealValues = ['5678', 'abc', '3', '+', '53016'];

$data = array();

for($i=0; $i < 5 ; $i++) { 
	
	 $array = array();

	 for ($j=0; $j < 5; $j++) { 
	 	
	 	$array[] = $mealURL . $mealValues[array_rand($mealValues)];

	 }

	 $data[] = $array;

}


foreach($data as $array){

	$nodes = $array;

	$node_count = count($nodes);

	$curl_arr = array();

	$master = curl_multi_init();

	for($i = 0; $i < $node_count; $i++)
	{
	    $url =$nodes[$i];

	    $curl_arr[$i] = curl_init($url);

	    curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, true);

	    curl_multi_add_handle($master, $curl_arr[$i]);

	}

	do {

	    curl_multi_exec($master,$running);

	} while($running > 0);


	for($i = 0; $i < $node_count; $i++)
	{

	    $results[] = curl_multi_getcontent  ( $curl_arr[$i]  );

	}

	echo sizeof($array).' requests' . '<br>';

}