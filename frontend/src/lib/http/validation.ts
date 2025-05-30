import {
  Credentials,
  QueueInfo,
  SplitStats,
  Stats,
  StoredUser,
  TimeStats,
  Validation,
  ValidationCore,
  ValidationDetail,
} from "../definitions/api"
import { FUpload } from "../definitions/upload"
import { jsonFetch, wrapFetch } from "./util"
import { CoP, ReportCode } from "@/lib/definitions/counter"

import { isoDate } from "@/lib/formatting"
import { endOfMonth } from "date-fns"

export const urls = {
  list: "validations/validation/",
  file: "validations/validation/file/",
  sushi: "validations/counter-api-validation/",
  coreList: "validations/validation-core/",
  stats: "validations/validation-core/stats/",
  timeStats: "validations/validation-core/time-stats/",
  splitStats: "validations/validation-core/split-stats/",
  publicList: "validations/public/validation/",
  adminList: "validations/validation/all/",
  queueInfo: "validations/queue/",
}

export async function getValidationDetail(id: string) {
  const url = `${urls.list}${id}/`

  return jsonFetch<ValidationDetail>(url)
}

export async function getPublicValidationDetail(id: string) {
  const url = `${urls.publicList}${id}/`

  return jsonFetch<ValidationDetail>(url)
}

export async function publishValidation(id: string) {
  const url = `${urls.list}${id}/publish/`

  return jsonFetch<ValidationDetail>(url, {
    method: "POST",
  })
}

export async function unpublishValidation(id: string) {
  const url = `${urls.list}${id}/unpublish/`

  return jsonFetch<ValidationDetail>(url, {
    method: "POST",
  })
}

type PaginatedValidations = {
  count: number
  next: string
  previous: string
  results: Validation[]
}

type PaginatedValidationCores = {
  count: number
  next: string
  previous: string
  results: ValidationCore[]
}

export async function getValidationsFromUrl(url: string) {
  return jsonFetch<PaginatedValidations>(url)
}

export async function getValidationCoresFromUrl(url: string) {
  return jsonFetch<PaginatedValidationCores>(url)
}

export async function getValidationCoreDetail(id: string) {
  const url = `${urls.coreList}${id}/`

  return jsonFetch<ValidationCore>(url)
}

export async function validateFile(file: FUpload) {
  // we need to send the data in a multipart form
  const form = new FormData()
  form.append("file", file.file)
  form.append("user_note", file.user_note || "")

  return jsonFetch<Validation>(urls.file, {
    method: "POST",
    body: form,
  })
}

export async function validateCounterAPI(
  credentials: Credentials | undefined,
  url: string,
  cop: CoP,
  endpoint: string,
  reportCode?: ReportCode,
  beginDate?: Date,
  endDate?: Date,
  extraAttributes?: { [key: string]: string },
  useShortDates: boolean = false,
  userNote: string = "",
) {
  const data: {
    credentials: Credentials | undefined
    url: string
    cop_version: CoP
    api_endpoint: string
    report_code?: ReportCode
    begin_date?: string
    end_date?: string
    use_short_dates: boolean
    extra_attributes: { [key: string]: string } | undefined
    user_note: string
  } = {
    credentials,
    url,
    cop_version: cop,
    api_endpoint: endpoint,
    extra_attributes: extraAttributes,
    use_short_dates: useShortDates,
    user_note: userNote,
  }
  if (reportCode) {
    data["report_code"] = reportCode
  }
  if (beginDate) {
    data["begin_date"] = isoDate(beginDate)
  }
  if (endDate) {
    data["end_date"] = isoDate(endOfMonth(endDate))
  }
  return wrapFetch(urls.sushi, {
    method: "POST",
    json: data,
  })
}

export async function deleteValidation(id: string) {
  return wrapFetch(`${urls.list}${id}/`, {
    method: "DELETE",
  })
}

export async function getStats(user?: StoredUser): Promise<Stats> {
  const url = user ? `${urls.stats}?user=${user.id}` : urls.stats
  return jsonFetch<Stats>(url)
}

export async function getTimeStats(user?: StoredUser): Promise<TimeStats> {
  const url = user ? `${urls.timeStats}?user=${user.id}` : urls.timeStats
  return jsonFetch<TimeStats>(url)
}

export async function getSplitStats(user?: StoredUser): Promise<SplitStats> {
  const url = user ? `${urls.splitStats}?user=${user.id}` : urls.splitStats
  return jsonFetch<SplitStats>(url)
}

export async function getQueueInfo(): Promise<QueueInfo> {
  return jsonFetch<QueueInfo>(urls.queueInfo)
}
