var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let User = class User {
    userId; // Đánh dấu là definitely assigned
    fullName;
    roleId;
    userName;
    password;
    donviId;
    created_date;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User.prototype, "donviId", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], User.prototype, "created_date", void 0);
User = __decorate([
    Entity('user')
], User);
export { User };
//# sourceMappingURL=user.js.map