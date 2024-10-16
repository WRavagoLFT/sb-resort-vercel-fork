

interface MainOptions {
    label: string;
    value: string;
}
interface FilterByCol {
    column: string;
    filterValue: any;
}

interface RoomType {
    Id: string;
    Name: string;
    Description: string;
    MaxAdult: number;
    MaxChild: number;
    Rooms: {
        count: number
    },
    BedTypes: {
        Id: string,
        TypeName: string,
        CreatedAt: Date
    },
    Images: string[]
}

interface Room {
    Id: string;
    RoomNumber: number;
    TypeName: string;
    StatusName: string;
    CreatedAt: Date;
    RoomTypeId: number;
    StatusId: number;
}
// interface RoomRate {
//     Id: number;
//     RateTypeId: number;
//     ValidFrom: Date | null;
//     ValidTo: Date | null;
//     BaseRoomRate: number;
//     ExtraChildRate: number;
//     ExtraAdultRate: number;
//     RoomTypeId: number;
//     CreatedAt: Date;
//     StatusId: number;
//     RoomType: string;
//     StatusName: string;
//     RateType: string;
// }

interface RoomRate {
    "RateTypeId": number,
    "RoomTypeId": number,
    "RoomType": string,
    "MaxAdult": number,
    "MaxChild": number,
    "Description": string,
    "BedTypeId": number,
    "RoomRateID": number,
    "BaseRoomRate": number,
    "ExtraAdultRate": number,
    "ExtraChildRate": number,
    "WeekendExtraAdultRate": number,
    "WeekendExtraChildRate": number,
    "WeekendRoomRate": number,
    "CreatedAt": Date
}

interface RoomAmenityResponse {
    RoomTypeId: number,
    Amenities: RoomAmenity[]
}

interface RoomAmenity {
    Id: number,
    Label: string,
    Description: string,
}

interface Reservation{
    Id: number;
    RoomCount: number;
    RoomTypeId: number;
    CheckInDate: Date;
    CheckOutDate: Date;
    CreatedAt: Date;
    GuestId: number | null;
    StatusId: number;
    ExtraChild: number;
    ExtraAdult: number;
    ReservationTypeId: number;
    isDeleted: boolean;
    isBilled: boolean;
    ReservationStatus: string;
    RoomType: string;
    ReservationType: string;
    GuestData: {
        FirstName: string;
        LastName: string;
    } | null;
    Remarks: string;
}