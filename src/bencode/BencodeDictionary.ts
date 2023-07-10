import { Counter } from "../Utils/counter";
import { Bencode } from "./Bencode";
import { BencodeString } from "./BencodeString";
import { BencodeItem } from "./BencodeItem";


export class BencodeDictionary
    extends Map<BencodeString, BencodeItem>
    implements BencodeItem
{
    constructor(entries?: [BencodeString, BencodeItem][]) {
        super(entries);
        Object.setPrototypeOf(this, BencodeDictionary.prototype);
    }

    encode(): string {
        let encodedString = "d";
        for (const [key, value] of this.entries()) {
            encodedString += key.encode() + value.encode();
        }
        encodedString += "e";
        return encodedString;
    }

    static decode(str: string, c: Counter): BencodeDictionary | undefined {
        if (str[c.get()] == "d") {
            c.inc();
        }

        const dictItems: BencodeDictionary = new BencodeDictionary();

        while (str[c.get()] != "e" && str.length > c.get()) {
            const key: BencodeString | undefined = BencodeString.decode(str, c);
            const val: BencodeItem | undefined = Bencode.parseItem(str, c);

            if (key != undefined && val != undefined) {
                dictItems.set(key, val);
            } else {
                throw new Error("BencodeDictionary: <key, valid> pair invalid");
            }
        }
        c.inc();
        return dictItems;
    }
}
