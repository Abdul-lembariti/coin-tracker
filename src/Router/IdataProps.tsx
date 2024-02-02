import { ICoinPrice } from './ICoins'

type IData = number[]
export interface ISubRouteProps {
  isLoading?: boolean
  isLoadingError?: boolean
  failed?: unknown
  priceData?: ICoinPrice
  data?: IData[]
  coinId?: string
  id: string
}
