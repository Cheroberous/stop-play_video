


chrome.storage.session.get(["myDictionary"]).then( (result) => {

    
        let dic_risistemato= JSON.parse(result.myDictionary)

        var list1 = document.getElementById('lista_video_attivi');


        for (const [key, value] of Object.entries(dic_risistemato)) {

            
                        
            
                            
            const newItem = document.createElement('li');
            newItem.className = key;                                   
            newItem.textContent =value;                            
            
            const button = document.createElement('button');
            button.textContent = "play/pause"; 
            button.className = key;                                          
            button.classList.add("custom-button");

            button.onclick = function() {
                handleClick(button.className);
            };
          
            newItem.appendChild(button);
         
            list1.appendChild(newItem);
                        
                
            }
            
         
                
        }); 




function handleClick(id_tab){                                   
 
        
    var id_num= parseInt(id_tab);
              
    chrome.tabs.sendMessage(id_num,
        
        {
        dst:"tab_sp",                                    
        video_title: "",
        your_id:id_tab
        }
             
                    
        );     
    }
        

