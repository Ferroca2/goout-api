import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

interface Session {
    userId: string;
    date: string;
    completed: boolean;
    choice?: string;
}

export default async function setSession(req: Request, res: Response) {
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

  const { userId, choice }= req.body;

  try {

    const session: Session = {
      userId,
      date: new Date().toISOString(),
      completed: false,
      choice,
    };  

    const trainingRef = db.collection("trainings").doc(userId);

    await trainingRef.set(session, {merge: true});

    return res.status(200).json({message: "Dieta gerada com sucesso", session});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Erro ao gerar dieta",
    });
  }
}
