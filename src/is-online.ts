import * as publicIp from "public-ip";

const options = {
    timeout: 30,
};

export const isOnline = async (): Promise<boolean> => {
    let ipv4, ipv6;
    try {
        ipv4 = await publicIp.v4(options);
    } catch (e) {
    }

    try {
        ipv6 = await publicIp.v6(options);
    } catch (e) {
    }

    return !!(ipv4 || ipv6);
};
