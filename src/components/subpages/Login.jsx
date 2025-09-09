import { useForm } from "react-hook-form";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { LoggedContext } from "../Context/LoggedInProvider";
import * as z from "zod/v4";
import {
  StyledDiv,
  StyledForm,
  StyledH1,
  StyledInput,
  StyledLabel,
} from "../styled elements/StyledComponents";
import Button from "../Shared/Button";
import capitalize from "../Utils/Capitalize";
import { useNavigate } from "react-router-dom";
import RegisterInput from "../Shared/RegisterInput";

const url = "http://localhost:3000/Users";

const Login = () => {
  const { sendRequest: fetchUsers } = useLocaleFetch();
  const { sendRequest: updateUser } = useLocaleFetch("PATCH");
  const { enqueueSnackbar } = useSnackbar();
  const { setLoggedIn } = LoggedContext();
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().email("Wpisz poprawny email."),
    password: z.string("Wpisz hasło"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (local) => {
    const users = await fetchUsers(url);
    if (!users) {
      enqueueSnackbar("Coś poszło nie tak z serwerem!", { variant: "error" });
      return;
    }

    const user = users.find(
      (u) => u.email === local.email && u.password === local.password
    );
    if (!user) {
      enqueueSnackbar("Niepoprawny email lub hasło.", { variant: "error" });
      return;
    }

    await updateUser(`${url}/${user.id}`, {
      isLoggedIn: true,
    });
    setLoggedIn(user);
    localStorage.setItem("loggedUser", JSON.stringify(user));
    navigate("/");
    reset();

    enqueueSnackbar(`Logowanie powiodło się! Witaj ${capitalize(user.name)}!`, {
      variant: "success",
    });
  };

  return (
    <StyledDiv $register>
      <StyledH1>Login</StyledH1>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel $login>
          <RegisterInput
            $input
            $register
            type="text"
            {...register("email")}
            placeholder="Email"
            errors={errors.email?.message}
          />
          <RegisterInput
            $input
            $register
            type="password"
            {...register("password")}
            placeholder="Password"
            errors={errors.password?.message}
          />
        </StyledLabel>
        <StyledLabel>
          <Button type="submit" variant="contained">
            Zaloguj
          </Button>
        </StyledLabel>
      </StyledForm>
    </StyledDiv>
  );
};
export default Login;
