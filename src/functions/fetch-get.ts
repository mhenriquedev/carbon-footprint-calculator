import { environment } from "../constants/environment";

export function fetchGet(uri: string, params: string): Promise<any> {
    return fetch(environment.apiUrl + `/${uri}?` + params.toString())
        .then(response => response.json())
        .then(data => data)
        .catch(err => {
            alert(err);
        });
}