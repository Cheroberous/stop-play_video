
//console.log("popup opened");

var x= chrome.runtime.sendMessage(
        
            {
                dst:"lista",                                    
                video_title: "x",
                your_id:""
            }, (response)=>{
                //console.log("arrivata response, accedo dizionario");
                // var reparsed= JSON.parse(response);
                //console.log(response.info);
                
               

                // if(response.info!=undefined){

                    // //console.log("not empty");

                    var list1 = document.getElementById('lista_video_attivi');
                    for (const [key, value] of Object.entries(response.info)) {
                        //console.log("contenuto");
                        //console.log(key, value);
            
                        
            
                        //console.log("dovrei aggiungere lista elementi a html");
                            
                        const newItem = document.createElement('li');
                        newItem.className = key;                                      // do sia all'item che al button la classname id
                        // Add content to the new item
                        newItem.textContent =value;                            
            
                        const button = document.createElement('button');
                        button.textContent = "play/pause"; // Set the button's text to the list item's text          metti una immagine??
                        button.className = key;                                           // do sia all'item che al button la classname id
                        button.classList.add("custom-button");

                        button.onclick = function() {
                            handleClick(button.className);
                        };
                        // Append the button to the list item
                        newItem.appendChild(button);
                        // Append the list item (with the button) to the list
                        list1.appendChild(newItem);
                        
                
                    }
                // }

            }
          );




function handleClick(id_tab){                                      //potrebbe anche mandarla lui al content
    //console.log("vuoi chiudere video di tab: ",id_tab);
        
    var id_num= parseInt(id_tab);
    
        
    chrome.tabs.sendMessage(id_num,
        
        {
        dst:"tab_sp",                                    
        video_title: "",
        your_id:id_tab
        }
             
                    
        );     
    }
        

