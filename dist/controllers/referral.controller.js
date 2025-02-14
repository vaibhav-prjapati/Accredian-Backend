"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferral = void 0;
const error_1 = require("../utils/error");
const client_1 = require("@prisma/client");
const emailService_1 = require("../emailService");
const prisma = new client_1.PrismaClient();
const createReferral = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, referredBy } = req.body;
    if (!name || !email || !referredBy) {
        return next((0, error_1.errorHandler)(400, "Missing fields"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next((0, error_1.errorHandler)(400, "Invalid email"));
    }
    try {
        const referral = yield prisma.referral.create({
            data: { name, email, referredBy }
        });
        yield (0, emailService_1.sendReferralEmail)(name, email, referredBy);
        res.status(201).json(referral);
    }
    catch (error) {
        return next((0, error_1.errorHandler)(409, "Email already exists"));
    }
});
exports.createReferral = createReferral;
