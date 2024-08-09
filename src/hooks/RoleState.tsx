import React, { useContext } from 'react'
import {RoleContext} from '../context/RoleContext';



function useRole(){

    console.log('checking for rrle : ')
    const context:string =useContext(RoleContext);

    console.log('role: ',context)
    if(context==undefined){
        throw new Error('User role must be used within a RoleProvider')
    }

    return context;
}

export default useRole