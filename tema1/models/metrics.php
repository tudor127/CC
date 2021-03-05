<?php

class MetricsModel{

	private $log_file;

	public function MetricsModel(){

		$this->log_file = 'log.json';

	}

	public function metrics(){

		$output = array();

		$handle = fopen($this->log_file, "r");

		if ($handle) {

			$lines = array();

		    while (($line = fgets($handle)) !== false) {

		    	$line = json_decode($line, true);

		    	$lines[] = $line;
		        
		    }

		    $output['status'] = 200;

		    $data = array();

		    $data['status_100'] = 0;

		    $data['status_200'] = 0;

		    $data['status_300'] = 0;

		    $data['status_400'] = 0;

		    $data['status_500'] = 0;

		    $data['min_latency'] = 100000000000;

		    $data['max_latency'] = 0;

		    $latency_sum = 0;

		    $get_requests = 0;

		    $post_requests = 0;

		    foreach ($lines as $line) {

				if((int)$line['status'] < 200){

					$data['status_100']++;

				}elseif((int)$line['status'] <300){

					$data['status_200']++;

				}elseif((int)$line['status'] < 400){

					$data['status_300']++;
					
				}elseif((int)$line['status'] < 500){

					$data['status_400']++;
					
				}else{

					$data['status_500']++;
					
				}

				$line['latency'] = str_replace('s', '', $line['latency']);

				$line['latency'] = (float)$line['latency'];

				if((float)$line['latency'] < (float)$data['min_latency']){

					$data['min_latency'] = $line['latency'];

				}

				$latency_sum += (float)$line['latency'];

				if((float)$line['latency'] > (float)$data['max_latency']){

					$data['max_latency'] = $line['latency'];

				}

				if($line['method'] == 'GET'){

					$get_requests++;

				}

				if($line['method'] == 'POST'){

					$post_requests++;
					
				}

		    }

		    $data['avg_latency'] = (float)$latency_sum / sizeof($lines);

		    $data['get_requests'] = $get_requests;

		    $data['post_requests'] = $post_requests;

		    $data['all_requests'] = sizeof($lines);

		    $data['last_request'] = $line['request'];

		    $output['data'] = $data;

		    fclose($handle);

		} else {

		    $output['status'] = 500;

		    $output['message'] = 'internal server error';

		} 

		return $output;

	}

	public function log($request, $response, $latency, $status, $method = 'GET'){

		 $output = array();

		 $date = date('d.m.Y h:i:s a', time());

		 $output['date'] = $date;

		 $output['method'] = $method;

		 $output['status'] = $status;

		 $output['latency'] = $latency . 's';

		 $output['request'] = $request;

		 $output['response'] = $response;

		 $output = json_encode($output);

		 file_put_contents($this->log_file, $output.PHP_EOL , FILE_APPEND | LOCK_EX);

	}

}