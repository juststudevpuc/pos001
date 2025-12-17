import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState =[];

const userSlice = createSlice({
  name: 'users',
  initialState, 
    reducers: { 
      // add user
        addUser: (state, actions)=>{
          if (!Array.isArray(state)) return [actions.payload];
        },
        // update by user id
        updateUser: (state, actions) =>{
          const {id, data} = actions.payload;
          const index = state.findIndex((item)=>item.id === id);
          if (index !== -1){
            state[index] = {...state[index], ...data};
          }
        },
        // delete
        deleteUser: (state, actions) => {
          return state.filter((item)=> item.id !== actions.payload);
        },
        // clear all
        ClearAll: () => initialState,
    },
});

export const {addUser,updateUser,deleteUser,ClearAll} = userSlice.actions;
export default userSlice.reducer;