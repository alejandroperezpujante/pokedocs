import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

import {searchPokemonWithPokeApi} from "./utils";

const app = admin.initializeApp();

export const getPokemonWithNameAndAuth = functions.https.onRequest(
    async (request, response) => {
      cors(request, response, async () => {
        let idToken: undefined | string = undefined;
        let pokemonName: undefined | string = undefined;

      !request.body.pokemonName ?
        response.status(400).send("Missing Pokemon name") :
        (pokemonName = request.body.pokemonName);

      !request.headers.authorization ?
        response.status(400).send("Missing auth token") :
        (idToken = request.get("Authorization")?.split("Bearer ")[1]);

      if (idToken && pokemonName) {
        try {
          await admin.auth(app).verifyIdToken(idToken);
          const pokemonData = await searchPokemonWithPokeApi(pokemonName);
          response.status(200).send(pokemonData);
        } catch (error) {
          if (!(error instanceof Error)) {
            response.status(500).send("Something went wrong");
          } else {
            if (error.message === "Pokemon not found") {
              response.status(404).send(error.message);
            }
          }
        }
      }
      });
    }
);

export const changeUserEmail = functions.https.onRequest(
    async (request, response) => {
      cors(request, response, async () => {
        let idToken: undefined | string = undefined;
        let newEmail: undefined | string = undefined;

      !request.body.newEmail ?
        response.status(400).send("Missing new email") :
        (newEmail = request.body.newEmail);

      !request.headers.authorization ?
        response.status(400).send("Missing auth token") :
        (idToken = request.get("Authorization")?.split("Bearer ")[1]);

      if (idToken && newEmail) {
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userUid = decodedToken.uid;
          await admin.auth(app).updateUser(userUid, {email: newEmail});
          response.status(200).send("Email changed");
        } catch (error) {
          if (!(error instanceof Error)) {
            response.status(500).send("Something went wrong");
          } else {
            if (error.message === "User not found") {
              response.status(404).send(error.message);
            }
          }
        }
      }
      });
    }
);

export const changeUserName = functions.https.onRequest(
    async (request, response) => {
      cors(request, response, async () => {
        const usernameRegExp = /^[a-zA-Z0-9_]{3,20}$/;
        let idToken: undefined | string = undefined;
        let newUsername: undefined | string = undefined;

      !request.body.newUsername ?
        response.status(400).send("Missing new name") :
        (newUsername = request.body.newUsername);

      !request.headers.authorization ?
        response.status(400).send("Missing auth token") :
        (idToken = request.get("Authorization")?.split("Bearer ")[1]);

      if (!usernameRegExp.test(newUsername as string)) {
        response.status(400).send("Invalid username");
      }

      if (idToken && newUsername) {
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userUid = decodedToken.uid;
          const data = await admin
              .auth()
              .updateUser(userUid, {displayName: newUsername});
          response.status(200).send(data);
        } catch (error) {
          response.status(500).send("Something went wrong");
        }
      }
      });
    }
);

export const changeUserPassword = functions.https.onRequest(
    async (request, response) => {
      cors(request, response, async () => {
        let idToken: undefined | string = undefined;
        let newPassword: undefined | string = undefined;

      !request.body.newPassword ?
        response.status(400).send("Missing new password") :
        (newPassword = request.body.newPassword);

      !request.headers.authorization ?
        response.status(400).send("Missing auth token") :
        (idToken = request.get("Authorization")?.split("Bearer ")[1]);

      if (idToken && newPassword) {
        try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          const userUid = decodedToken.uid;
          const data = await admin
              .auth()
              .updateUser(userUid, {password: newPassword});
          response.status(200).send(data);
        } catch (error) {
          response.status(500).send("Something went wrong");
        }
      }
      });
    }
);
