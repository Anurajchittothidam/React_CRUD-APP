import { createSlice } from "@reduxjs/toolkit";

export const storeAndRemoveToken=createSlice({
    name:"token",
    initialState:{
        id:'',
        name:'',
        email:'',
        token:'',
        getAllUsers:[],
        userData:{},
        searchData:''
    },

    reducers:{
        storetoken:(state,action)=>{
            const {email,id,name,token}=action.payload
            console.log(email,id,name,token)
            state.id=id
            state.email=email
            state.name=name
            state.token=token
        },
        removetoken:(state,action)=>{
            state.token=""
            state.id=""
            state.name=""
            state.email=""
        },
        storeAdminToken:(state,action)=>{
            const {email,id,name,token}=action.payload
           console.log(email,id,name,token)
           state.id=id
           state.email=email
           state.name=name
           state.token=token
        },
        removeAdminToken:(state,action)=>{
            state.token=""
            state.id=""
            state.name=""
            state.email=""
        },
        getUsers:(state,action)=>{
            state.getAllUsers=action.payload.users
        },
        getUserDetails:(state,action)=>{
            state.userData=action.payload.users
        },
        searchData:(state,action)=>{
            state.searchData=action.payload
        }
    }
})

console.log("token",storeAndRemoveToken)
export const {storetoken,removetoken,storeAdminToken,removeAdminToken,getUsers,getUserDetails,searchData}=storeAndRemoveToken.actions
export default storeAndRemoveToken.reducer