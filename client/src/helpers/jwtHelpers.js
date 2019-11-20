export default function getJwt(){
    return localStorage.getItem('auth-token');
};