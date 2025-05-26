import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ array, value, onChange }) {
  return (
    <Box sx={{ minWidth: 90 }}>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "Text.secondary",
            fontWeight: "600",
          }}
        >
          {"Years"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Year"
          size="small"
          onChange={onChange}
          sx={{
            backgroundColor: "#f0f0f0",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "blue",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#f5f5f5",
                marginTop: "8px",
                maxHeight: 200,
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    backgroundColor: "red",
                    color: "#fff",
                    fontWeight: "600",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#d0d0d0",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  },
                },
              },
            },
          }}
        >

          {array.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
