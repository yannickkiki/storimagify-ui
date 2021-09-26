function parse(input = "") {
    const ret = Object.create(null);

    if (typeof input !== "string") {
        return ret;
    }

    input = decodeURIComponent(input).trim().replace(/^[?#&]/, "");

    if (!input) {
        return ret;
    }

    for (const param of input.split("&")) {
        let [key, value] = param.replace(/\+/g, " ").split("=");
        ret[key] = value === undefined ? null : value;
    }
    return ret;
}

export default { parse };
