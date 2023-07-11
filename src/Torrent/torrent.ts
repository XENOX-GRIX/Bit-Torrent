import { torrentFileItem } from "../Utils/torrentFileItem";
import { trackerItem } from "../Utils/trackerItem";

class torrent {
    private _private: boolean = false;
    private _pieceSize: number;
    private _blockSize: number;
    private _uploaded: number;
    private _name: string;
    private _comment: string;
    private _owner: string;
    private _date: Date;
    private _downloadDirectory: string;
    private _fileDirectory: string;
    private _files: torrentFileItem[] = [];
    private _trackers: trackerItem[] = [];
    private _infohash: byte[] = new byte[20]();
    private _pieceHashes: Uint8Array[][];
    private _isPieceVerified: boolean[];
    private _isBlockAcquired: boolean[][];
    public _Encoding?: Encoding;

    public get pieceSize(): number {
        return this._pieceSize;
    }

    public set pieceSize(value: number) {
        this._pieceSize = value;
    }

    public get blockSize(): number {
        return this._blockSize;
    }

    public set blockSize(value: number) {
        this._blockSize = value;
    }

    public get uploaded(): number {
        return this._uploaded;
    }

    public set uploaded(value: number) {
        this._uploaded = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get comment(): string {
        return this._comment;
    }

    public set comment(value: string) {
        this._comment = value;
    }

    public get owner(): string {
        return this._owner;
    }

    public set owner(value: string) {
        this._owner = value;
    }

    public get date(): Date {
        return this._date;
    }

    public set date(value: Date) {
        this._date = value;
    }

    public get downloadDirectory(): string {
        return this._downloadDirectory;
    }

    public set downloadDirectory(value: string) {
        this._downloadDirectory = value;
    }

    public get fileDirectory(): string {
        return this._fileDirectory;
    }

    public set fileDirectory(value: string) {
        this._fileDirectory = value;
    }

    public get files(): torrentFileItem[] {
        return this._files;
    }

    public get trackers(): Tracker[] {
        return this._trackers;
    }

    public get infohash(): byte[] {
        return this._infohash;
    }

    public get pieceHashes(): byte[][] {
        return this._pieceHashes;
    }

    public get isPieceVerified(): boolean[] {
        return this._isPieceVerified;
    }

    public get isBlockAcquired(): boolean[][] {
        return this._isBlockAcquired;
    }

    public get Encoding(): Encoding {
        return this._Encoding;
    }

    public set Encoding(value: Encoding) {
        this._Encoding = value;
    }

    constructor(
        public constructorName: string,
        public constructorLocation: string,
        public constructorFiles: torrentFileItem[],
        public constructorTrackers: string[],
        public constructorPieceSize: number,
        public constructorPieceHashes: Uint8Array[] | null,
        public constructorBlockSize: number | 16384,
        public constructorIsPrivate: boolean | false 
    ) {
        if (
            !constructorName ||
            !constructorLocation ||
            !constructorFiles ||
            !constructorTrackers
        ) {
            throw new Error("Missing required parameter");
        }

        this.name = constructorName;
        this._downloadDirectory = constructorLocation;
        this._files = constructorFiles;
        this._trackers = [];
        this._pieceSize = constructorPieceSize; 
        this._blockSize = constructorBlockSize; 
        this._private = constructorIsPrivate;
        


        for (const tracker of constructorTrackers) {
            const tr =new trackerItem(tracker);   
            this._trackers.push(tr);
            // tr.PeerListUpdated += this.handlePeerListUpdated;
        }

        const pieceCount = Math.ceil(this.totalSize() / constructorPieceSize);
        this._pieceHashes = new Array(pieceCount).fill(new Uint8Array(20));
        this._isPieceVerified = new Array(pieceCount).fill(false);
        this._isBlockAcquired = new Array(pieceCount);

        for (let i = 0; i < pieceCount; i++) {
            this._isBlockAcquired[i] = new Array<boolean>(this.GetBlockCount(i)).fill(false);
        }

        if (!constructorPieceHashes) {
            for (let i = 0; i < pieceCount; i++) {
                // this.pieceHashes[i] = generateSHA1(pieceHashes[i]);
            }
        } else {
            for (let i = 0; i < pieceCount; i++) {
                this._pieceHashes[i] = new Uint8Array(20);
                this._pieceHashes[i].set(
                    constructorPieceHashes.subarray(i * 20, i * 20 + 20)
                );
            }
        }

        const info = this.TorrentToBencodeObject(this);
        const encoding = info.encode();
        const bytes = new TextEncoder().encode(encoding);
        this.infohash = this.generateSHA1(bytes);

        // TODO: verification
    }
}
