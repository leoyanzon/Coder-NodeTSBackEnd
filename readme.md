Kill other processes on port X
If you find yourself with a wall of text because you have many processes running, then you could search the processes opened by port ( like normally when I start a react application is on port 3000 while its backend is on port 3001:
lsof -i :3001 
Once you have your process and its ID..

then just kill it without mercy!
kill -9 PROCESS_ID 