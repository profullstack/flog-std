export default {
  encode(decoded) {
    return Buffer.from(decoded).toString("base64");
  },
  decode(encoded) {
    return Buffer.from(encoded, "base64").toString("ascii");
  },
};
