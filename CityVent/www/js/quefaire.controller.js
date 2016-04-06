angular.module('app')
.controller('QueFaireController', function(QueFaireService){
    console.log('hi');
    
    var results = QueFaireService.get_categories();
    
    console.log(results);

});
    