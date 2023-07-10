import axios from "axios";
import { TrackerServer } from "../tracker_server/TrackerServer";

export function testTrackerServer() {
    const portNumber: number = 4000;
    const endPoint: string = "announce";
    const server: TrackerServer = new TrackerServer(portNumber, endPoint);
    server.start();

    const _info_hash: string =
        "SJDHSO*S(D)SD*(SD*S(YD&S*(BDSB^D&^S(D*S^BD(*SD^J*SJD&SD*(^*S&D%SV$%D&SDJSDklddshgfgsdfsd897f89d";
    const _peer_id: string = "AS9393de";
    const _port: string = "238";
    const _uploaded: string = "100";
    const _downloaded: string = "1000";
    const _left: string = "10";
    const _event: string = "started";
    const _compact: number = 1;

    // axios
    //     .get(
    //         `https://localhost:${portNumber}/${endPoint}?info_hash=${_info_hash}&peer_id=${_peer_id}&port=${_port}&uploaded=${_uploaded}&downloaded=${_downloaded}&left=${_left}&event=${_event}&compact=${_compact}`
    //     )
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((e) => {
    //         console.log("oopsie!!!!\n", e);
    //     });
}
