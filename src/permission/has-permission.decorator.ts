import { SetMetadata } from "@nestjs/common";
import { access } from "fs";

export const HasPermission = (access: string) => SetMetadata('access', access);
