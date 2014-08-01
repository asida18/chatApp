
     var socket;
     var username;

        window.onload = function() {
            document.getElementById('login').addEventListener(
            'click',
                function(e){
                    e.preventDefault();
                    socket = io.connect('http://{SERVER ADDRESS HERE}:10000');
                    username = document.getElementById('username').value;
          
                    serverListener();
                    urltoImage();
        }
    );
        // Event listener for when preview button is clicked
    
            document.getElementById('preview').addEventListener(
            'click',
                function(e){
                    var src = document.getElementById("url").value;
                    console.log(src);
                    
                    var width,height;
                    var img = document.createElement("img");
                    img.src = src;
                    img.width = 400;
                    img.height = 305;
                     // This next line will just add it to the <body> tag
                    document.body.appendChild(img);
                    console.log(img);
                    
                        if (confirm("PREVIEW: Press OK to delete preview") === true) 
                            document.body.removeChild(img);
                        else 
                             ;
                }
    );
};

function serverListener() {
    document.querySelector('#loginForm').classList.add('hidden');
    document.querySelector('#chatRoom').classList.remove('hidden');

    socket.on(
        'message', 
        function(data) {
            var theMessage=data.username + ' says : ' + data.message;


            document.getElementById('messages').innerHTML = (
                theMessage + '<br>' +
                document.getElementById('messages').innerHTML 
            );
        }
    );
    
    /* THIS IS THE EVENT LISTENER FOR THE BACKGROUND CHANGE */
    
    socket.on(
        'bgChange',
        function(data) {
             document.querySelector('body').style.backgroundColor = data.color;
        }
    );

    document.getElementById('send').addEventListener(
        'click',
        function(){
            document.getElementById('message').value=document.getElementById('message').value.replace(
                /[\n\r]/ig,
                '<br>'
            );
            
            socket.emit(
                'message', 
                {
                    username: username, 
                    message : document.getElementById('message').value
                }
            );
            
            socket.emit(
                'bgChange',
                {
                   color:document.getElementById('background-color').value
                }
            );

            document.getElementById('message').value='';
            document.querySelector('body').value='';
        }
    );
}

function urltoImage(){
    socket.on(
        'url', 
        function(data) {
            var theUrl=data.username + ' says : ' ;


            document.getElementById('messages').innerHTML = (
                theUrl + '<img src=' + data.url+ ' style = "width:400px; height:305px; border-radius:15px">' 
                 + '<br>' +
                 document.getElementById('messages').innerHTML 
            );
        }
    );
    
    
    // Event listener for when submit is clicked
    document.getElementById('sendImage').addEventListener(
        'click',
        function(){

            socket.emit(
                'url',
            {
                username:username,
                url:document.getElementById("url").value
                
            }
        );
            document.getElementById('url').value='';
     }
  );
}
