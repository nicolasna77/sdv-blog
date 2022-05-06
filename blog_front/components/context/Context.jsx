import * as yup from "yup";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import { router } from "next/router";

const AddEntryContext = createContext({});

export const AddEntryProvider = (props) => {
  const router = useRouter();
  const [state, setState] = useState(savedInitialValue.savedEntries);
  const [session, setSession] = useState(null);
  const handleFormSubmit = useCallback((entries) => {
    setState((currentState) => currentState.concat(entries));
  }, []);

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      return;
    }

    const [, payload] = jwt.split(".");
    const session = atob(payload);
    setSession(JSON.parse(session));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    initSession(jwt);
  }, [initSession]);
  const signIn = useCallback(
    async (email, password) => {
      try {
        const {
          data: { auth, status },
        } = await makeClient().post("/sign-in", { email, password });

        if (status === "OK") {
          localStorage.setItem("jwt", auth);
          initSession(auth);
          await router.push("/");
        }
      } catch (err) {
        return { error: err };
      }
    },
    [router]
  );

  const signUp = useCallback(
    async (displayName, email, password) => {
      const {
        data: { status },
      } = await makeClient().post("/users", { displayName, email, password });

      if (status === "OK") {
        await router.push("/users");
      }
    },
    [router]
  );

  const createComment = useCallback(async (content, postId, userId) => {
    await makeClient().post("/comments", {
      content,
      postId,
      userId,
    });
  }, []);

  return (
    <AddEntryContext.Provider
      {...props}
      value={{
        createComment,
        signUp,
        signIn,
        state,
        handleFormSubmit,
        validationSchema,
        savedInitialValue,
      }}
    ></AddEntryContext.Provider>
  );
};

export default AddEntryContext;
