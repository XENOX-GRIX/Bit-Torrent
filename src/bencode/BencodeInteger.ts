import { Counter } from "../Utils/counter";
import { BencodeItem } from "./BencodeItem";

export class BencodeInteger extends Number implements BencodeItem {
    constructor(value: number) {
        super(value);
        Object.setPrototypeOf(this, BencodeInteger.prototype);
    }
    encode(): string {
        return `d${this}e`;
    }
    static decode(str: string, c: Counter): BencodeInteger | undefined {
        if (str[c.get()] == "i") {
            c.inc();
        }
        const endOfInt: number = str.indexOf("e", c.get());
        if (endOfInt != -1) {
            const num: number = Number(str.substring(c.get(), endOfInt));
            if (Number.isNaN(num))
                throw new Error("BencodeInteger: Number is invalid");
            c.set(endOfInt + 1);
            return new BencodeInteger(num);
        } else {
            throw new Error("BencodeInteger: index of e is out of bounds");
        }
    }
}
