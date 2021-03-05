<?php

class Home{

	function Home(){

		self::loadContent();
	
	}

	function loadContent(){

    	include 'views/home.php';
    	
	}
}

?>