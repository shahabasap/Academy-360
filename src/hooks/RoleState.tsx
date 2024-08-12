import React, { useContext } from 'react'
import {RoleContext} from '../context/RoleContext';



function useRole(){

  
    const context:string =useContext(RoleContext);

 
    if(context==undefined){
        throw new Error('User role must be used within a RoleProvider')
    }

    return context;
}

export default useRole