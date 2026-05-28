import { useState } from "react";
import "./App.css"

/* ── Regex: only digits and one optional decimal point ── */
const DECIMAL_REGEX = /^\d*\.?\d*$/;
const INTEGER_REGEX = /^\d*$/;

const PRESETS = [5, 10, 20];



export default function TipCalculator() {
  const [bill, setBill]           = useState("");
  const [people, setPeople]       = useState("");
  const [tipPreset, setTipPreset] = useState(null);
  const [tipCustom, setTipCustom] = useState("");
  const [errors, setErrors]       = useState({});

  function handleBill(e) {
    const val = e.target.value;
    if (val !== "" && !DECIMAL_REGEX.test(val)) return;
    setBill(val);
    if (val === "") { setErrors(prev => ({ ...prev, bill: null })); return; }
    const n = parseFloat(val);
    if (n <= 0) setErrors(prev => ({ ...prev, bill: "Bill must be greater than 0" }));
    else        setErrors(prev => ({ ...prev, bill: null }));
  }
  function handlePeople(e) {
    const val = e.target.value;
    if (val !== "" && !INTEGER_REGEX.test(val)) return;
    setPeople(val);
    if (val === "") { setErrors(prev => ({ ...prev, people: null })); return; }
    const n = parseInt(val, 10);
    if (n <= 0) setErrors(prev => ({ ...prev, people: "At least 1 person required" }));
    else        setErrors(prev => ({ ...prev, people: null }));
  }
  function handleTipCustom(e) {
    const val = e.target.value;
    if (val !== "" && !DECIMAL_REGEX.test(val)) return;
    setTipCustom(val);
    setTipPreset(null);
    if (val === "") { setErrors(prev => ({ ...prev, tip: null })); return; }
    const n = parseFloat(val);
    if (isNaN(n))   setErrors(prev => ({ ...prev, tip: "Enter a valid percentage" }));
    else if (n < 0) setErrors(prev => ({ ...prev, tip: "Tip cannot be negative" }));
    else            setErrors(prev => ({ ...prev, tip: null }));
  }
  function handleReset() {
    setBill(""); setPeople(""); setTipPreset(null); setTipCustom(""); setErrors({});
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
          {/* Body */}
          <div className="body">

            {/* ── Inputs ── */}
            <div className="inputs-panel">
              <div className="inputs-panel-inner">
              {/* Bill */}
              <div className="field">
                <label className="field-label">Bill Amount</label>
                <div className={`input-wrap${errors.bill ? " has-error" : ""}`}>
                  <span className="input-prefix">$</span>
                  <input
                    className="text-input"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={bill}
                    onChange={handleBill}
                  />
                </div>
                {errors.bill && <span className="error-msg">⚠ {errors.bill}</span>}
              </div>

              {/* Tip */}
              <div className="field">
                <label className="field-label">Select Tip %</label>
                <div className="tip-presets">
                  {PRESETS.map(p => (
                    <button
                      key={p}
                      className={`tip-btn${tipPreset === p ? " active" : ""}`}
                      onClick={() => {
                        setTipPreset(p);
                        setTipCustom("");
                        setErrors(prev => ({ ...prev, tip: null }));
                      }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <div className={`input-wrap tip-custom-wrap${errors.tip ? " has-error" : ""}`}>
                  <input
                    className="text-input"
                    inputMode="decimal"
                    placeholder="Custom %"
                    value={tipCustom}
                    onChange={handleTipCustom}
                  />
                  <span className="input-suffix">%</span>
                </div>
                {errors.tip && <span className="error-msg">⚠ {errors.tip}</span>}
              </div>

              {/* People */}
              <div className="field">
                <label className="field-label">Number of People</label>
                <div className={`input-wrap${errors.people ? " has-error" : ""}`}>
                  <input
                    className="text-input"
                    inputMode="numeric"
                    placeholder="1"
                    value={people}
                    onChange={handlePeople}
                  />
                </div>
                {errors.people && <span className="error-msg">⚠ {errors.people}</span>}
              </div>
            </div>      
          </div>

            {/* ── Results ── */}
            <div className="results-panel">
              <div className="results-panel-inner">
              {computed ? (
                <>
                  <div className="result-card primary">
                    <div className="result-card-inner">
                      <div className="result-card-label">Each person pays</div>
                      <div className="result-card-amount">$</div>
                      <div className="result-card-sub">includes tipPerPerson </div>
                    </div>
                  </div>

                  <div className="result-card">
                    <div className="result-card-inner">
                      <div className="result-card-label">Total tip</div>
                      <div className="result-card-amount small">$tipTotal</div>
                      <div className="result-card-sub">at tip%</div>
                    </div>
                  </div>

                  <div className="breakdown">
                    <div className="breakdown-title">
                      <span className="breakdown-title-text">Breakdown</span>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Bill subtotal</span>
                        <span className="breakdown-val">$bill</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Tip %</span>
                        <span className="breakdown-val">$tipTotal</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Grand total</span>
                        <span className="breakdown-val">$totalBill</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">÷ people</span>
                        <span className="breakdown-val accent">$perPerson</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <span>Enter bill, tip, and<br />number of people to see the split</span>
                </div>
              )}

              <button className="reset-btn" onClick={handleReset}>Reset</button>
            </div>
              
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
