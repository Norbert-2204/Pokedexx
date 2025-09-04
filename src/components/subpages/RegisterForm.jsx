import { useForm } from "react-hook-form";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as z from "zod/v4";
import {
  StyledDiv,
  StyledForm,
  StyledH1,
  StyledLabel,
} from "../styled elements/StyledComponents";
import RegisterInput from "../Shared/RegisterInput";
import Button from "../Shared/Button";

const url = "http://localhost:3001/Users";

const RegisterForm = () => {
  const { sendRequest } = useLocaleFetch("POST");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z
        .string()
        .min(3, "Imię musi zawierać conajmniej 3 litery.")
        .max(12, "Imię może zawierać maksymalnie 12 liter.")
        .regex(
          /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/,
          "Imię może zawierać tylko litery."
        ),
      email: z.string().email("Błędny email."),
      password: z
        .string()
        .regex(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
          "Hasło musi zawierać minimum 8 znaków, dużą litere, cyfre i znak specjalny."
        ),
      confirmPassword: z.string("Wpisz hasło"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Hasło musi być takie samo.",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(url);
      const Users = await res.json();

      const emailExist = Users.some((user) => user.email === data.email);
      if (emailExist) {
        enqueueSnackbar("Email już istnieje.", { variant: "warning" });
        resetField("email");
        return;
      }

      sendRequest(url, {
        name: data.name,
        email: data.email,
        password: data.password,
        isLoggedIn: false,
        editedPokemon: [],
      });
      enqueueSnackbar("Zarejestrowano pomyślnie!", { variant: "success" });
      reset();
      navigate("/Login");
    } catch (error) {
      enqueueSnackbar(`Coś poszło nie tak z serwerem: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <StyledDiv $register>
      <StyledH1>Zarejestruj się</StyledH1>
      <StyledForm $smallScreen onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel $register $smallScreen>
          <RegisterInput
            $input
            $register
            type="text"
            {...register("name")}
            placeholder="Imię"
            errors={errors.name?.message}
          />
          <RegisterInput
            $input
            $register
            type={"text"}
            {...register("email")}
            placeholder="Email"
            errors={errors.email?.message}
          />
          <RegisterInput
            $input
            $register
            type={"password"}
            {...register("password")}
            placeholder="Hasło"
            errors={errors.password?.message}
          />
          <RegisterInput
            $input
            $register
            type={"password"}
            {...register("confirmPassword")}
            placeholder="Powtórz hasło"
            errors={errors.confirmPassword?.message}
          />
        </StyledLabel>
        <Button type="submit" variant="contained" sx={{ width: 150 }}>
          Confirm
        </Button>
      </StyledForm>
    </StyledDiv>
  );
};
export default RegisterForm;
