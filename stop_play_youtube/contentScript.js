
var x;

    function get_title() {

        return new Promise((resolve)=>{

            const interval = setInterval(()=>{
                const prendo_titolo = document.getElementsByClassName("style-scope ytd-watch-metadata")[1];
                if(prendo_titolo){
             
                    clearInterval(interval)
                    resolve(prendo_titolo);
                }
            }, 500);

        });

    }
    function get_button() {

        return new Promise((resolve)=>{

            const interval = setInterval(()=>{
                const prendo_button = document.getElementsByClassName("ytp-play-button ytp-button")[0];
                if(prendo_button){
      
                    clearInterval(interval)
                    resolve(prendo_button);
                }
            }, 500);

        });

    }


    // riceve messaggio da bg quando è cambiato video youtube
    chrome.runtime.onMessage.addListener((obj, sender, response)=> { 
        
        //console.log("arrivato un messaggio (cs)");

        if(obj.dst=="cs"){                  
          

            //console.log("arrivato messaggio per cs, controllo se sono su video youtube o pagina home");
            setTimeout(do_your_thing, 2000,obj.your_id); 
      

        }

        if(obj.dst=="tab_sp"){
            //console.log("dovrei stoppare il video nella mia scheda");
            //console.log("bottone: ",pause_play);
            pause_play.click();
        }

    });

    

    function send_info_to_popup(titolo_video,my_id){
        //console.log("dovrei mandare a popup == ",titolo_video);
        chrome.runtime.sendMessage(
        
            {
                dst: "bg",
                info: titolo_video,
                page_id: my_id
            }
            
          );
    }


var pause_play;


    async function do_your_thing(page_id) {       

        //console.log("rieseguo script per refresh/cambio video");




        

            //console.log('sono in un video, retriving title');

            pause_play= await get_button();               
            const titolo = await get_title();                 
            

            //console.log("titolo == ",titolo.outerText);             

            sessionStorage.setItem("titolo",titolo.outerText);   
            sessionStorage.setItem("bottone", pause_play);   

            //console.log("RITORNATE ENTRABE");

            send_info_to_popup(titolo.outerText,page_id);

        

        
       




    }

 

    


  



















// async function do_things(){
/*
chrome.tabs.onUpdated.addListener((tabId, tab) =>{                // messaggio mandato circa 8000 mila volte

    // const ident=tabId;          
    //console.log("so che ha ricaricato");
    //console.log("tab id: ",tabId);
    // //console.log("dove sono  == ",tab.url);           //funziona per pagne normali (google)
    // //console.log("dove sono  == ",tab.pendingUrl);
    // //console.log("chi sono  == ",tab.title);

    chrome.tabs.query({ active: true},(tab_ris)=>{                        // controlla se è un video di toutube e prendii il titolo

        const id=tab_ris[0].id;
        const new_url=tab_ris[0].url;                         // funziona se refresho youtube
        const new_url1=tab_ris[0].pendingUrl;                 
        const title=tab_ris[0].title;                 


        //if(new_url.match(match_video) && new_url!=attiva){

            // var ele = document.querySelector('#title.style-scope.ytd-watch-metadata');

            attiva=new_url;

            //console.log("tab  == ",tab_ris[0].id);
            //console.log("dove sono andato == ",new_url);
            // //console.log("dove sono andato1 == ",new_url1);
            //console.log("chi sono sono1 == ",tab_ris[0].title);  // sembra prenderlo


            

            chrome.runtime.sendMessage({

                tab_id: id,
                tab_title: title,
                tab_url: new_url

                }
            );

        //}

        

    });          
    

    
    // if (tab.url && tab.url.includes("youtube.com/watch")){

    //     const queryParameters=  tab.url.split("?")[1];
    //     const urlParameters = new URLSearchParams(queryParameters);

    //     //console.log(urlParameters);

    //     chrome.tabs.sendMessage(tabId, {

    //         type: "NEW",
    //         videold: urlParameters.get("v")

    //     });
    // }
});





*/















    // chrome.runtime.onMessage.addListener((obj, sender, response)=> {           // ricevere da background

    //     const {type,value,videoId } = obj;

       
    //     //console.log("ricevuto messaggio da background");

    //     setTimeout(function() {
    //         var x= document.getElementsByClassName("ytp-play-button ytp-button");
    //         // //console.log("trovato == ",x);
    //         // x[0].click();
    //         //console.log("ho clickato");
    //       }, 6000);
        

    // });