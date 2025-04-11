var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let T_dmmonhoc = class T_dmmonhoc {
    MonId = 0;
    TenMon = "";
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], T_dmmonhoc.prototype, "MonId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], T_dmmonhoc.prototype, "TenMon", void 0);
T_dmmonhoc = __decorate([
    Entity("T_DM_MonHoc")
], T_dmmonhoc);
export { T_dmmonhoc };
//# sourceMappingURL=monhoc.js.map