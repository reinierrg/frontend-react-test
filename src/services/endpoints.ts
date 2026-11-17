export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const API_ENDPOINTS = {
    GET_USERS: `/users`,
    GET_POSTSBYUSER: (userId: number) => `/posts?userId=${userId}`,
    POST_CREATEPOSTS: `/posts`,
};
