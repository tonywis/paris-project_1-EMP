angular.module('app')
.controller('categoriesController', function(QueFaireService){

    mv=this;
    
    mv.resultsCategories = []; 
    mv.categoriesFictive= [{nom: "yo"},{nom: "yoo"},{nom: "yooo"}]
    
    mv.resultsCategories = QueFaireService.get_categories();
    
    console.log('resultsCategories');
    console.log(mv.resultsCategories);
});