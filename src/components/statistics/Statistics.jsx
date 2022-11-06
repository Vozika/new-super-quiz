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

import { useSelector, useDispatch } from "react-redux";

import { resetLocalStorageData } from "../../features/utilities/utilitiesSlice";

const style = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90%, 700px)",
  bgcolor: "background.paper",
  border: "1px solid #bdbdbd",
  boxShadow: 24,
  p: 3,
};

const Statistics = ({ toLocalStorage }) => {
  const dispatch = useDispatch();
  const { interfaceText } = useSelector((store) => store.options);
  const { localStorageData } = useSelector((store) => store.utilities);

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
      <Box sx={style}>
        <Typography variant="h3">{interfaceText.STATISTICS}</Typography>

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
                  <TableCell align="right" sx={{ fontSize: "1rem" }}>
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
