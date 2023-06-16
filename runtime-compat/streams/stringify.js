import {defined} from "../function/exports.js";

const decoder = new TextDecoder();
const read = ({chunks = [], reader}) =>
  reader.read().then(({done, value}) => done
    ? chunks
    : read({chunks: [...chunks, decoder.decode(value)], reader}));

export default async readable =>
  (await read({reader: readable.getReader()})).filter(defined).join();
