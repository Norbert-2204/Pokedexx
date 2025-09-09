import { useEffect, useState } from "react";
import Button from "../Shared/Button";
import RegisterInput from "../Shared/RegisterInput";
import { useFetch } from "../custom hooks/useFetch";
import { useLocaleFetch } from "../custom hooks/useLocaleFetch";
import { LoggedContext } from "../Context/LoggedInProvider";
import { PokemonContext } from "../Context/ShowPokemonProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as z from "zod/v4";
import { useForm } from "react-hook-form";
import capitalize from "../Utils/Capitalize";
import {
  StyledDiv,
  StyledForm,
  StyledImg,
  StyledP,
  StyledInput,
} from "../styled elements/StyledComponents";
import { useMediaQuery } from "@mui/material";

const urlLocale = "http://localhost:3000/Users";

const EditPage = () => {
  const { loggedIn, refreshUser } = LoggedContext();
  const { sendRequest } = useLocaleFetch("PATCH");
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const urlCreate = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=150`;
  const { pokemon } = useFetch(urlCreate);
  const { search, setSearch, paginationEdit, setEditPage, totalEditPages } =
    PokemonContext();
  const smallScreen = useMediaQuery("(max-width:767.98px)");

  const filteredPokemon = pokemon.map((pok) => {
    const edited = (loggedIn?.editedPokemon || []).find(
      (edited) => Number(edited.id) === pok.id
    );
    return edited ? { ...pok, ...edited } : pok;
  });

  useEffect(() => {
    refreshUser();
  }, []);

  const isAlreadyEdited = (id) =>
    (loggedIn?.editedPokemon || []).some(
      (edited) => Number(edited.id) === Number(id)
    );

  const schema = z.object({
    name: z
      .string()
      .min(3, "Nazwa musi zawierać minimum 3 litery.")
      .max(10, "Nazwa musi zawierać maksymalnie 12 liter.")
      .regex(
        /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/,
        "Imię może zawierać tylko litery."
      ),
    weigth: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
    heigth: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
    baseExperience: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
  });

  const editSchema = z.object({
    weigth: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
    heigth: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
    baseExperience: z
      .string()
      .min(1, "Pole nie może być puste lub wynosić 0.")
      .max(4, "Wartość nie może przekroczyć 9999.")
      .regex(/^[1-9]\d*$/, "Pole musi być liczbą i nie może zaczynać się od 0.")
      .refine(
        (val) => Number(val) > 0,
        "Pole nie może być puste lub wynosić 0."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      weigth: "",
      heigth: "",
      abilities: [],
      baseExperience: "",
    },
  });

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
  } = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      weigth: "",
      heigth: "",
      baseExperience: "",
    },
  });

  useEffect(() => {
    setValue("img", filteredPokemon[selectedIndex]?.img);
  }, [selectedIndex, filteredPokemon]);

  const prevPage = () => {
    setEditPage((prev) => Math.max(prev - 1, 0));
  };
  const nextPage = () => {
    setEditPage((prev) => Math.min(prev + 1, totalEditPages - 1));
  };

  const onSubmit = (data) => {
    const selectedPokemon = filteredPokemon[selectedIndex];
    if (
      (loggedIn?.editedPokemon || []).some(
        (pok) => pok.img === selectedPokemon.img
      )
    ) {
      enqueueSnackbar("Pokemon został już dodany", { variant: "warning" });
      return;
    }

    const finalData = {
      id: filteredPokemon[selectedIndex].id,
      name: data.name,
      img: filteredPokemon[selectedIndex].img,
      weight: Number(data.weigth),
      height: Number(data.heigth),
      baseExperience: Number(data.baseExperience),
      abilities: filteredPokemon[selectedIndex].abilities,
      win: 0,
      lose: 0,
      arena: false,
    };
    sendRequest(`${urlLocale}/${loggedIn.id}`, {
      editedPokemon: [...(loggedIn.editedPokemon || []), finalData],
    });
    refreshUser();
    enqueueSnackbar(`Nowy pokemon ${capitalize(data.name)} został dodany.`, {
      variant: "success",
    });
    setSearch("");
    navigate("/");
  };

  const onSubmitEdit = (data) => {
    const selectedPokemon = paginationEdit[0];

    const editedPokemon = loggedIn.editedPokemon || [];

    const updatedPokemon = editedPokemon.some(
      (p) => p.id === selectedPokemon.id
    )
      ? editedPokemon.map((pok) =>
          pok.id === selectedPokemon.id
            ? {
                ...pok,
                weight: Number(data.weigth),
                height: Number(data.heigth),
                baseExperience: Number(data.baseExperience),
              }
            : pok
        )
      : [
          ...editedPokemon,
          {
            ...selectedPokemon,
            weight: Number(data.weigth),
            height: Number(data.heigth),
            baseExperience: Number(data.baseExperience),
            arena: selectedPokemon.arena ?? false,
            win: selectedPokemon.win ?? 0,
            lose: selectedPokemon.lose ?? 0,
          },
        ];

    sendRequest(`${urlLocale}/${loggedIn.id}`, {
      editedPokemon: updatedPokemon,
    });

    refreshUser();
    enqueueSnackbar(`Zmieniono atrybuty ${capitalize(selectedPokemon.name)}.`, {
      variant: "success",
    });
    setSearch("");
    navigate("/");
  };

  return (
    <StyledDiv $gap>
      {!openCreate && !openEdit && (
        <StyledDiv $pokeWrapper $headerGap>
          <Button
            onClick={() => setOpenCreate(true)}
            variant="contained"
            sx={{ width: 200 }}
          >
            Dodaj Pokemona
          </Button>
          <Button
            onClick={() => setOpenEdit(true)}
            variant="contained"
            sx={{ width: 200 }}
          >
            Edytuj Pokemona
          </Button>
        </StyledDiv>
      )}

      {openCreate && (
        <StyledForm onSubmit={handleSubmit(onSubmit)} $edit>
          {smallScreen ? (
            <Button
              onClick={() => setOpenCreate(false)}
              variant="contained"
              sx={{ position: "absolute", top: 5, left: 5, width: 30 }}
            >
              Powrót
            </Button>
          ) : (
            <Button
              onClick={() => setOpenCreate(false)}
              variant="contained"
              sx={{ position: "absolute", top: 5, left: 5 }}
            >
              Powrót
            </Button>
          )}
          <StyledDiv style={{ gap: 10 }}>
            <Button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? filteredPokemon.length - 1 : prev - 1
                )
              }
              variant="outlined"
            >
              &lt;
            </Button>
            <StyledDiv $relative $info>
              <StyledDiv $imgContainer>
                <StyledImg
                  style={{
                    filter: isAlreadyEdited(filteredPokemon[selectedIndex]?.id)
                      ? "grayscale(100%)"
                      : "none",
                  }}
                  $edit
                  src={filteredPokemon[selectedIndex]?.img}
                />
              </StyledDiv>
              <StyledP $absolute $error>
                {errors.img?.message}
              </StyledP>
            </StyledDiv>

            <Button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === filteredPokemon.length - 1 ? 0 : prev + 1
                )
              }
              variant="outlined"
            >
              &gt;
            </Button>
          </StyledDiv>
          <RegisterInput
            {...register("name")}
            $inputEdit
            $register
            $edit
            placeholder={"Name"}
            errors={errors.name?.message}
          />
          <RegisterInput
            {...register("weigth")}
            $inputEdit
            $register
            $edit
            placeholder={"Weigth"}
            errors={errors.weigth?.message}
          />
          <RegisterInput
            {...register("heigth")}
            $inputEdit
            $register
            $edit
            placeholder={"Heigth"}
            errors={errors.heigth?.message}
          />
          <RegisterInput
            {...register("baseExperience")}
            $inputEdit
            $register
            $edit
            placeholder={"Expirience"}
            errors={errors.baseExperience?.message}
          />
          <Button type="submit" variant="contained">
            Dodaj
          </Button>
        </StyledForm>
      )}

      {openEdit && (
        <StyledForm onSubmit={editHandleSubmit(onSubmitEdit)} $edit>
          {smallScreen ? (
            <Button
              onClick={() => setOpenEdit(false)}
              variant="contained"
              sx={{ position: "absolute", top: 5, left: 5, width: 30 }}
            >
              Powrót
            </Button>
          ) : (
            <Button
              onClick={() => setOpenEdit(false)}
              variant="contained"
              sx={{ position: "absolute", top: 5, left: 5 }}
            >
              Powrót
            </Button>
          )}
          <StyledDiv $info style={{ gap: 10 }}>
            <StyledDiv>
              <StyledInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                $search
                placeholder="Search"
              />
            </StyledDiv>
            <StyledDiv style={{ gap: 10 }}>
              <Button onClick={prevPage} variant="outlined">
                &lt;
              </Button>
              <StyledDiv $relative $info>
                <StyledDiv $imgContainer>
                  {paginationEdit.map((pok) => {
                    return (
                      <StyledDiv key={pok.id} $info>
                        <StyledP>{capitalize(pok.name)}</StyledP>
                        <StyledImg src={pok.img} />
                      </StyledDiv>
                    );
                  })}
                </StyledDiv>
              </StyledDiv>

              <Button onClick={nextPage} variant="outlined">
                &gt;
              </Button>
            </StyledDiv>
          </StyledDiv>
          <RegisterInput
            {...editRegister("weigth")}
            $inputEdit
            $register
            $edit
            errors={editErrors.weigth?.message}
            placeholder={"Weigth"}
          />
          <RegisterInput
            {...editRegister("heigth")}
            $inputEdit
            $register
            $edit
            errors={editErrors.heigth?.message}
            placeholder={"Heigth"}
          />
          <RegisterInput
            {...editRegister("baseExperience")}
            $inputEdit
            $register
            $edit
            errors={editErrors.baseExperience?.message}
            placeholder={"Expirience"}
          />
          <Button type="submit" variant="contained">
            Zmień atrybuty
          </Button>
        </StyledForm>
      )}
    </StyledDiv>
  );
};
export default EditPage;
