import { useEffect, useState } from 'react'

const FETCH_LOGS_KEY = 'useFetch.logs'

const readStoredLogs = () => {
  try {
    const savedLogs = localStorage.getItem(FETCH_LOGS_KEY)
    return savedLogs ? JSON.parse(savedLogs) : []
  } catch {
    return []
  }
}

const normalizePayloadBody = (body) => {
  if (!body) {
    return null
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return body
    }
  }

  return body
}

const persistLogEntry = (entry) => {
  const nextLogs = [entry, ...readStoredLogs()].slice(0, 20)
  localStorage.setItem(FETCH_LOGS_KEY, JSON.stringify(nextLogs))
  console.info('useFetch log', entry)
}

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(url))
  const [error, setError] = useState('')
  const [statusCode, setStatusCode] = useState(null)
  const method = options.method || 'GET'
  const headers = options.headers
  const body = options.body

  useEffect(() => {
    if (!url) {
      setIsLoading(false)
      return undefined
    }

    const controller = new AbortController()
    const requestOptions = { method, signal: controller.signal }

    if (headers) {
      requestOptions.headers = headers
    }

    if (body) {
      requestOptions.body = body
    }

    const loadData = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(url, requestOptions)
        const responseBody = await parseResponse(response)

        if (controller.signal.aborted) {
          return
        }

        setData(responseBody)
        setStatusCode(response.status)

        persistLogEntry({
          timestamp: new Date().toISOString(),
          url,
          method,
          payloadBody: normalizePayloadBody(body),
          responseStatus: response.status,
        })
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setError(fetchError.message || 'Request failed')
        setStatusCode(null)

        persistLogEntry({
          timestamp: new Date().toISOString(),
          url,
          method,
          payloadBody: normalizePayloadBody(body),
          responseStatus: null,
        })
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [url, method, headers, body])

  return {
    data,
    isLoading,
    error,
    statusCode,
  }
}

export default useFetch