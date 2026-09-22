import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

function DashboardPage() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Welcome to PropertyFlow.
      </Typography>

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
      >
        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">
              Properties
            </Typography>

            <Typography variant="h4">
              3
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">
              Units
            </Typography>

            <Typography variant="h4">
              17
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">
              Occupied Units
            </Typography>

            <Typography variant="h4">
              13
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent>
            <Typography color="text.secondary">
              Open Maintenance
            </Typography>

            <Typography variant="h4">
              2
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}

export default DashboardPage;