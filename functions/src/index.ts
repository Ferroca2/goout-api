import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setSession = functions.https.onRequest(
    (...args) => import('./session')
        .then(async m => { await m.default(...args); })
);