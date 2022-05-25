import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowsProp,
} from "@mui/x-data-grid";

import DarkModeToggle from "react-dark-mode-toggle";
import ProspectService from "../services/Prospect.service";

const REFRESH_RATE_SECONDS = 60 * 10; // 10 minutes

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});

const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
      },
    });
  }, [isDarkMode]);

  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<GridRowsProp | null>(null);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "firstName",
      flex: 1,
    },
    { field: "lastName", headerName: "lastName", flex: 1 },
    { field: "middleName", headerName: "middleName", flex: 1 },
    { field: "nickName", headerName: "nickName", flex: 1 },
    { field: "emailAddress", headerName: "emailAddress", flex: 1 },
    { field: "birthDate", headerName: "birthDate", flex: 1 },
    { field: "gender", headerName: "gender", flex: 1 },
    { field: "personId", headerName: "personId", flex: 1 },
    { field: "location", headerName: "location", flex: 1 },
    { field: "ethnicity", headerName: "ethnicity", flex: 1 },
    { field: "race", headerName: "race", flex: 1 },
  ];

  const [numProspects, setNumProspects] = useState(20);
  const [email, setEmail] = useState("");

  return (
    <>
      <Head>
        <title>Create CSV Prospect</title>
        <meta name="description" content="Current Versions of Aviso Software" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ position: "absolute", right: 20, top: 20 }}>
          <DarkModeToggle
            size={50}
            onChange={setIsDarkMode}
            checked={isDarkMode}
          />
        </div>
        <Container sx={{ my: 10, height: "100%" }}>
          <Typography gutterBottom variant="h2">
            Create Prospect CSV
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="number"
                label="Num Prospects"
                type="number"
                value={numProspects}
                onChange={(e) => setNumProspects(Number(e.target.value))}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={() => {
                  setIsLoading(true);
                  ProspectService.createProspects(numProspects, { email })
                    .then((data) => {
                      setRows(data);
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
              >
                Generate
              </Button>
            </Stack>

            <Paper elevation={2}>
              <DataGrid
                getRowId={(row) => row.personId}
                disableSelectionOnClick
                autoHeight
                loading={isLoading}
                rows={rows || []}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Paper>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Home;
