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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReferralEmail = sendReferralEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const mailgen_1 = __importDefault(require("mailgen"));
dotenv_1.default.config();
function sendReferralEmail(name, email, referredBy) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // create reusable transporter object using the default SMTP transport
            let config = {
                service: "gmail",
                port: 465,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            };
            const transport = nodemailer_1.default.createTransport(config);
            let MailGenerator = new mailgen_1.default({
                theme: "default",
                product: {
                    name: "Accredian",
                    link: "https://mailgen.js/",
                },
            });
            let response = {
                body: {
                    name: name,
                    intro: "Welcome to Accredian! We're very excited to have you on board.",
                    table: {
                        data: [
                            {
                                course: "Full Stack Web Development",
                                description: "Join with us make future best software developer",
                            },
                            {
                                course: "AI/ML Development",
                                description: "Join with us make future best software developer",
                            },
                            {
                                course: "Data Science",
                                description: "Join with us make future best Data Science",
                            },
                        ],
                    },
                    action: {
                        instructions: "To get started with Accredian, please click here:",
                        button: {
                            color: "#22BC66", // Optional action button color
                            text: "Click me",
                            link: "#",
                        },
                    },
                    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
                },
            };
            let mail = MailGenerator.generate(response);
            let message = {
                from: "Accredian <admin@accredian.com>",
                to: email,
                subject: "Referral Received by " + referredBy,
                html: mail
            };
            const result = yield transport.sendMail(message);
            return result;
        }
        catch (error) {
            console.error("Error sending email:", error); // Log the full error details
            throw new Error("Error sending email");
        }
    });
}
