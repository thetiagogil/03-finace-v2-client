import { FormEvent, useContext, useState } from "react";
import { PageContainer } from "../components/layout/containers";
import { FormAuth } from "../components/layout/form-auth";
import { AuthContext } from "../contexts/auth.context.js";

export const SignupPage = () => {
  const { handleSignup } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { firstname, lastname, email, password };
    try {
      await handleSignup(payload);
    } catch (error) {
      throw error;
    }
  };

  const form = {
    firstname,
    lastname,
    email,
    password,
    passwordConfirmation,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
    setPasswordConfirmation
  };

  return (
    <PageContainer>
      <FormAuth signup form={form} handleSubmit={handleSubmit} />
    </PageContainer>
  );
};
