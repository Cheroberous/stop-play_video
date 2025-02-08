

var debug=1;
var x;
var pause_play;
var forward;
var back;
var data;
var controller;
var me;
var video_tot_time;
var video_title;


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


    function get_data(action) {

    var string;
    var pos=0;
    if(action==0){
        string="ytp-next-button ytp-button";                    //forward button
    }
    if(action==1){
        string="video-stream html5-main-video";                 // per dati 
    }
    if(action==2){
        string="style-scope ytd-watch-metadata";                  //titolo
        pos=1;
    }
    if(action==3){
        string="ytp-play-button ytp-button";                     //stop/play
    }
    if(action==4){
        string="video-stream";
    }
    if(action==5){                       //per adv
        string="video-ads ytp-ad-module";
    }
        return new Promise((resolve)=>{

            const interval = setInterval(()=>{
                const prendo_button = document.getElementsByClassName(string)[pos];
                if(prendo_button){
                    clearInterval(interval)
                    resolve(prendo_button);
                }
            }, 500);     

        });
    

    }




chrome.runtime.onMessage.addListener((obj, sender, sendResponse)=> { 
        

        if(obj.dst=="cs"){                   
           


            do_your_thing(obj.your_id,obj.video_title); 

            return false;

        }

        if(obj.dst=="time"){
            controller.currentTime=obj.info;
            return false;
        }

        if(obj.dst=="tab_sp"){
            pause_play.click();
            return false;

        }
        if(obj.dst=="f"){

            forward.click();
            return false;


        }

     

        if(obj.dst=="info"){
            var data1=get_data(1).then((result)=>{


                var x1=result.duration;
                var y=result.currentTime;

                sendResponse({
                    max: x1,
                    cur: y

                });


            });
        

       


        return true;            
        
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

   
var old_src;
var new_src;


const config = {
    childList: true, // Monitor direct child elements
    attributes:true,
    subtree: true,   // Monitor all descendants
    characterData: true, // Monitor text content changes
    characterDataOldValue: true // Capture old text content
};
const  observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
            
            if (mutation.type === 'childList') {

                var new_duration=get_data(5).then((result)=>{                   

                    if(result.textContent!=""){

                        var new_duration=get_data(1).then((result)=>{  

                            if(result.duration!=undefined && !isNaN(result.duration) && result.duration<240){

                                controller.currentTime=result.duration;
                                
                            }
                        });

                    }
        
                   
    
                });
            }


      
    }
});




async function do_your_thing(page_id,thumbnail) {      

        
        
            me=page_id;
            var already=0;

            
        
       
            var control=get_data(4).then((cnt)=>{

                controller=cnt;

                var data2=get_data(5).then((adv_class)=>{

                    observer.observe(adv_class, config); 
    
                    if(adv_class.textContent!=""){

                        already=1;
                        
                        var data1=get_data(1).then((result)=>{
                                   
                    
                            var end_adv=result.duration;

                                                                               
                            if(result.duration!=undefined && !isNaN(end_adv) && result.duration<240){


                                cnt.currentTime=end_adv;     
                            
                            }
                    
                            
                
            
                        });

    
                    }
    
                
                
                });

            });
           



         

           
            pause_play= await get_data(3);                 
            const titolo = await get_data(2);                      
            forward= await get_data(0);
            
 

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
            info: me,
            action: 1
            }
        
        );
    }
}



    


  




