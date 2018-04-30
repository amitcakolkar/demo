import axios from 'axios';

export const selectUser = (user) => {
    // console.log("You clicked on user: ", user.id);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const updateSearchusers = (updateSearchusers) => {
    console.log("Your search text: ", updateSearchusers);
        var passStr = "https://api.github.com/search/users?q=" + updateSearchusers;

        function dataFunc(passStr){
            return axios.get(passStr)
            .then( (response)=> {
                console.log(response);
                // userData = response.data.items; 
                return response.data.items;
               
            })
            .catch( (error)=> {
                console.log(error);
            });
        }

        var userData = dataFunc(passStr);
        console.log("userData: ",userData);
        
        return {
            type: 'USER_SEARCH',
            payload: updateSearchusers
        }
    
};