import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Coins from './Router/Coins'
import Coin from './Router/Coin'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
