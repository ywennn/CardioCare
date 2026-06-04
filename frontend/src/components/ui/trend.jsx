import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const FILTER_OPTIONS = [
  { label: '7 Hari', value: '7d' },
  { label: '30 Hari', value: '30d' },
  { label: '6 Bulan', value: '6m' },
  { label: '1 Tahun', value: '1y' },
];

function CategoryBadge({ category }) {
  const map = {
    RENDAH: 'bg-emerald-100 text-emerald-700',
    SEDANG: 'bg-blue-100 text-blue-700',
    'BERISIKO TINGGI': 'bg-red-100 text-red-700',
  };
  const cls = map[category] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {category}
    </span>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border bg-white p-3 shadow-lg text-xs min-w-[180px]">
      <p className="mb-2 font-semibold text-gray-500">{d.date}</p>
      <div className="space-y-1.5">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Probabilitas</span>
          <span className="font-bold text-blue-700">{d.value.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between gap-4 items-center">
          <span className="text-gray-400">Kategori</span>
          <CategoryBadge category={d.category} />
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Tekanan darah</span>
          <span className="font-medium text-gray-700">{d.blood_pressure}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">BMI</span>
          <span className="font-medium text-gray-700">{d.bmi}</span>
        </div>
      </div>
    </div>
  );
}

function getDotColor(value) {
  if (value <= 20) return '#1D9E75';
  if (value <= 40) return '#185FA5';
  return '#E24B4A';
}

function CustomDot({ cx, cy, payload }) {
  const color = getDotColor(payload.value);
  return (
    <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={2} />
  );
}

export default function Trend({ data, period, setPeriod }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-900">
            Tren Perkembangan Kesehatan
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Analisis probabilitas risiko jantung Anda
          </p>
        </div>
        <div className="flex gap-1 rounded-xl bg-gray-100 p-1 self-start sm:self-center">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPeriod(opt.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                period === opt.value
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-gray-400
                        border border-dashed rounded-xl border-gray-100"
        >
          <p className="text-sm font-medium">Belum ada data tren</p>
          <p className="mt-1 text-xs text-center max-w-[250px]">
            Lakukan skrining pada periode ini untuk mulai melihat perkembangan
            tren.
          </p>
        </div>
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="probGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#185FA5" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#185FA5" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickLine={false}
                domain={[0, 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={20}
                stroke="#1D9E75"
                strokeDasharray="5 4"
                label={{
                  value: 'Batas aman',
                  fill: '#1D9E75',
                  fontSize: 10,
                  position: 'insideBottomLeft',
                  offset: 10,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#185FA5"
                fill="url(#probGrad)"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{
                  r: 7,
                  fill: '#185FA5',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
