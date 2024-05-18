let global = {
    files:[],
    webUrl:{},
    details:{
        coverImage:'',
        name:'',
        songTitle:'',
        instaId:''
    }
}
const handleFiles = (state = global,action) =>{
    switch(action.type){
        case 'ADD':
            global.files = [...global.files,action.data]
            return global
        case 'DELETE':
            global.files = global.files.filter((item,i) => i!== action.index)
            return global
        case 'ADD URL':
            global.webUrl = {...action.data};
            return global;
        case 'ADD DETAILS':
            global.details={...action.data};
            console.log(global)
            return global;
        default:
        return global;
    }
    
}

export default handleFiles