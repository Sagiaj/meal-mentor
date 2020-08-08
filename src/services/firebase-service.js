import db from '../config/firebase/index';
import firebase from '../config/firebase/firebase';
import { UserCredentials } from '@/models/user-credentials';
import { UserSetupContent } from '@/models/user-setup-content';
import { isEmpty } from '@/utilities/object-utility';
var FirebaseCollectionSchema;
(function (FirebaseCollectionSchema) {
    FirebaseCollectionSchema["USERS"] = "users";
    FirebaseCollectionSchema["USERS_SETUP_CONTENT"] = "users_setup_content";
})(FirebaseCollectionSchema || (FirebaseCollectionSchema = {}));
;
export class FirebaseService {
    constructor() {
        this.name = "FirebaseService";
    }
    static async getDB(col) {
        try {
            if (!Object.keys(FirebaseCollectionSchema).some(schema => schema.toLocaleLowerCase() == col)) {
                return Promise.reject(`Collection "${col}" was not found.`);
            }
            return await FirebaseService.db.collection(col);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async getOrSetFBDoc(documentRef, defaultObject = {}) {
        try {
            if (!(await documentRef.get()).exists) {
                await documentRef.set(defaultObject);
            }
            return documentRef;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async getOrSetFBCol(collectionRef, defaultObject = {}) {
        try {
            if ((await collectionRef.get()).empty) {
                await collectionRef.add(defaultObject);
            }
            return collectionRef;
        }
        catch (err) {
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
    static async verifyUser() {
        try {
            let user = firebase.auth().currentUser;
            let usersColRef = await this.getDB(FirebaseCollectionSchema.USERS);
            let { email } = user;
            let docRef = await (await usersColRef.doc(email)).get();
            if (!docRef.exists) {
                return Promise.reject("User does not exist!");
            }
            let userCredentials = new UserCredentials(docRef.data());
            return userCredentials;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async signUp(email, password, username) {
        try {
            let colRef = await this.getDB(FirebaseCollectionSchema.USERS);
            let docRef = colRef.doc(email);
            if ((await docRef.get()).exists) {
                return Promise.reject("This email is already in use.");
            }
            let userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await docRef.set({ email, password, username });
            return userCredential.user;
        }
        catch (err) {
            console.log(`Errored in ${this.name}/signUp`, err);
            return Promise.reject(err);
        }
    }
    static async signIn(email, password) {
        try {
            let signed = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (!signed) {
                return Promise.reject(new Error("User used wrong credentials. Please try again."));
            }
            return signed.user;
        }
        catch (err) {
            console.log(`Errored in ${this.name}/signIn:`, err);
            return Promise.reject(err);
        }
    }
    static async getUserDetails(userEmail) {
        try {
            const col = await this.getDB(FirebaseCollectionSchema.USERS_SETUP_CONTENT);
            const userContent = await this.getOrSetFBDoc(col.doc(userEmail));
            const data = (await userContent.get()).data();
            return isEmpty(data) ? null : new UserSetupContent(data);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async signOut() {
        try {
            await firebase.auth().signOut();
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    static async saveUserDetails(userSetupContent, userEmail) {
        try {
            const col = await this.getDB(FirebaseCollectionSchema.USERS_SETUP_CONTENT);
            await col.doc(userEmail).set(JSON.parse(JSON.stringify(userSetupContent)));
            return userSetupContent;
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
FirebaseService.db = db;
//# sourceMappingURL=firebase-service.js.map