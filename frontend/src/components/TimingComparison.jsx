function TimingRow({ label, description, value, maxValue, kind }) {
  const width = value && maxValue ? Math.max((value / maxValue) * 100, 8) : 0

  return (
    <div className="timing-row">
      <div className="timing-copy">
        <div>
          <strong>{label}</strong>
          <span>{description}</span>
        </div>
        <b>{value ? `${Math.round(value)} ms` : '-- ms'}</b>
      </div>
      <div className="timing-track" aria-hidden="true">
        <span className={`timing-bar ${kind}`} style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

export default function TimingComparison({ timings }) {
  const maxValue = timings ? Math.max(timings.sequential, timings.parallel) : 0
  const saved = timings ? Math.max(timings.sequential - timings.parallel, 0) : 0

  return (
    <section className="timing-section" aria-labelledby="timing-title">
      <div className="timing-heading">
        <div className="section-heading compact">
          <span className="step-number">04</span>
          <div>
            <p className="eyebrow">PERFORMANCE</p>
            <h2 id="timing-title">조회 처리시간</h2>
          </div>
        </div>
        {timings && <span className="saved-time">약 {Math.round(saved)} ms 단축</span>}
      </div>

      <div className="timing-list" aria-live="polite">
        <TimingRow
          label="순차 조회"
          description="시장 A 완료 후 시장 B 조회"
          value={timings?.sequential}
          maxValue={maxValue}
          kind="sequential"
        />
        <TimingRow
          label="병렬 조회"
          description="두 시장을 동시에 조회"
          value={timings?.parallel}
          maxValue={maxValue}
          kind="parallel"
        />
      </div>
    </section>
  )
}
