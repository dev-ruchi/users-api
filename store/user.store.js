import User from "../models/user.models.js";

export function create(data) {
    return User.create(data);
} 

export function findUser(query) {
    return User.findOne(query);
}

export function searchUsers(query){
    return User.find(query);
} 