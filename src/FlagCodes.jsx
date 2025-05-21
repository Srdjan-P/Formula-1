export function getCodeByNationality(flags, nationality) {
    if (!flags) {
        return null
    }
    if (nationality === "Dutch") {
        return "NL"
    }
    if (nationality === "Korean") {
        return "KR"
    }
    if (nationality === "British") {
        return "GR"
    }

    const flag = flags.find((flag) => flag.nationality === nationality)
    if (!flag) {
        return null;
    }
    return flag.alpha_2_code;
}

export function getCodeByCountryName(flags, name) {
    if (!flags) {
        return null;
    }

    if (name === "Korea")
        return "KR";

    if (name === "UK") {
        return "GB";
    }
    if (name === "USA") {
        return "US";
    }
    if (name === "UAE")
        return "AE";

    const country = flags.find((flag) => flag.en_short_name === name);

    if (!country) {
        return null
    }
    return country.alpha_2_code;

}