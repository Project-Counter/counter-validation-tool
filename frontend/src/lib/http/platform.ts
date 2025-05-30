import { Platform, PlatformDetail } from "../definitions/api"
import { jsonFetch } from "./util"

export const urls = {
  platform: "counter/platform/",
  sushi: "counter/sushi/",
}

export async function loadPlatform(id: string) {
  return jsonFetch<PlatformDetail>(`${urls.platform}${id}/`)
}

export async function loadPlatforms() {
  return jsonFetch<Platform[]>(urls.platform)
}
