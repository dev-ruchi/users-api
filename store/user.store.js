import User from "../models/user.models.js";

export function create(data) {
    return User.create(data);
} 

export function findUser(data){
    return User.findOne(data);
}