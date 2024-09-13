


var stato={};

chrome.storage.session.get(["myDictionary"]).then( (result) => {


        let dic_risistemato= JSON.parse(result.myDictionary)

        var list1 = document.getElementById('lista_video_attivi');

        let i=0;
        for (const [key, value] of Object.entries(dic_risistemato)) {


            const stato_bottone=value[2];

            stato[key]=stato_bottone

                        
            
                            
            const newItem = document.createElement('li');
            newItem.style.backgroundImage = `url(${value[1]})`;
            newItem.style.backgroundSize = 'cover';
            newItem.style.backgroundPosition = 'center';
            newItem.className = key;                                  
           

                
            newItem.textContent =value[0];                            
            
            const button = document.createElement('button');
            const f = document.createElement('button');
       


            const icon = document.createElement('i');
            icon.className = 'material-icons';
            if(stato_bottone==1){
            icon.textContent = 'stop';
            }
            else{
                icon.textContent = 'play_arrow';
            }
            button.appendChild(icon);

            const icon1 = document.createElement('i');
            icon1.className = 'material-icons';
            icon1.textContent = 'skip_next';
            f.appendChild(icon1);



       

            button.className = key;                                         
            button.id = key;
            f.className = key;                                           
            button.classList.add("custom-button");
            button.dataset.info = i;
            f.classList.add("custom-button");





            button.onclick = function() {
                update_play_pause(button.className);
                handleClick(button.id,button);
            };
            f.onclick = function() {
                handleClick1(button.id,0);
            };
        
            newItem.appendChild(button);
            newItem.appendChild(f);
            list1.appendChild(newItem);
                        
                
            }
            
         
                
        }); 





function handleClick(id_tab,bottone_interessato){                                     

   
    const play_n=stato[id_tab];


    const icon = bottone_interessato.querySelector('i');

    if (play_n==1) {
        icon.textContent = 'play_arrow';
        stato[id_tab]=0;
    }
    else{
        icon.textContent = 'stop';
        stato[id_tab]=1;
    }
    
    var id_num= parseInt(id_tab);
  
        
    

    chrome.tabs.sendMessage(id_num,
        
        {
        dst:"tab_sp",                                    
        video_title: "",
        your_id:id_tab,
        }
             
                    
        ); 
        
 
}

    function handleClick1(id_tab,action){                                      
            
        var id_num= parseInt(id_tab);
        let stringa;

        if(action===0){
            stringa="f";
        }
    
      
    
        chrome.tabs.sendMessage(id_num,
            
            {
            dst:stringa,                                    
            video_title: "",
            your_id:id_tab
            }
                 
                        
            );     
        }




async function update_play_pause(id_tab_n){

    var id_num= parseInt(id_tab_n);

    chrome.runtime.sendMessage(

        {
        dst: "1_bg",
        info: id_num
        }
    
    );
        
        
           
}
