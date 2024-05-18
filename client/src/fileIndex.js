export const addFile = (file,title) => { 
    return {
        type: 'ADD',
        data:{
            file,title
        }
    }
 }
 export const deleteFile = (index) =>{
    return {
        type : 'DELETE',
        index
    } 
 }
 export const addUrl = (data)=>{
    return{
        type:'ADD URL',
        data
    }
 }
 export const addDetails = (data)=>{
    return{
        type:'ADD DETAILS',
        data
    }
}