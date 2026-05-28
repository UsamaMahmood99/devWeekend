import { useState, useMemo } from "react";
import "./App.css"

/* ── Regex: only digits and one optional decimal point ── */
const DECIMAL_REGEX = /^\d*\.?\d*$/;
const INTEGER_REGEX = /^\d*$/;

const PRESETS = [5, 10, 20];
function fmt(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function blockInvalidKeys(e) {
  if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E") {
    e.preventDefault();
  }
}

/* For integer fields: also block the decimal point */
function blockIntegerKeys(e) {
  if (e.key === "-" || e.key === "+" || e.key === "e" || e.key === "E" || e.key === ".") {
    e.preventDefault();
  }
}

export default function TipCalculator() {
  const [bill, setBill]           = useState("");
  const [people, setPeople]       = useState("");
  const [tipPreset, setTipPreset] = useState(null);
  const [tipCustom, setTipCustom] = useState("");
  const [errors, setErrors]       = useState({});

  /* Effective tip percentage — null if no valid tip selected */
  const tipPct = useMemo(() => {
    if (tipPreset !== null) return tipPreset;
    if (tipCustom === "") return null;
    const v = parseFloat(tipCustom);
    return isNaN(v) ? null : v;
  }, [tipPreset, tipCustom]);

    /* Only compute results when ALL inputs are valid and positive */
const computed = useMemo(() => {
  const b = parseFloat(bill);
  const p = parseInt(people, 10);

  const billOk = !isNaN(b) && b > 0;
  const peopleOk = !isNaN(p) && p > 0;
  const tipOk = tipPct !== null && tipPct >= 0 && !errors.tip;

  if (!billOk || !peopleOk || !tipOk) return null;

  /* Convert bill into integer cents */
  const billCents = Math.round(b * 100);

  /* Calculate tip in cents */
  const tipCents = Math.round(billCents * tipPct / 100);

  /* Total cents */
  const totalCents = billCents + tipCents;

  /* Per person values */
  const perPersonCents = totalCents / p;
  const tipPerPersonCents = tipCents / p;

  /* Convert back to dollars */
  return {
    tipTotal: tipCents / 100,
    totalBill: totalCents / 100,
    perPerson: perPersonCents / 100,
    tipPerPerson: tipPerPersonCents / 100
  };
}, [bill, people, tipPct, errors.tip]);
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
            <div className="card-header-inner">
              <h1>Tip Calculator</h1>
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
                {errors.bill && <span className="error-msg"> {errors.bill}</span>}
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
                {errors.tip && <span className="error-msg"> {errors.tip}</span>}
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
                {errors.people && <span className="error-msg"> {errors.people}</span>}
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
                      <div className="result-card-amount">${fmt(computed.perPerson)}</div>
                      <div className="result-card-sub">includes ${fmt(computed.tipPerPerson)} tip</div>
                    </div>
                  </div>

                  <div className="result-card">
                    <div className="result-card-inner">
                      <div className="result-card-label">Total tip</div>
                      <div className="result-card-amount small">${fmt(computed.tipTotal)}</div>
                      <div className="result-card-sub">at {tipPct}%</div>
                    </div>
                  </div>

                  <div className="breakdown">
                    <div className="breakdown-title">
                      <span className="breakdown-title-text">Breakdown</span>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Bill subtotal</span>
                        <span className="breakdown-val">${fmt(parseFloat(bill))}</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Tip ({tipPct}%)</span>
                        <span className="breakdown-val">${fmt(computed.tipTotal)}</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">Grand total</span>
                        <span className="breakdown-val">${fmt(computed.totalBill)}</span>
                      </div>
                    </div>
                    <div className="breakdown-row">
                      <div className="breakdown-row-inner">
                        <span className="breakdown-key">÷ {parseInt(people)} people</span>
                        <span className="breakdown-val accent">${fmt(computed.perPerson)}</span>
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
