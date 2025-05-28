import { TextField } from "@mui/material";

export default function Search({ value, onChange }) {
    return (
        <div className="search">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size="small"
                label="Search for..."
                value={value}
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
                    "& .MuiInputLabel-root": {
                        color: "text.secondary",
                        "&.Mui-focused": {
                            color: "red"
                        }
                    },
                    "& .MuiSvgIcon-root": {
                        color: "red"
                    }
                }}
            />
        </div>
    );
}
