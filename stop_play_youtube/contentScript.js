

var debug=1;
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
    function get_f_button() {

        return new Promise((resolve)=>{

            const interval = setInterval(()=>{
                const prendo_button = document.getElementsByClassName("ytp-next-button ytp-button")[0];
                if(prendo_button){
                    clearInterval(interval)
                    resolve(prendo_button);
                }
            }, 500);

        });

    }

    chrome.runtime.onMessage.addListener((obj, sender, response)=> { 
        
   
        if(obj.dst=="cs"){                 
     
            setTimeout(do_your_thing, 2000,obj.your_id,obj.video_title); 

        }

        if(obj.dst=="tab_sp"){

            pause_play.click();
        }
        if(obj.dst=="f"){

            forward.click();

        }
     

    });

  

    function send_info_to_popup(titolo_video,my_id,thumbnail){
        chrome.runtime.sendMessage(
        
            {
                dst: "bg",
                info: titolo_video,
                page_id: my_id,
                background: thumbnail
            }
            
          );
    }

 


var pause_play;
var forward;
var back;
var me;


    async function do_your_thing(page_id,thumbnail) {       


            me=page_id;

            pause_play= await get_button();                 
            const titolo = await get_title();                    
            forward= await get_f_button();
                  

            sessionStorage.setItem("titolo",titolo.outerText);   
            sessionStorage.setItem("bottone", pause_play);   


            send_info_to_popup(titolo.outerText,page_id,thumbnail);


    }

    document.addEventListener('click', function(event) {

        if (event.isTrusted) {

            var x=event.target.className;                       

            if (x!=undefined && (x=='ytp-play-button ytp-button' || x=="video-stream html5-main-video")) {

                    send_msg();
            }
        
        }
 
    });

   
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.key === ' ') {
            send_msg();
       
        }
    });

    function send_msg(){

        if(me!=undefined){
    
            chrome.runtime.sendMessage(
    
                {
                dst: "1_bg",
                info: me
                }
            
            );
        }
    }
