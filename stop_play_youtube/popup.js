



chrome.storage.onChanged.addListener((changes,areaname)=>{



    chrome.storage.session.get(["myDictionary"]).then( (result) => {


        if(result.myDictionary!=undefined){
            let dic_risistemato= JSON.parse(result.myDictionary)

            var list1 = document.getElementById('lista_video_attivi');

            let i=0;
            for (const [key, value] of Object.entries(dic_risistemato)) {

            var st="b"+String(key);
            var st_1="c"+String(key);


            const element = document.getElementById(st);
            const element1 = document.getElementById(st_1);

            if(element!=undefined){

            element1.style.backgroundImage = `url(${value[1]})`;

            element.innerText=value[0];

            }



            }
        }

 
    });
    






    });




var stato={};

chrome.storage.session.get(["myDictionary"]).then( (result) => {

    if(result.myDictionary!=undefined){
        let dic_risistemato= JSON.parse(result.myDictionary)

        var list1 = document.getElementById('lista_video_attivi');

        let i=0;
        for (const [key, value] of Object.entries(dic_risistemato)) {

            const stato_bottone=value[2];

            stato[key]=stato_bottone




            var a= parseInt(key);



            const newItem = document.createElement('li');

            newItem.style.backgroundImage = `url(${value[1]})`;
            newItem.style.backgroundSize = 'cover';
            newItem.style.backgroundPosition = 'center';
            newItem.id="c"+key;                                         
                
            const t = document.createElement('span');
            t.textContent=value[0];
            t.id="b"+key;


                    
            const button = document.createElement('button');
            const f = document.createElement('button');
            const close = document.createElement('button');




            const icon = document.createElement('i');
            icon.className = 'material-icons';
            icon.classList.add("green");

            if(stato_bottone==1){
            icon.textContent = 'stop';
            }
            else{
                icon.textContent = 'play_arrow';
            }
            button.appendChild(icon);

            const icon1 = document.createElement('i');
            icon1.className = 'material-icons';
            icon1.classList.add("green");

            icon1.textContent = 'skip_next';
            f.appendChild(icon1);

            const icon2 = document.createElement('i');
            icon2.className = 'material-icons';
            icon2.classList.add("red");

            icon2.textContent = 'close';
            close.appendChild(icon2);


            button.className = key;                                        
            button.id = key;
            f.className = key;      
            close.id=key;                                    

            button.classList.add("custom-button");
            close.classList.add("button-close");
            button.dataset.info = i;
            f.classList.add("custom-button");


            newItem.addEventListener('click', function (event) {

                
                    
                    if (event.target.id.startsWith("c")) {

                        var id_to_send=parseInt(event.target.id.slice(1)); 

                        chrome.runtime.sendMessage(

                            {
                            dst: "1_bg",
                            info: id_to_send,
                            action: 2                                                                          
                            }
                        
                        );


                        
                    }
                


            });
            

            
            newItem.addEventListener('contextmenu', function (event) {

                

                var id_to_send=parseInt(event.target.id.slice(1)); 

                chrome.runtime.sendMessage(

                    {
                    dst: "1_bg",
                    info: id_to_send,
                    action: 3                                                                           
                    }
                
                );
                    
                }
            );



            button.onclick = function() {
                update_play_pause(button.className);
                handleClick(button.id,button);
            };
            f.onclick = function() {
                handleClick1(button.id,0);
            };
            close.onclick = function() {
                handleClick1(close.id,1);
            };
                   


            newItem.appendChild(t);
            newItem.appendChild(button);
            newItem.appendChild(f);
            newItem.appendChild(close);

            list1.appendChild(newItem);
  
        }

        for (const [key, value] of Object.entries(dic_risistemato)) {

            var a1= parseInt(key);

            var li_id="c"+key;

            const list_item=document.getElementById(li_id);


            chrome.tabs.sendMessage(a1,
                
                {
                    dst:"info"                                 
                            
                }, (response)=>{


                    var max=response.max;
                    var curr=response.cur;

                    // CREO ELEMENTO TIME BAR PER SINGOLO VIDEO

                    const p_g=document.createElement("input");
                    p_g.id="a"+key;
                    p_g.classList.add("progress");
                    p_g.setAttribute('type', 'range');
                    p_g.setAttribute('min', '0');
                    p_g.setAttribute('max', max);
                    if(curr!=undefined){
                        p_g.setAttribute('value', curr);
                    }
                    else{
                        p_g.setAttribute('value', "0");

                    }
                    p_g.setAttribute('step', '1');

                    list_item.appendChild(p_g);                                              

                    p_g.offsetHeight;

                    setTimeout(() => {
                        p_g.classList.add('fade-in');
                    }, 10); 


                 


                    p_g.addEventListener('change', (event) => {
                        const element = event.target;

                        var t=element.id.substring(1);
                        var t1= parseInt(t);
  
            
                        chrome.tabs.sendMessage(t1,
                            
                            {
                            dst:"time",                                    
                            info: element.value
                            }
                                
                                        
                            ); 
                    });




            }
        );



        }

 
            
    }
    startTimer();

                
}); 



function startTimer() {
    const timerId = setInterval(() => {
        update_p_g();
    }, 1000);

}





function update_p_g(){                                       
    const e_class="progress";

    for (let key in stato) {


        if(stato[key]==1){

            var e_id="a"+String(key);


            const element = document.querySelector(`#${e_id}.${e_class}`);

            if(element){

                var x=element.getAttribute('value');
                var y=parseInt(x);


                element.setAttribute('value', y+1);

            }

        }

    }


}


function handleClick(id_tab,bottone_interessato,msg){                                    
   
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
 
        if(action==0){                                                                                         
            stringa="f";
            chrome.tabs.sendMessage(id_num,
            
                {
                dst:stringa,                                    
                video_title: "",
                your_id:id_tab
                }
                     
                            
            ); 
        }
   
        else if(action==1){          

            const listItem_da_togliere = document.getElementById("c"+id_tab);
            listItem_da_togliere.remove();


            delete stato[id_num];

            chrome.runtime.sendMessage(

                {
                dst: "1_bg",
                info: id_num,
                action: 0                                                                           
                }
            
            );
    
        }
      
    
           
        }




async function update_play_pause(id_tab_n){

        var id_num= parseInt(id_tab_n);


        chrome.runtime.sendMessage(

            {
            dst: "1_bg",
            info: id_num,
            action: 1                  
            }
        
        );

 
        
        
}
