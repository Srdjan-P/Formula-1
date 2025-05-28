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
          id="select-label"
          sx={{
            color: "Text.secondary",
            fontWeight: "600",
            "&.Mui-focused": {
              color: "red"
            }
          }}
        >
          {"Years"}
        </InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={value}
          label="Year"
          size="small"
          onChange={onChange}
          sx={{
            backgroundColor: "#f0f0f0",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightGray",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
              borderWidth: "1px"
            },
            "& .MuiSvgIcon-root": {
              color: "red"
            }
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
