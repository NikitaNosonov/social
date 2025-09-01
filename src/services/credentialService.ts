import supabase from "../supabaseClient";
import {Credential} from "../types/credentialType";

class CredentialService {
    addCredential = async (credential: Credential) => {
        try {
            await supabase.auth.signUp({
                email: credential.email,
                password: credential.password,
            });
        } catch (error) {
            console.error("Error creating user.", error);
            return null;
        }
    }

    login = async (credential: Credential) => {
       try {
            await supabase.auth.signInWithPassword({
                email: credential.email,
                password: credential.password,
            })
        } catch (error) {
           console.error("Error login user.", error);
           return null;
       }
    }

    logout = async () => {
        try {
            await supabase.auth.signOut();
            const session = await supabase.auth.getSession();
            console.log(session);
        } catch (error) {
            console.error("Error logout user.", error);
            return null;
        }
    }
}

export default new CredentialService;