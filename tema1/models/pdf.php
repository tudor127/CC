<?php

class PdfModel{
	
	public static function convert($json, $filename){

		$curl = curl_init();

		$reqStartTime = microtime(true);

		$reqUrl = "https://yogthos.p.rapidapi.com?json-input=" . $json; 

		$reqResponse = $filename.'.pdf';

		curl_setopt_array($curl, [

			CURLOPT_URL => "https://yogthos.p.rapidapi.com/",

			CURLOPT_RETURNTRANSFER => true,

			CURLOPT_FOLLOWLOCATION => true,

			CURLOPT_ENCODING => "",

			CURLOPT_MAXREDIRS => 10,

			CURLOPT_TIMEOUT => 30,

			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

			CURLOPT_CUSTOMREQUEST => "POST",

			CURLOPT_POSTFIELDS => "json-input=" . $json,

			CURLOPT_HTTPHEADER => [

				"content-type: application/x-www-form-urlencoded",

				"x-rapidapi-host: yogthos.p.rapidapi.com",

				"x-rapidapi-key: " . PDF_API_KEY
			],
		]);

		$response = curl_exec($curl);

		$reqStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);                 

		$err = curl_error($curl);

		curl_close($curl);

		$reqLatency = microtime(true) - $reqStartTime;

		$metrics = new MetricsModel();

		$metrics->log($reqUrl, $reqResponse, $reqLatency, $reqStatus, 'POST');

		if ($err) {

			echo "cURL Error #:" . $err;

		} else {

			header("Pragma: public");

			header("Expires: 0");

			header("Cache-Control: must-revalidate, post-check=0, pre-check=0");

			header("Cache-Control: public");

			header("Content-Description: File Transfer");

			header("Content-Type: application/pdf; charset=utf-8");

			header("Content-Disposition: attachment; filename=$filename.pdf");

			header("Content-Transfer-Encoding: binary");

			echo $response;
		}

	}

}