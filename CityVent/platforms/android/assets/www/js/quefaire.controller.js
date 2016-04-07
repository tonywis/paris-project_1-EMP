angular.module('app')
.controller('QueFaireController', function(QueFaireService){
    
    /*var resultsUnivers = QueFaireService.get_univers();*/
    
    var resultsActivities = QueFaireService.get_activities('18','4','10');

    /*console.log('resultsUnivers')
    console.log(resultsUnivers);*/
    
    console.log('resultsActivities')
    console.log(resultsActivities);
    
    
});
    