"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const referral_controller_1 = require("../controllers/referral.controller");
const router = express_1.default.Router();
router.post("/create", referral_controller_1.createReferral);
exports.default = router;
