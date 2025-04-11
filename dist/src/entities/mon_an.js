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
let Mon_an = class Mon_an {
    mon_an_id;
    ngay;
    buoi;
    ten_mon_an;
    ngay_het_han;
    created_userId;
    schoolId;
    imageName;
    imageId;
    imageFile;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Mon_an.prototype, "mon_an_id", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", Date)
], Mon_an.prototype, "ngay", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "buoi", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "ten_mon_an", void 0);
__decorate([
    Column({ type: 'date' }),
    __metadata("design:type", String)
], Mon_an.prototype, "ngay_het_han", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Mon_an.prototype, "created_userId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "schoolId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "imageName", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "imageId", void 0);
__decorate([
    Column({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Mon_an.prototype, "imageFile", void 0);
Mon_an = __decorate([
    Entity('mon_an')
], Mon_an);
export { Mon_an };
//# sourceMappingURL=mon_an.js.map