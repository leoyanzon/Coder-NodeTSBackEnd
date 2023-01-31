function getRandomNumbers(iteration){
    const max = 1000;
    const min = 1;
    let data = [];
    if (!iteration){
        iteration = 100000000;
    }
    for (let i = 0; i < iteration; i++){
        let number = Math.floor(Math.random() * max - min) + min;
        const index = data.findIndex((i, idx)=>{
            if(i.key == number){
                return true;
        }})
        if (index != -1){
            data[index] = {
                key: number,
                repeat: data[index].repeat + 1
            }
        } else {
            data.push({ key:number, repeat:1})
            }
    } 
    return data
}

process.on('message', (argument) => {
    let parsedArgument = JSON.parse(argument);
    if (parsedArgument.action == 'start'){
        process.send({
            success: true,
            data: getRandomNumbers(parsedArgument.q)
        })
    } else {
        process.send({
            success: false,
            data: 'Wrong message'
        })
    }
    
})