import type { Metric } from '../../types';
import { useCountUp } from '../../hooks/useCountUp';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const { ref, value } = useCountUp<HTMLDivElement>(metric.value);

  return (
    <div className="metric-card" ref={ref}>
      <div className="metric-card__value">
        <span aria-hidden="true">
          {value}
          <span className="metric-card__suffix">{metric.suffix}</span>
        </span>
        <span className="sr-only">
          {metric.value}
          {metric.suffix}
        </span>
      </div>
      <span className="metric-card__label">{metric.label}</span>
      <span className="metric-card__hint">{metric.hint}</span>
    </div>
  );
}
