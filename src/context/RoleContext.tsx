import React from 'react'
import { Outlet } from 'react-router-dom';
export const RoleContext = React.createContext('');

export type RoleContextType ={
    role:string
}

const RoleProvider:React.FC<RoleContextType> = ({role}) => {
  return (
    <RoleContext.Provider value={role}>
       <Outlet/>
    </RoleContext.Provider>

  )
}

export default RoleProvider