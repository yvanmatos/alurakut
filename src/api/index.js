export default class GitHubService 
{
    static async getFollowers(user) {
        const url = `https://api.github.com/users/${user}/followers`;
        const params = new URLSearchParams();
        
        const resposta = await fetch(url + "?" + params);
        const followers = await resposta.json();
        return followers;
    }

    static async getUsername(user) {
        const url = `https://api.github.com/users/${user}`;
        const resposta = await fetch(url);
        const username = await resposta.json();
        return username;
    }
}