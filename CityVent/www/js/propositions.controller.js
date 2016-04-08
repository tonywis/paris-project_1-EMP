angular.module('app')
.controller('propositionsController', function(openDataService,QueFaireService){
    
    var tabConcert =[];
    var tabClubbing =[];
    var tabSpectacle =[];
    
    //OpenDataParis
    var requestConcert = openDataServiceRequest("concert");
    var requestClubbing = openDataServiceRequest("clubbing");
    
    
    function openDataServiceRequest(tag){ 
        openDataService.get_evenements(tag).
        then(function(result){
           tabConcert =result;
            console.log(tag);
            console.log(tabConcert.records);
        }, function(error){
        });
    };
    
    /*
    //ParisAPI
    var requestSpectacles = openDataServiceRequest(2)
    
    //activitiId: 2=spectacles/15=humour/14=theatre
    function openDataServiceRequest(categorieId){ 
        QueFaireService.get_activities(categorieId).
        then(function(result){
           tabSpectacle =result;
            console.log(categorieId);
            console.log(tabSpectacle.records);
        }, function(error){
        });
    };*/
});