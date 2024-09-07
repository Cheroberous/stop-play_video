











const match_video="https:\/\/www\.youtube\.com\/watch[a-zA-Z0-9]*";          
var attiva="";
const debug=0;




var dictionary1={};

var dictionary={var: "unico elemento"};
var metti_in_storage=JSON.stringify(dictionary1)





chrome.storage.session.get(null, function(items) {


    if(items!=null){
        var allKeys = Object.keys(items);

        if(allKeys.length==0){
            
            chrome.storage.session.set({"myDictionary": metti_in_storage}).then( () => {

           
            });
        }
        else{
            chrome.storage.session.get(["myDictionary"]).then( (result) => {

            let dic_risistemato= JSON.parse(result.myDictionary)

            dictionary1=dic_risistemato;

        
            
                
        }); 

        }


    }


});





async function handle_storage(id_tab,video,funzione){



    let dic_risistemato;
    var res=await chrome.storage.session.get(["myDictionary"]);
    dic_risistemato= JSON.parse(res.myDictionary)

    if(funzione==1){
        delete dic_risistemato[id_tab]; 
    }
    else{
        dic_risistemato[id_tab]=video;

    }

   

    var update= await chrome.storage.session.set({"myDictionary": JSON.stringify(dic_risistemato)});

    var res1=await chrome.storage.session.get(["myDictionary"]);
    dic_risistemato= JSON.parse(res1.myDictionary)


   
}




chrome.runtime.onMessage.addListener((obj, sender, sendResponse)=> { 

    if(obj.dst=="bg" && obj.page_id!=undefined){

        let id_str = (obj.page_id).toString();                              
        
      

        if(obj.info!=""){

            let titolo_video=obj.info;
            handle_storage(id_str,titolo_video,0);               

            
        }

    }



});



chrome.tabs.onUpdated.addListener((tabId, tab) =>{               


    if(tab.url!=undefined && tab.url.match(match_video)){               
     

        chrome.tabs.sendMessage(tabId,

            {
            dst:"cs",                                    
            video_title: "",
            your_id:tabId
            }
         
                
        );     
    
    }
    else if(tab.url!=undefined){        

        let id_str = (tabId).toString();

        handle_storage(id_str,"",1);                                   
    
  

    }


});

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{


    let id_str = (tabId).toString();

    handle_storage(id_str,"",1);                                 





});


        
