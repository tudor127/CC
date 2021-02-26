<?php

class Pdf{

	public function Pdf($action, $params = array()){

		self::loadContent($action, $params);

	}
	
	public function loadContent($action, $params){

		require_once 'models/pdf.php';

		switch ($action) {

			case 'convert':

				$json = '';

				if(!$_POST['json']){

					$json = $_POST['json'];

				}

				echo json_encode(PdfModel::convert($json, 'file'));

				break;
			
			default:

				echo 'bad request';

				break;
				
		}

	}

}

?>