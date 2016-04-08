angular.module('app')
.controller('propositionsController', function(openDataService,QueFaireService,$ionicHistory){
    
    var mv = this;
    
    mv.tabConcert =[];
    mv.tabClubbing =[];
    mv.tabSpectacle =[];
    
    //OpenDataParis "concert" and "clubbing"
    mv.requestConcert = openDataServiceRequest;
    mv.requestClubbing = openDataServiceRequest;
    
    
    function openDataServiceRequest(tag){ 
        openDataService.get_evenements(tag).
        then(function(result){
           tabConcert =result;
            console.log(tag);
            console.log(tabConcert.records);
        }, function(error){
        });
    };
    
    //ParisAPI
    mv.requestSpectacles = openDataServiceRequest(2);
    
    //activitiId: 2=spectacles
    function openDataServiceRequest(categorieId){ 
        QueFaireService.get_activities(categorieId).
        then(function(result){
           tabSpectacle =result;
            console.log(categorieId);
            console.log(tabSpectacle);
        }, function(error){
        });
    };
    
    function back(){
        $ionicHistory.goBack();
    }
});