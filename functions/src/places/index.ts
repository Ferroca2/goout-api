import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";

const admin = require('firebase-admin');
const axios = require('axios');

const serviceAccount = require('caminho/para/seu/arquivo-de-chave.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sua-app.firebaseio.com'
});

const db = admin.firestore();

async function getChoicesByUser(userId) {
  const sessionsRef = db.collection('sessions');
  const query = sessionsRef.where('userId', '==', userId).where('choice', '!=', null);

  const snapshot = await query.get();
  const choices = [];

  snapshot.forEach((doc) => {
    choices.push(doc.data().choice);
  });

  return choices;
}

async function sendChoicesToChatIA(userId, choices) {
  const chatIAUrl = 'https://sua-ia-de-chat.com/api';
  
  try {
    const response = await axios.post(chatIAUrl, {
      userId,
      choices
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar choices para a IA de chat:', error);
    throw error;
  }
}

async function getInfoFromDatabase(choices) {
  const mockDatabaseResponse = {
    info: 
  };

  return mockDatabaseResponse;
}

// Função principal
async function processUser(userId) {
  try {
    const choices = await getChoicesByUser(userId);

    const chatIAResponse = await sendChoicesToChatIA(userId, choices);

    const databaseInfo = await getInfoFromDatabase(choices);

    console.log('Resposta da IA de chat:', chatIAResponse);
    console.log('Informações do banco de dados:', databaseInfo);

    return { chatIAResponse, databaseInfo };
  } catch (error) {
    console.error('Erro no processamento do usuário:', error);
    throw error;
  }
}


const userId = 'idDoUsuario';
processUser(userId);
