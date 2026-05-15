import { Link } from "react-router-dom";

export const RegisterView = () => {
  return (
    <>
      <div>Register View</div>

      <nav>
        <Link to="/auth/login">¿Ya tienes cuenta? Inicia sesión aquí</Link>
      </nav>
    </>
  );
};
