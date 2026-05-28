import { useState } from "react";
export default function TipCalculator() {
  const [bill, setBill]           = useState("");
  const [people, setPeople]       = useState("");
  const [tipPreset, setTipPreset] = useState(null);
  const [tipCustom, setTipCustom] = useState("");
  const [errors, setErrors]       = useState({});

  function handleBill() {
  }
  function handlePeople() {
  }
  function handleTipCustom() {
  }
  function handleReset() {
  }

  return (
    <>
      <div className="app">
        <div className="card">

          {/* Header */}
          <div className="card-header">
            <div>
              <h1>Tip Calculator</h1>
              <p>Split the bill — live, no button needed</p>
            </div>
          </div>

          <div className="body">

            {/* ── Inputs ── */}
            <div className="inputs-panel">

              {/* Bill */}
              <div className="field">
                <label className="field-label">Bill Amount</label>
                <div>
                  <span className="input-prefix">$</span>
                  <input
                    className="text-input"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={bill}
                    onChange={handleBill}
                  />
                </div>
                {/* //show error using short circuiting */}
              </div>

              {/* Tip */}
              <div className="field">
                <label className="field-label">Select Tip %</label>
                <div className="tip-presets">
                  {/* tip preset buttons */}
                </div>
                <div>
                  <input
                    className="text-input"
                    inputMode="decimal"
                    placeholder="Custom %"
                    value={tipCustom}
                    onChange={handleTipCustom}
                  />
                  <span className="input-suffix">%</span>
                </div>
                {/* tip error */}
              </div>

              {/* People */}
              <div className="field">
                <label className="field-label">Number of People</label>
                <div>
                  <input
                    className="text-input"
                    inputMode="numeric"
                    placeholder="1"
                    value={people}
                    onChange={handlePeople}
                  />
                </div>
                {/* people error */}
              </div>

            </div>

            {/* ── Results ── */}
            <div className="results-panel">
              {/* {computed ? (
                <>
                  <div className="result-card">
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <span>Enter bill, tip, and<br />number of people to see the split</span>
                </div>
              )} */}

              <button className="reset-btn" onClick={handleReset}>Reset</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
