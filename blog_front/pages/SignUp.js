import { Formik } from "formik";
import { useCallback, useState, useContext } from "react";
import AddEntryContext from "../components/context/Context";
import * as Yup from "yup";
import FormField from "../components/formField";
import Button from "../components/Button";

const initialValues = {
  displayname: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [error, setError] = useState([]);
  const { signUp } = useContext(AddEntryContext);

  const signUpSchema = Yup.object().shape({
    displayname: Yup.string()
      .matches("[a-zA-Z]", "No special characters allowed")
      .max(255)
      .required("Le champ est requis"),
    email: Yup.string()
      .email("Invalid email")
      .max(255)
      .required("Le champ est requis"),
    password: Yup.string().required("Le champ est requis"),
  });

  const handleFormSubmit = useCallback(
    async ({ displayname, email, password }) => {
      console.log(email);
      console.log(password);
      signUp(displayname, email, password);
    },

    [signUp]
  );
  return (
    <div className="pt-20 max-w-sm place-content-center m-auto relative w-5/6 ">
      {error ? (
        <p className="bg-red-600 text-white mb-5 front-bold px-4 py-2">
          {error}
        </p>
      ) : null}

      <div className="text-3xl text-center pb-10">Sign up</div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={signUpSchema}
      >
        {({ handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="displayname" type="text" placeholder="UserName">
              UserName
            </FormField>
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
                sign up
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default SignUp;
