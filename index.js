var a=require('express')();
var http=require('http').Server(a);
var io=require('socket.io')(http);

a.get('/',function(req,res){
	res.sendFile('index.html',{root:__dirname});
});
users=[];
io.on('connection',function(socket){
	console.log('A User is Connected');
	socket.on('setUsername',function(data){
		console.log(data);
		if(users.indexOf(data)>-1){
			socket.emit('userExists',data+'username is taken...');
		}
		else{
				users.push(data);
			socket.emit('userSet',{username:data});
		}
	});
	socket.on('msg',function(data){
		io.sockets.emit('newmsg',data);
	})
});
http.listen(3000,function(){
	console.log('listening on localhost:3000');
});