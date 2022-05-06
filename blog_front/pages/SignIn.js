import { Formik } from "formik";
import { useCallback, useState } from "react";
import Button from "../components/Button";
import FormField from "../components/formField";
import { makeClient } from "../service/api";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [error, setError] = useState([]);
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .max(255)
      .required("Le champ est requis"),
    password: Yup.string().required("Le champ est requis"),
  });
  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      console.log(email);
      console.log(password);
      try {
        const {
          data: { jwt },
        } = await makeClient().post("/users", { email, password });
      } catch (error) {
        const { response: { data, status } = {} } = err;
        if (data.error) {
          setError(data.error);

          return;
        }
      }
    },

    []
  );
  return (
    <div className="pt-20 max-w-sm place-content-center m-auto relative w-5/6 ">
      <div className="text-3xl text-center pb-10">Sign in</div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={signUpSchema}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            {error ? (
              <p className="bg-red-600 text-white mb-5 front-bold px-4 py-2">
                {error}
              </p>
            ) : null}
            <FormField name="email" type="text" placeholder="Email">
              Email
            </FormField>
            <FormField name="password" type="text" placeholder="Password">
              Password
            </FormField>
            <div className="mt-5">
              <Button
                size="md"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                sign in
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default SignIn;
