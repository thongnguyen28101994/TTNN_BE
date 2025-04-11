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
let User_test = class User_test {
    userId_test; // Đánh dấu là definitely assigned
    fullName_test;
    roleId_test;
    userName_test;
    password_test;
    active_password;
    donviId_test;
    created_date_test;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User_test.prototype, "userId_test", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User_test.prototype, "fullName_test", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], User_test.prototype, "roleId_test", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User_test.prototype, "userName_test", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User_test.prototype, "password_test", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User_test.prototype, "active_password", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], User_test.prototype, "donviId_test", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], User_test.prototype, "created_date_test", void 0);
User_test = __decorate([
    Entity('usertest')
], User_test);
export { User_test };
//# sourceMappingURL=user_test.js.map