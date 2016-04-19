angular.module('app')
.controller('propositionsController', function(openDataService){

    var tab =[]
    
    var request = openDataService.get_evenements("bar").
    then(function(result){
       tab =result;
        console.log(tab.records);
    }, function(error){
        
    });
    
    
});