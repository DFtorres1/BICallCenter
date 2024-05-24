import { generateQueryKeys } from "./functions";

const salesKeys = generateQueryKeys("sales");
const callsKeys = generateQueryKeys("calls");
const satisfactionKeys = generateQueryKeys("satisfaction");

export { salesKeys, callsKeys, satisfactionKeys };
