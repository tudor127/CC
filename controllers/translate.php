<?php

class Translate{

	public function Translate($action, $params = array()){

		self::loadContent($action, $params);

	}
	
	public function loadContent($action, $params){

		require_once 'models/translate.php';

		switch ($action) {

			case 'languages':
				
				echo json_encode(TranslateModel::getLanguages());

				break;

			case 'translate':

				$text = '';

				$source = '';

				$target = '';

				if(!$_GET['text']){

					$text = $_GET['text'];

				}

				if(!$params['target']){

					$target = $params['target'];
					
				}


				if(!$params['source']){

					$source = $params['source'];
					
				}
				
				echo json_encode(TranslateModel::translate($text, $target, $source));

				break;
			
			default:

				echo 'bad request';

				break;
				
		}

	}

}

?>