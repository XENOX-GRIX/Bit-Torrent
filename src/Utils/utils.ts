export function bytesToString(bytes: number): string {
    if (bytes < 1024) {
        return bytes + " B";
    }
    const unit = 1024;
    const suffixes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const exp = Math.floor(Math.log(bytes) / Math.log(unit));
    return `${(bytes / Math.pow(unit, exp)).toFixed(1)} ${suffixes[exp - 1]}`;
}

