import {platform} from "os";
import * as linuxPath from "path";
import {win32 as windowsPath} from "path";

export const osPath = platform() === "win32" ? windowsPath : linuxPath;