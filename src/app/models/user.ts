import {Campus} from "./campus.model";

export class User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    campus_id : number ;
    campus: Campus;
}
