import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";

const db = admin.firestore();

interface Session {
    userId: string;
    date: string;
    completed: boolean;
    choice?: string;
}

const data = {
    choice?: string;
};

const IA = 'https://chat.maritaca.ai/';

const config = {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

fetch(IA, config)
  .then(resposta => resposta.json())
  .then(IAanswer => {
    console.log('Resposta:', IAanswer);
  })
  .catch(erro => {
    console.error('Erro na requisição:', erro);
  });
