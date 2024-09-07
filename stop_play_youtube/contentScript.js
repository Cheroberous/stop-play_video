

var debug=0;
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


    chrome.runtime.onMessage.addListener((obj, sender, response)=> { 
        

        if(obj.dst=="cs"){                  

            setTimeout(do_your_thing, 2000,obj.your_id); 

        }

        if(obj.dst=="tab_sp"){
      
            pause_play.click();
        }

    });


    function send_info_to_popup(titolo_video,my_id){
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

            pause_play= await get_button();                 
            const titolo = await get_title();                    
                     

            sessionStorage.setItem("titolo",titolo.outerText);   
            sessionStorage.setItem("bottone", pause_play);   


            send_info_to_popup(titolo.outerText,page_id);

        

        
       




    }

  

    


  



















