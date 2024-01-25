type avatar = {
    public_id: string;
    url: string;
}
export interface IUser{
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar: avatar;
}