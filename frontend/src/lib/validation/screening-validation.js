import { z } from 'zod';

const numberPipe = (min, minMsg, max, maxMsg, intMsg) =>
  z.number().int(intMsg).min(min, minMsg).max(max, maxMsg);

const screeningSchema = z
  .object({
    age: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Usia wajib diisi',
      })
      .transform(Number)
      .pipe(
        numberPipe(
          1,
          'Usia minimal 1 tahun',
          120,
          'Usia maksimal 120 tahun',
          'Usia harus bilangan bulat',
        ),
      ),

    gender: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Jenis Kelamin wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [1, 2].includes(v), {
          message: 'Jenis Kelamin tidak valid',
        }),
      ),
    weight: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Berat badan wajib diisi',
      })
      .transform(Number)
      .pipe(
        numberPipe(1, 'Minimal 1 kg', 300, 'Maksimal 300 kg', 'Harus angka'),
      ),

    height: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Tinggi badan wajib diisi',
      })
      .transform(Number)
      .pipe(
        numberPipe(50, 'Minimal 50 cm', 250, 'Maksimal 250 cm', 'Harus angka'),
      ),

    systolicPressure: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Tekanan sistolik wajib diisi',
      })
      .transform(Number)
      .pipe(numberPipe(50, 'Minimal 50', 300, 'Maksimal 300', 'Harus angka')),

    diastolicPressure: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Tekanan diastolik wajib diisi',
      })
      .transform(Number)
      .pipe(numberPipe(30, 'Minimal 30', 200, 'Maksimal 200', 'Harus angka')),

    cholesterolLevel: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Kolesterol wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [1, 2, 3].includes(v), {
          message: 'Kolesterol tidak valid',
        }),
      ),

    glucoseLevel: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Glukosa wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [1, 2, 3].includes(v), {
          message: 'Glukosa tidak valid',
        }),
      ),

    smokingStatus: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Status merokok wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [0, 1].includes(v), {
          message: 'Status merokok tidak valid',
        }),
      ),

    alcoholStatus: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Status alkohol wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [0, 1].includes(v), {
          message: 'Status alkohol tidak valid',
        }),
      ),

    activityStatus: z
      .any()
      .refine((v) => v !== undefined && v !== null && v !== '', {
        message: 'Status aktivitas wajib dipilih',
      })
      .transform(Number)
      .pipe(
        z.number().refine((v) => [0, 1].includes(v), {
          message: 'Status aktivitas tidak valid',
        }),
      ),
  })
  .refine((data) => data.systolicPressure > data.diastolicPressure, {
    message: 'Tekanan sistolik harus lebih besar dari diastolik',
    path: ['systolicPressure'],
  });

export default screeningSchema;
