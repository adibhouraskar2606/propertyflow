import type { Unit } from "../types/unit";
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface UnitCardProps {
  unit: Unit;
}

function UnitCard({ unit }: UnitCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6">
            Unit {unit.unitNumber}
          </Typography>

          <Chip
            label={unit.status}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Typography color="text.secondary">
          {unit.bedrooms} bed • {unit.bathrooms} bath
        </Typography>

        <Typography sx={{ mt: 1 }}>
          ${unit.monthlyRent.toLocaleString()} / month
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UnitCard;