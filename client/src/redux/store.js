import {configureStore} from '@reduxjs/toolkit'

import  storeAndRemoveToken  from './token'

export default configureStore({
    reducer:{
        token:storeAndRemoveToken
    }
})
