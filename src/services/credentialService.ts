import supabase from "../supabaseClient";
import {Credential} from "../types/credentialType";

class CredentialService {
    addCredential = async (credential: Credential) => {
        await supabase.auth.signUp({
            email: credential.email,
            password: credential.password,
        });
        const session = await supabase.auth.getSession();
        if (!session.data.session?.user.id) {
            alert("Неправильный логин или пароль!")
        }
    }

    login = async (credential: Credential) => {
        await supabase.auth.signInWithPassword({
            email: credential.email,
            password: credential.password,
        })
    }

    logout = async () => {
        await supabase.auth.signOut();
        const session = await supabase.auth.getSession();
        console.log(session);
    }
}

export default new CredentialService;