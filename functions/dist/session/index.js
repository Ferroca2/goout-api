"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const db = admin.firestore();
async function setSession(req, res) {
    if (req.method.toUpperCase() !== "POST") {
        return res.status(405).json({
            message: "Método não permitido",
        });
    }
    if (req.query.batch) {
        return res.status(422).json({
            message: "Requisições em lote não suportadas",
        });
    }
    const { userId, choice } = req.body;
    try {
        const session = {
            userId,
            date: new Date().toISOString(),
            completed: false,
            choice,
        };
        const trainingRef = db.collection("trainings").doc(userId);
        await trainingRef.set(session, { merge: true });
        return res.status(200).json({ message: "Dieta gerada com sucesso", session });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Erro ao gerar dieta",
        });
    }
}
exports.default = setSession;
