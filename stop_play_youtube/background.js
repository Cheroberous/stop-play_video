


//watch
const match_video="https:\/\/www\.youtube\.com\/watch[a-zA-Z0-9]*";          // valuta se parsare identificativo video
var attiva="";
const debug=0;

//console.log("background richiamato da zero");

var dictionary={};
var dictionary1={};


/*{
    dst: "bg",
    info: titolo_video,
    page_id: my_id
}*/

chrome.runtime.onMessage.addListener((obj, sender, sendResponse)=> { 

    if(obj.dst=="bg" && obj.page_id!=undefined){

        let id_str = (obj.page_id).toString();
        
        //console.log("arrivato un messaggio (gg)");

        if(obj.info!=""){

            //console.log("id: ",id_str, "titolo: ",obj.info)
        
            //console.log("aggiungo nuovo video");
            dictionary1[id_str]=obj.info;                          
            //console.log("dizionario: ",dictionary1);
        }

    }

    if(obj.dst=="lista"){
        //console.log("arrivata richiesta da popup");
       //console.log("stato: ",dictionary1);


        sendResponse({
            info: dictionary1
        });

    }



});





chrome.tabs.onUpdated.addListener((tabId, tab) =>{               

    
  



    if(tab.url!=undefined && tab.url.match(match_video)){         
     

        //console.log("cambiata pagina youtube/a youtube quindi mando messaggio:", tabId);
        chrome.tabs.sendMessage(tabId,

            {
            dst:"cs",                                    
            video_title: "",
            your_id:tabId
            }
         
                
        );     
    
    }

});

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{

    //console.log("scheda chiusa elimino entry dizionario");
    //console.log("dizionario prima: ",dictionary1);

    let id_str = (tabId).toString();

    delete dictionary1[id_str];                                              

    //console.log("dizionario dopo: ",dictionary1);




});
        
