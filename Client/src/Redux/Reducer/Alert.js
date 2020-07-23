import {ALERT_MESSAGE} from '../../Constants';

// severity = success , error , warning ,info
const initial = {
        status : false,
        message : "",
        severity : ""
}

const alertReducer = (state =initial,action)=>{
    switch(action.type){
        case ALERT_MESSAGE:
            return action.payload;
        default :
        return state;
    }

}

export default alertReducer;