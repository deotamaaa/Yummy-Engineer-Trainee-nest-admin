import { Role } from "src/role/role.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}
