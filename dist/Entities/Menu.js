"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Menu = class Menu {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Restaurant, (restaurant) => restaurant.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Restaurant)
], Menu.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Category, (category) => category.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", _1.Category)
], Menu.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.Topping),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Menu.prototype, "toppings", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "dressing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Menu.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", String)
], Menu.prototype, "created_at", void 0);
Menu = __decorate([
    (0, typeorm_1.Entity)()
], Menu);
exports.Menu = Menu;
