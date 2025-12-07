export const BASE_URL = "http://localhost:4000/api/v1";

export const authEndpoints = {
 
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
};

export const  profileEndpoints = {
    USER_PROFILE: `${BASE_URL}/user/me`,
};
