import db from "@/plugins/firebase/index";
import { firestore } from "firebase/app";
import firebase from "@/plugins/firebase/firebase";
import { FirebaseUser } from "../models/firebase-user";
import { Collections } from "@/plugins/firebase/firebase-collections";
import { UserCredentials } from "@/models/user-credentials";
import { UserSetupContent } from "@/models/user-setup-content";
import { isEmpty } from "@/utilities/object-utility";

enum FirebaseCollectionSchema {
  USERS = "users",
  USERS_SETUP_CONTENT = "users_setup_content"
}

export class FirebaseService {
  name: string = "FirebaseService";
  static db: firestore.Firestore = db;

  private static async getDB(
    col: Collections
  ): Promise<firestore.CollectionReference> {
    try {
      if (
        !Object.keys(FirebaseCollectionSchema).some(
          schema => schema.toLocaleLowerCase() == col
        )
      ) {
        return Promise.reject(`Collection "${col}" was not found.`);
      }
      return await FirebaseService.db.collection(col);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getOrSetFBDoc(
    documentRef: firestore.DocumentReference,
    defaultObject: object = {}
  ): Promise<firestore.DocumentReference> {
    try {
      if (!(await documentRef.get()).exists) {
        await documentRef.set(defaultObject);
      }
      return documentRef;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getOrSetFBCol(
    collectionRef: firestore.CollectionReference,
    defaultObject: object = {}
  ): Promise<firestore.CollectionReference> {
    try {
      if ((await collectionRef.get()).empty) {
        await collectionRef.add(defaultObject);
      }
      return collectionRef;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // static async createJWTAccessTokenReference(user: FirebaseUser): Promise<string> {
  //     try {
  //         if (!user) {
  //             return Promise.reject("Could not register user");
  //         }
  //         let jwtToken = (await user.getIdTokenResult()).token;
  //         localStorage.setItem("jwtToken", jwtToken);
  //         return jwtToken;
  //     } catch (err) {
  //         return Promise.reject(err);
  //     }
  // }

  static async verifyUser(): Promise<UserCredentials> {
    try {
      let user: FirebaseUser = firebase.auth().currentUser;
      let usersColRef = await this.getDB(FirebaseCollectionSchema.USERS);
      let { email } = <firebase.User>user;
      let docRef = await (await usersColRef.doc(<string>email)).get();
      if (!docRef.exists) {
        return Promise.reject("User does not exist!");
      }
      let userCredentials = new UserCredentials(docRef.data());
      return userCredentials;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signUp(
    email: string,
    password: string,
    username: string
  ): Promise<FirebaseUser> {
    try {
      let colRef = await this.getDB(FirebaseCollectionSchema.USERS);
      let docRef = colRef.doc(email);
      if ((await docRef.get()).exists) {
        return Promise.reject("This email is already in use.");
      }
      let userCredential: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await docRef.set({ email, password, username });
      return userCredential.user;
    } catch (err) {
      console.log(`Errored in ${this.name}/signUp`, err);
      return Promise.reject(err);
    }
  }

  static async signIn(email: string, password: string): Promise<FirebaseUser> {
    try {
      let signed: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (!signed) {
        return Promise.reject(
          new Error("User used wrong credentials. Please try again.")
        );
      }

      return signed.user;
    } catch (err) {
      console.log(`Errored in ${this.name}/signIn:`, err);
      return Promise.reject(err);
    }
  }

  static async getUserDetails(
    userEmail: string
  ): Promise<UserSetupContent | null> {
    try {
      const col = await this.getDB(
        FirebaseCollectionSchema.USERS_SETUP_CONTENT
      );
      const data = (
        await (await col.where("email", "==", userEmail).limit(1)).get()
      ).docs.map(d => d.data());
      return isEmpty(data) ? null : new UserSetupContent(data[0]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signOut(): Promise<void> {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async saveUserDetails(
    userSetupContent: UserSetupContent,
    userEmail: string
  ): Promise<UserSetupContent> {
    try {
      const col = await this.getDB(
        FirebaseCollectionSchema.USERS_SETUP_CONTENT
      );
      await col.doc().set({
        email: userEmail,
        ...JSON.parse(JSON.stringify(userSetupContent)),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      return userSetupContent;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserProgressByGoal(
    userEmail: string,
    goal: string
  ): Promise<UserSetupContent[]> {
    try {
      let userProgressList: UserSetupContent[];
      const col = await this.getDB(
        FirebaseCollectionSchema.USERS_SETUP_CONTENT
      );
      const refs = await col
        .where("email", "==", userEmail)
        .where("userGoal", "==", goal)
        .get();
      const data = refs.docs.map(doc => doc.data());
      userProgressList = UserSetupContent.parseListFromDB(data);
      return userProgressList;
    } catch (err) {
      console.log(err)
      return Promise.reject(err);
    }
  }

  static async addOrganization() {}

  // static async addAdmin

  // super admin - add organization
  // organization - add user
  // organization - add meal items
}
