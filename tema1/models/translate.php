<?php 

class TranslateModel{
	
	public static function translate($text, $target, $source = 'en'){

		$output = array();

		$text = str_replace('&', 'and' , $text);

		if($target == 'en'){

		    $output['status'] = 200;

		    $output['text'] = $text;

		    return $output;

		}

		$reqUrl = 'https://www.googleapis.com/language/translate/v2?key=GOOGLE_API_KEY&q='. rawurlencode($text) . '&source='.$source.'&target='.$target;

		$reqResponse = '';

		$reqStartTime = microtime(true);

	    $url = 'https://www.googleapis.com/language/translate/v2?key=' . GOOGLE_API_KEY . '&q=' . rawurlencode($text) . '&source='.$source.'&target='.$target;

	    $handle = curl_init($url);

	    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);

	    $response = curl_exec($handle);    

		$reqStatus = curl_getinfo($handle, CURLINFO_HTTP_CODE);      

	    $responseDecoded = json_decode($response, true);

		$reqResponse = json_encode($responseDecoded);

	    curl_close($handle);

	    $translated = $responseDecoded['data']['translations'][0]['translatedText'];

	    if(!$translated){

	    	$output = array();

	    	$output['status'] = 500;

	    	$output['text'] = 'internal server error';

	    }else{

		    $output['status'] = 200;

		    $output['text'] = $translated;

		}

		$reqLatency = microtime(true) - $reqStartTime;

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus);

	    return $output;

	}

	public static function getLanguages(){

		$reqResponse = '';

		$reqStartTime = microtime(true);

	    $reqUrl = 'https://www.googleapis.com/language/translate/v2/languages?key=GOOGLE_API_KEY';

	    $url = 'https://www.googleapis.com/language/translate/v2/languages?key=' . GOOGLE_API_KEY;

	    $handle = curl_init($url);

	    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);  

	    $response = curl_exec($handle);

		$reqStatus = curl_getinfo($handle, CURLINFO_HTTP_CODE);                 

	    curl_close($handle);

	    $response = json_decode($response, true);

		$reqResponse = json_encode($response);

	    if(!$response['data']['languages']){

	    	$output = array();

	    	$output['status'] = 500;

	    	$output['message'] = 'internal server error';

	    }else{

		    $languages = $response['data']['languages'];

		    $output['status'] = 200;

		    $output['languages'] = $languages;

		}


		$reqLatency = microtime(true) - $reqStartTime;

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus);

		return $output;

	}

}