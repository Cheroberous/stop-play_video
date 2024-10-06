

var debug=1;
var x;
var pause_play;
var forward;
var back;
var data;
var controller;
var me;




    function get_data(action) {

    var string;
    var pos=0;
    if(action==0){
        string="ytp-next-button ytp-button";                   
    }
    if(action==1){
        string="video-stream html5-main-video";                 
    }
    if(action==2){
        string="style-scope ytd-watch-metadata";               
        pos=1;
    }
    if(action==3){
        string="ytp-play-button ytp-button";                   
    }
    if(action==4){
        string="video-stream";
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
        
            setTimeout(do_your_thing, 2000,obj.your_id,obj.video_title); 
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







    async function do_your_thing(page_id,thumbnail) {       

     
            me=page_id;


            pause_play= await get_data(3);                 
            const titolo = await get_data(2);                      
            forward= await get_data(0);
            controller= await get_data(4);



            send_info_to_popup(titolo.outerText,page_id,thumbnail);

         

    }






  
    document.addEventListener('click', function(event) {

        if (event.isTrusted) {
        

            var x=event.target.className;                      
            console.log("classe: ",x);

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



    


  




