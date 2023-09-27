import "./App.css";
import { Suspense, lazy } from "react";

import ScoreBoard from "./components/ScoreBoard";
import Card from "./components/Card";
import useGameContext from "./reducers/GameContext";

const Dice = lazy(() => import("./components/Dice"));
const Congratulations = lazy(() => import("./components/Congratulations"));

export default function App() {
  const { isTimerDone, totalAmount } = useGameContext();

  return (
    <div className="App">
      {totalAmount <= 0 ? (
        <h1 className="error-message">
          Your credit {totalAmount < 0 ? "is less than $0" : "is $0"}. Please
          recharge.
        </h1>
      ) : (
        <>
          <ScoreBoard />
          <Card />
          {isTimerDone && (
            <>
              <Suspense fallback="Loading...">
                <Dice />
              </Suspense>
              <Suspense>
                <Congratulations />
              </Suspense>
            </>
          )}
        </>
      )}
    </div>
  );
}
