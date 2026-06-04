const generatePdfHtml = (data) => {
  const date = new Date(data.recorded_at).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  console.log(data.recorded_at);

  const isHighRisk = data.category === 'BERISIKO TINGGI';
  const riskColor = isHighRisk ? '#dc2626' : '#16a34a';
  const riskBg = isHighRisk ? '#fff5f5' : '#f0fdf4';
  const riskBorder = isHighRisk ? '#fca5a5' : '#86efac';
  const prob = Math.round((data?.probability ?? 0) * 100);

  const bmi = parseFloat((data.weight / (data.height / 100) ** 2).toFixed(1));
  const bmiCategory =
    bmi >= 30
      ? 'Obesitas'
      : bmi >= 25
        ? 'Overweight'
        : bmi >= 18.5
          ? 'Normal'
          : 'Underweight';
  const genderLabel = data.gender === 1 ? 'Perempuan' : 'Laki-laki';
  const bloodPressure = `${data.systolic_pressure}/${data.diastolic_pressure} mmHg`;
  const levelMapping = {
    1: 'Normal',
    2: 'Di Atas Normal',
    3: 'Jauh Di Atas Normal',
  };

  const cholesterolLabel =
    levelMapping[data.cholesterol_level] ?? data.cholesterol_level;
  const glucoseLabel = levelMapping[data.glucose_level] ?? data.glucose_level;

  const riskFactors = data.metadata?.top_risk_factors ?? [];
  const aiExpertRaw = data.metadata?.ai_expert_recommendation ?? '';
  const aiExpertList = aiExpertRaw
    .split('\n')
    .map((r) => r.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; font-size: 13px; }
        .header { background: #1a1a2e; color: #fff; padding: 28px 36px; }
        .header-title { font-size: 20px; font-weight: 700; }
        .header-sub { font-size: 12px; color: #94a3b8; margin-top: 4px; }
        .header-meta { display: flex; gap: 32px; margin-top: 16px; }
        .header-meta div p:first-child { font-size: 10px; color: #94a3b8; margin-bottom: 2px; }
        .header-meta div p:last-child { font-size: 12px; font-weight: 500; }
        .section { padding: 18px 36px; border-bottom: 1px solid #f0f0f0; }
        .section-title { font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: 12px; }
        .risk-box { background: ${riskBg}; border: 1px solid ${riskBorder}; border-radius: 8px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; }
        .risk-label { font-size: 16px; font-weight: 700; color: ${riskColor}; }
        .risk-sub { font-size: 11px; color: ${riskColor}; margin-top: 3px; }
        .risk-pct { font-size: 32px; font-weight: 800; color: ${riskColor}; }
        .risk-pct-label { font-size: 11px; color: ${riskColor}; text-align: right; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
        .row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f8f8f8; }
        .row:last-child { border-bottom: none; }
        .lbl { color: #666; }
        .val { font-weight: 600; }
        .badge { display: inline-block; padding: 1px 8px; border-radius: 99px; font-size: 11px; font-weight: 500; }
        .badge-red { background: #fff5f5; color: #dc2626; }
        .badge-yellow { background: #fffbeb; color: #b45309; }
        .badge-green { background: #f0fdf4; color: #16a34a; }
        .factor { display: flex; gap: 8px; padding: 4px 0; }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: #dc2626; margin-top: 5px; flex-shrink: 0; }
        .rec { display: flex; gap: 10px; padding: 6px 0; border-bottom: 1px solid #f8f8f8; }
        .rec:last-child { border-bottom: none; }
        .rec-num { width: 18px; height: 18px; border-radius: 50%; background: #1a1a2e; color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .footer { background: #f8f8f8; padding: 14px 36px; display: flex; justify-content: space-between; }
        .footer p { font-size: 10px; color: #999; }
      </style>
    </head>
    <body>
      <div class="header">
        <p class="header-title">Laporan Skrining Kardiovaskular</p>
        <p class="header-sub">CardioCheck · Dihasilkan otomatis</p>
        <div class="header-meta">
          <div><p>Tanggal skrining</p><p>${date}</p></div>
          <div><p>Pasien</p><p>${genderLabel}, ${data.age} tahun</p></div>
          <div><p>ID Skrining</p><p style="font-family:monospace;font-size:11px">${data.screening_id}</p></div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Hasil prediksi AI</p>
        <div class="risk-box">
          <div>
            <p class="risk-label">${data.category}</p>
            <p class="risk-sub">${data.recommendation}</p>
          </div>
          <div style="text-align:right">
            <p class="risk-pct">${prob}%</p>
            <p class="risk-pct-label">probabilitas risiko</p>
          </div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Data vital pasien</p>
        <div class="grid2">
          <div class="row"><span class="lbl">Berat badan</span><span class="val">${data.weight} kg</span></div>
          <div class="row"><span class="lbl">Tinggi badan</span><span class="val">${data.height} cm</span></div>
          <div class="row"><span class="lbl">BMI</span><span class="val">${bmi} <span class="badge badge-yellow">${bmiCategory}</span></span></div>
          <div class="row"><span class="lbl">Tekanan darah</span><span class="val">${bloodPressure}</span></div>
          <div class="row"><span class="lbl">Kolesterol</span><span class="val"><span class="badge badge-yellow">${cholesterolLabel}</span></span></div>
          <div class="row"><span class="lbl">Glukosa</span><span class="val"><span class="badge badge-green">${glucoseLabel}</span></span></div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Gaya hidup</p>
        <div class="grid2">
          <div class="row"><span class="lbl">Merokok</span><span class="val">${data.smoking_status === 0 ? 'Tidak' : 'Ya'}</span></div>
          <div class="row"><span class="lbl">Alkohol</span><span class="val">${data.alcohol_status === 0 ? 'Tidak' : 'Ya'}</span></div>
          <div class="row"><span class="lbl">Olahraga</span><span class="val">${data.activity_status === 1 ? 'Aktif' : 'Tidak aktif'}</span></div>
        </div>
      </div>

      <div class="section">
        <p class="section-title">Faktor risiko yang terdeteksi</p>
        ${riskFactors
          .map(
            (f) => `
          <div class="factor"><span class="dot"></span><span>${f}</span></div>
        `,
          )
          .join('')}
      </div>

      <div class="section">
        <p class="section-title">Rekomendasi tindak lanjut</p>
        <p style="font-size:13px;color:#555;margin:0 0 10px;padding-bottom:10px;border-bottom:1px solid #f0f0f0">${data.recommendation}</p>
        ${aiExpertList
          .map(
            (r, i) => `
          <div class="rec">
            <span class="rec-num">${i + 1}</span>
            <span>${r}</span>
          </div>
        `,
          )
          .join('')}
      </div>

      <div class="footer">
        <p>Dokumen ini bukan pengganti diagnosis medis profesional.</p>
        <p>cardiocheck.id · ${new Date().getFullYear()}</p>
      </div>
    </body>
    </html>
  `;
};

export default generatePdfHtml;
