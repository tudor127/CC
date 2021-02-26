function getCategories(){
	$(document).ready(function(){
	    $.get("/services/meal/categories", function(data, status){
	      let output = ``;
	      let result = JSON.parse(data);
	      if(parseInt(result.status) == 200){
	      	output += `<h3 class="text-center">Categories</h3>`;
			for(let i=0; i<result.categories.length; i++){
				let category = result.categories[i];
				output += `
				<div class="category" onclick="getCategoriesMeals('${category['name']}')">
					<div class="category-image">
						<img src="${category['image']}">
					</div>
					<div class="category-title">
						${category['name']}
					</div>
				</div>`;
			}
	      }else{
	      	output = data.message;
	      }

	      $('#categories').html(output);
	    });
	});
}

function savePdf(meal_id){
	let language = $('#selected_language').val();
	window.location.href = '/services/meal/pdf/' + language.toLowerCase() + '/' + meal_id;
}

function translateMeal(meal_id){
	let language = $('#selected_language').val();
	$('#loading').css('visibility', 'visible');
	getMeal(meal_id,language.toLowerCase());
	$('#loading').css('visibility', 'visible');
}

function getLanguages(meal_id, selected_language, callback){
	$(document).ready(function(){
	    $.get("/services/translate/languages", function(data, status){
	      let output = ``;
	      let result = JSON.parse(data);
	      if(parseInt(result.status) == 200){
	      	output = '<div class="translate_btn"><select id="selected_language" class="form-control">';
			for(let i=0; i<result.languages.length; i++){
				let language = result.languages[i]['language'];
				let selected = '';
				if(language .toLowerCase() == selected_language.toLowerCase()){
					selected = 'selected="selected"';
				}
				output += `<option values="${language}" ${selected}>${language.toUpperCase()}</option>`;
			}
	      	output += `</select><button class="btn" onclick="translateMeal(${meal_id})">Translate</button></div>
	      	<img id="loading" src="public/img/loading.gif">`;
	      }else{
	      	output = data.message;
	      }

	      callback(output);

	    });
	});
}

function getCategoriesMeals($category){
	$(document).ready(function(){
	    $.get("/services/meal/categories/"+$category+"/meals", function(data, status){
	      let output = ``;
	      let result = JSON.parse(data);
	      if(parseInt(result.status) == 200){
			for(let i=0; i<result.meals.length; i++){
				let meal = result.meals[i];
				output += `
				<div class="col-md-3 meal" onclick="getMeal(${meal['id']},'en')">
					<div class="meal-image">
						<img src="${meal['image']}">
					</div>
					<div class="meal-title">
						${meal['name']}
					</div>
				</div>`;
			}
	      }else{
	      	output = data.message;
	      }

	      $('#meals').html(output);
	      $('#meal').hide();
	      $('#meals').show();
	      window.scrollTo(0, 0);    
	    });
	});
}

function getMeal($meal_id, $language){
	$(document).ready(function(){
	    $.get("/services/meal/" + $language + "/" + $meal_id, function(data, status){
    	  getLanguages($meal_id, $language, function(languages){
	      let output = ``;
	      let result = JSON.parse(data);
	      if(parseInt(result.status) == 200){
				let meal = result.meal;
				output += `
				<div class="col-md-12 meal-page">
					<div class="row">
						<div class="col-md-6 meal-page-image">
							<img src="${meal['image']}">
						</div>
						<div class="col-md-6 meal-page-right">
							<h3 class="text-center">${meal['name']}</h3>`;
					if(meal['ingredients'].length > 0){
						output += `<br><b>${meal['ingredients_text']}:</b> <br><br><ul>`;
						let ingredients = meal['ingredients'];
						for(let i=0; i<ingredients.length; i++){
							let ingredient = ingredients[i];
							output += `<li>${ingredient['ingredient']} : ${ingredient['measure']}</li>`
						}
						output += `</ul>`;
					}

					output += `</div>
					  <div class="col-md-12" style="margin-bottom: 25px">
							<br><br><b>${meal['instructions_text']}:</b><br><br>
							<p>${meal['instructions']}</p>
					  </div><br style="clear:both">
					  ${languages}
					  <div class="pdf_download">
						<button class="btn" onclick="savePdf(${$meal_id})">Download as pdf</button>
					  </div>
					  </div>
				</div>`;
			
	      }else{
	      	output = data.message;
	      }

	      $('#meal').html(output);
	      $('#meals').hide();
	      $('#meal').show();
	      window.scrollTo(0, 0);    
	    });
	  });
	});
}

$(document).ready(function() {
      getCategories();
});