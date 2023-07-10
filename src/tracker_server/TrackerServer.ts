import { Application, Request } from "express";
import { BencodeDictionary } from "../bencode/BencodeDictionary";
import { BencodeString } from "../bencode/BencodeString";

const express = require("express");
// import express from "express";
enum events {
    stared = "started",
    paused = "paused",
    stopped = "stopped",
}
enum compact {
    isCompact = "0",
    isNotCompact = "1",
}
export class TrackerServer {
    portNumber: number;
    endPoint: string;
    server: Application;
    constructor(portNumber: number, endPoint: string) {
        this.portNumber = portNumber;
        this.endPoint = endPoint;
        this.server = express();
    }

    start(): void {
        this.server.listen(this.portNumber, () => {
            console.log(
                `The Tracker server is running on port ${this.portNumber}`
            );
        });

        this.server.get(`/${this.endPoint}`, (req, res) => {
            const queryParams = req.query;
            this.extractInfo(queryParams);
            res.send("hello world");
        });
    }

    private extractInfo(q: any) {
        const _info_hash: string = q?.info_hash;
        const _peer_id: string = q?.peer_id;
        const _port: string = q?.port;
        const _uploaded: string = q?.uploaded;
        const _downloaded: string = q?.downloaded;
        const _left: string = q?.left;
        const _event: events = q?.event;
        const _compact: compact = q?.compact;

        console.log("info_hash --> ", _info_hash);
        console.log("peer_id --> ", _peer_id);
        console.log("port --> ", _port);
        console.log("uploaded --> ", _uploaded);
        console.log("downloaded --> ", _downloaded);
        console.log("left --> ", _left);
        console.log("event --> ", _event);
        console.log("compact --> ", _compact);

        const d: BencodeDictionary = new BencodeDictionary();
        d.set(
            new BencodeString("hello world"),
            new BencodeString("hello world")
        );
        console.log("dict is -> ", d);
        return d;
    }
}
