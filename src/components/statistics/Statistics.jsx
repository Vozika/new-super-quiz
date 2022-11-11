import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import Fade from "@mui/material/Fade";

import { useSelector, useDispatch } from "react-redux";
import { styles } from "../../styles";
import { resetLocalStorageData } from "../../features/utilities/utilitiesSlice";

import { setStatistics, setOptions } from "../../features/options/optionsSlice";

import { setModal } from "../../features/structure/structureSlice";

const Statistics = ({ toLocalStorage }) => {
  const dispatch = useDispatch();
  const { interfaceText } = useSelector((store) => store.options);
  const { localStorageData, showFade } = useSelector(
    (store) => store.utilities
  );

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData(
      interfaceText.All_TIME_RIGHT_ANSWERS,
      localStorageData.rightAnswers
    ),
    createData(
      interfaceText.All_TIME_WRONG_ANSWERS,
      localStorageData.wrongAnswers
    ),
    createData(
      interfaceText.RIGHT_ANSWERS_ON_AVERAGE,
      Number(localStorageData.rightAnswers) > 0 &&
        Math.round(
          (Number(localStorageData.rightAnswers) /
            (Number(localStorageData.rightAnswers) +
              Number(localStorageData.wrongAnswers))) *
            100
        )
    ),
    createData(interfaceText.LONGEST_IRON_MAN, localStorageData.ironManStreak),
    createData(
      interfaceText.IRON_MAN_ATTEMPTS,
      localStorageData.ironManAttempts
    ),
    createData(interfaceText.OPTION5050_USED, localStorageData.option5050),
    createData(interfaceText.GAMES_FINISHED, localStorageData.gamesFinished),
  ];

  return (
    <>
      <Box sx={styles.options__box}>
        <Stack sx={styles.options__stack_cancelIcon}>
          <CancelIcon
            onClick={() => {
              dispatch(setStatistics(false));
              dispatch(setModal(false));
            }}
          />
        </Stack>

        <Fade
          in={showFade}
          timeout={{
            appear: 0,
            enter: 450,
            exit: 450,
          }}
        >
          <Typography
            variant="h3"
            sx={{ position: "relative", top: -5, mb: 1 }}
          >
            {interfaceText.STATISTICS}
          </Typography>
        </Fade>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "1rem" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#1976d2",
                    }}
                  >
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            localStorage.clear();
            toLocalStorage();
            dispatch(resetLocalStorageData());
          }}
        >
          Clear Statistics
        </Button>
      </Box>
    </>
  );
};

export default Statistics;
