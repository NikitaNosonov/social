import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import supabase from "../../../supabaseClient";

const Register: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const register = (email: string, password: string) =>
        supabase.auth.signInWithPassword({email, password});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !passwordRef.current?.value ||
            !emailRef.current?.value ||
            !confirmPasswordRef.current?.value
        ) {
            setErrorMsg("Please fill all the fields");
            return;
        }

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrorMsg("Passwords don't match");
            return;
        }

        try {
            setErrorMsg("");
            setLoading(true);

            const { data, error } = await register(
                emailRef.current.value,
                passwordRef.current.value
            );

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            if (data) {
                setMsg("Registration Successful. Check your email to confirm your account");
            }
        } catch (error) {
            setErrorMsg("Error in Creating Account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={confirmPasswordRef}
                                required
                            />
                        </Form.Group>

                        {errorMsg && (
                            <Alert
                                variant="danger"
                                onClose={() => setErrorMsg("")}
                                dismissible
                            >
                                {errorMsg}
                            </Alert>
                        )}

                        {msg && (
                            <Alert
                                variant="success"
                                onClose={() => setMsg("")}
                                dismissible
                            >
                                {msg}
                            </Alert>
                        )}

                        <div className="text-center mt-2">
                            <Button
                                disabled={loading}
                                type="submit"
                                className="w-50"
                                onClick={() => register}
                            >
                                {loading ? "Processing..." : "Register"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Already a User? <Link to={"/login"}>Login</Link>
            </div>
        </>
    );
};

export default Register;