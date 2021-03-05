<?php

class Metrics{

	public function Metrics($action, $params = array()){

		self::loadContent($action, $params);

	}
	
	public function loadContent($action, $params){

		require_once 'models/metrics.php';

		$model = new MetricsModel();

		switch ($action) {

			case 'metrics':
				
				echo json_encode($model->metrics());

				break;
			
			default:

				echo 'bad request';

				break;

		}

	}

}

?>