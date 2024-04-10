export interface IRoom {
    id: string,
    roomNumber: number,
    //TODO add validation for capacity(min 1 - max 10)
    capacity: number,
    hotelId: string
}