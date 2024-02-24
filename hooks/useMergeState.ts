import { useCallback, useState } from "react"

type DeepPartial<T> = T extends unknown[]
  ? T
  : {
      [P in keyof T]?: DeepPartial<T[P]>
    }

type KeysOfUnion<T> = T extends T
  ? keyof T extends keyof number | keyof string
    ? never
    : keyof T
  : never

type SetMerge<S> = (value: DeepPartial<S> | ((prevState: S) => DeepPartial<S>)) => void

type Options<T> =
  | {
      deepMerge?: T extends unknown[] ? never : boolean
      mergeArrays?: T extends unknown[] ? boolean : never
      uniqueArray?: T extends unknown[] ? boolean : never
      uniqueArrayOfObjects?: false
      uniqueProp?: never
    }
  | {
      deepMerge?: never // for object only
      mergeArrays?: T extends unknown[] ? boolean : never
      uniqueArray?: T extends unknown[] ? boolean : never
      uniqueArrayOfObjects: true
      uniqueProp: T extends unknown[] ? KeysOfUnion<T[number]> & string : never
    }
export const useMergeState = <T>(initialState: T, options: Options<T> = {}) => {
  const [state, setState] = useState(initialState)

  const mergeState = useCallback((newState: T) => {
    setState(prevState => {
      if (typeof newState === "function") newState = newState(prevState)

      if (isObject(initialState))
        return mergeObject([prevState, newState], options.deepMerge ? options.deepMerge : false)

      if (Array.isArray(initialState)) {
        return mergeArray(
          options.mergeArrays ? [prevState, newState] : [newState],
          options.uniqueArray,
          options.uniqueArrayOfObjects ? options.uniqueArrayOfObjects : false,
          options.uniqueProp ? options.uniqueProp : undefined
        )
      }
      return newState
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [state, mergeState as SetMerge<T>] as const
}
function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj)
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
function mergeObject(objects: any[], deepMerge = false): any {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal)
      } else if (deepMerge && isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeObject([pVal, oVal])
      } else {
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

function mergeArray(
  arrays: any[],
  uniqueArray = false,
  uniqueArrayOfObjects = false,
  uniqueProp?: string
): any[] {
  const merged = {} as Record<string, any>
  arrays.forEach((data, i1) =>
    data.forEach((obj: any, i2: any) => {
      // const index = Object.values(obj)[0] as number
      if (uniqueArray) {
        if (!isObject(obj)) merged[`@merged-${obj}`] = obj
        else if (uniqueArrayOfObjects && uniqueProp) merged[obj[uniqueProp] as string] = obj
        else merged[`${i1}-${i2}`] = obj
      } else {
        if (!uniqueArrayOfObjects) merged[`${i1}-${i2}`] = obj
        else if (isObject(obj) && uniqueProp) merged[obj[uniqueProp] as string] = obj
        else merged[`${i1}-${i2}`] = obj
      }
    })
  )
  return Object.values(merged)
}

type Tes = (
  | {
      id: number
      name: string
      email: string
    }
  | string
)[]

// type TesNew = Tes extends unknown[] ? Tes : never
