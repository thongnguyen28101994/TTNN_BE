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
let Hoc_sinh = class Hoc_sinh {
    rowId;
    schoolId;
    nam_hoc_id;
    ma_dinh_danh;
    ho_ten;
    ngay_sinh;
    lop;
    sdt_ph;
    email_ph;
    userName;
    password;
    isActive;
    created_date;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Hoc_sinh.prototype, "rowId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "schoolId", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "nam_hoc_id", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", Number)
], Hoc_sinh.prototype, "ma_dinh_danh", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "ho_ten", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "ngay_sinh", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "lop", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "sdt_ph", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "email_ph", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "userName", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "password", void 0);
__decorate([
    Column({ type: 'bit' }),
    __metadata("design:type", Boolean)
], Hoc_sinh.prototype, "isActive", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Hoc_sinh.prototype, "created_date", void 0);
Hoc_sinh = __decorate([
    Entity('hoc_sinh')
], Hoc_sinh);
export { Hoc_sinh };
//# sourceMappingURL=hoc_sinh.js.map