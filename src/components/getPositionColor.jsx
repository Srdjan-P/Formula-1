export default function getPositionColor(position) {
    if (position == 1) {
        return {
            backgroundColor: `rgb(230, 212, 20)`,
            color: "black"
        };
    }
    if (position == 2) {
        return {
            backgroundColor: ` rgb(192,192,192)`,
            color: "black"
        };
    }
    if (position == 3) {
        return {
            backgroundColor: `rgb(205,127,50)`,
            color: "black"
        };

    }
    if (position == 4) {
        return {
            backgroundColor: "#cefad0",
            color: "black"
        };

    }
    if (position == 5) {
        return {
            backgroundColor: "#ADD8E6",
            color: "black"
        };

    }
    if (position > 5 && position <= 10) {
        return {
            backgroundColor: "lightgray",
            color: "black"
        };

    }
    if (position > 10) {
        return {
            backgroundColor: "white",
            color: "black"
        };

    }

};
