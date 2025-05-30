import { urls } from "@/lib/http/validation"
import { jsonFetch } from "@/lib/http/util"
import { Message, SeverityLevel } from "@/lib/definitions/api"

type PaginatedMessage = {
  count: number
  next: string
  previous: string
  results: Message[]
}

export async function getValidationMessages(validationId: string) {
  const url = `${urls.list}${validationId}/messages/`
  const out = await jsonFetch<PaginatedMessage>(url)
  return out.results
}

export async function getValidationMessagesFromUrl(url: string) {
  const out = await jsonFetch<PaginatedMessage>(url)
  return out
}

export async function getValidationMessageStats(validationId: string) {
  const url = `${urls.list}${validationId}/stats/`
  const out = await jsonFetch<{
    summary: Record<string, number>
    summary_severity: { summary: string; severity: SeverityLevel; count: number }[]
  }>(url)
  return out
}
