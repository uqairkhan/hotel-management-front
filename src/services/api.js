import resolve from "./resolve";
import axios from 'axios'
let apiBase ="http://192.168.1.16:3002/api/"// process.env.REACT_APP_API_BASEURL;

//login
export const userLogin = async (req) => {
    return await resolve(axios.post(apiBase + "user/login", req).then(res => res.data))
}
export const findAllRooms = async () => {
    return await resolve(axios.get(apiBase + "room/findAll").then(res => res.data))
}
export const addNewBooking = async (data) => {
    return await resolve(axios.post(apiBase + "bookings/add",data).then(res => res.data))
}
export const findAllBookings = async (data={}) => {
    return await resolve(axios.post(apiBase + "bookings/findAll",data).then(res => res.data))
}
export const updateBooking = async (id,data) => {
    return await resolve(axios.put(apiBase + `bookings/update/${id}`,data).then(res => res.data))
}

export const roomAvailableCount = async () => {
    return await resolve(axios.get(apiBase + `room/availableCount`).then(res => res.data))
}
export const allStaff = async () => {
    return await resolve(axios.get(apiBase + `staff/findAll`).then(res => res.data))
}