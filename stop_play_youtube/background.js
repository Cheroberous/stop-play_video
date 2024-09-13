




const match_video="https:\/\/www\.youtube\.com\/watch[a-zA-Z0-9]*";        
var attiva="";


var dictionary1={};

var metti_in_storage=JSON.stringify(dictionary1)





chrome.storage.session.get(null, function(items) {

    

    if(items!=null){

        var allKeys = Object.keys(items);

        if(allKeys.length==0){
            
            chrome.storage.session.set({"myDictionary": metti_in_storage}).then( () => {

           
            });
        }
   
    }


});





async function handle_storage(id_tab,video,thumbnail,funzione){



    let dic_risistemato;
    var res=await chrome.storage.session.get(["myDictionary"]);
    dic_risistemato= JSON.parse(res.myDictionary)

    if(funzione==1){

        delete dic_risistemato[id_tab]; 
    }
    else if(funzione==0){

        dic_risistemato[id_tab]=[video];                              
        dic_risistemato[id_tab].push(thumbnail);
        dic_risistemato[id_tab].push(1);
        
    }
    else if(funzione==2){

        var p=dic_risistemato[id_tab][2];
        if(p==0){
            dic_risistemato[id_tab][2]=1;
        }
        else{
            dic_risistemato[id_tab][2]=0;
        }
    }


   

    var update= await chrome.storage.session.set({"myDictionary": JSON.stringify(dic_risistemato)});





   
}




chrome.runtime.onMessage.addListener((obj, sender, sendResponse)=> { 

    if(obj.dst=="bg" && obj.page_id!=undefined){

        let id_str = (obj.page_id).toString();                               
        

        if(obj.info!=""){

            let titolo_video=obj.info;
            let thumbnail=obj.background;

            handle_storage(id_str,titolo_video,thumbnail,0);                 
          
        }

    }
    else if(obj.dst=="1_bg"){

        let id_str = (obj.info).toString();    
        handle_storage(id_str,"","",2);

    }



});



chrome.tabs.onUpdated.addListener((tabId, tab) =>{               

    

    const url_tab=tab.url;   



    if(url_tab!=undefined && url_tab.match(match_video)){      
        

        let cut= url_tab.split("?")[1];
        let image= cut.split("&")[0].slice(2);

        var thumbnail="https://img.youtube.com/vi/"+image+"/0.jpg";


        chrome.tabs.sendMessage(tabId,

            {
            dst:"cs",                                    
            video_title: thumbnail,
            your_id:tabId
            }
         
                
        );     
    
    }
  
    else if(tab.url!=undefined){        

        let id_str = (tabId).toString();

        handle_storage(id_str,"","",1);                                   
    
  

    }


});

chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{


    let id_str = (tabId).toString();

    handle_storage(id_str,"","",1);                                   






});


        
