import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { back } from '../atom'
import PrevButton from '../Component/Button'
import { Loading, LoadingError } from '../Component/Loader'
import { ISubRouteProps } from './IdataProps'
import { Loader, PriceData, RouteParams } from './Coin'
import { fetchCoinTickers } from '../api'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const PriceHeading = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 35px;
  text-decoration: underline !important;
`

const AthHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 7px;
`
const AllTimeHighest = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
const AthDate = styled.span``
const AthValue = styled.span``

const TodayOpeningValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  span {
    text-decoration: underline;
    font-weight: 600;
    margin-bottom: 5px;
  }
`

const WeeklyChange = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  span {
    font-weight: 600;
  }
`
function Price({
  isLoading,
  isLoadingError,
  failed,
  priceData,
}: ISubRouteProps) {
  const { coinId } = useParams<RouteParams>()
  const { data: tickersData } = useQuery<PriceData>(['tickers', coinId], () =>
    fetchCoinTickers(coinId)
  )

  const setPath = useSetRecoilState(back)
  useEffect(() => {
    setPath(`/${coinId}`)
  }, [])

  return (
    <>
      <PrevButton />
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : isLoadingError ? (
        <LoadingError>An error occured while loading the chart</LoadingError>
      ) : failed ? (
        <Loader>Request Failed</Loader>
      ) : (
        <>
          <PriceHeading>{priceData?.name} Price & Market Stats</PriceHeading>
          <AthHeading>All Time Highest</AthHeading>
          <AllTimeHighest>
            <AthDate>Date: {tickersData?.quotes.USD.ath_date}</AthDate>
            <AthValue>Value: {tickersData?.quotes.USD.ath_price}</AthValue>
          </AllTimeHighest>
          <TodayOpeningValue>
            <span>Market Cap:</span>${tickersData?.quotes.USD.market_cap}
            <span>24HR's Change:</span>$
            {tickersData?.quotes.USD.percent_change_24h}
          </TodayOpeningValue>

          <WeeklyChange>
            <span>Year Percentage Change to dollars:</span>
            {tickersData?.quotes.USD.percent_change_1y}%
          </WeeklyChange>
        </>
      )}
    </>
  )
}

export default Price
