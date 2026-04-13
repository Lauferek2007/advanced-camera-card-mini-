import { z } from 'zod';
import { MEDIA_CHUNK_SIZE_MAX } from '../../const';

export const performanceConfigDefault = {
  features: {
    animated_progress_indicator: false,
    card_loading_effects: false,
    card_loading_indicator: false,
    media_chunk_size: 10,
    max_simultaneous_engine_requests: 1,
  },
  style: {
    border_radius: false,
    box_shadow: false,
  },
};

export const performanceConfigSchema = z
  .object({
    features: z
      .object({
        animated_progress_indicator: z
          .boolean()
          .default(performanceConfigDefault.features.animated_progress_indicator),
        card_loading_effects: z
          .boolean()
          .default(performanceConfigDefault.features.card_loading_effects),
        card_loading_indicator: z
          .boolean()
          .default(performanceConfigDefault.features.card_loading_indicator),
        media_chunk_size: z
          .number()
          .min(0)
          .max(MEDIA_CHUNK_SIZE_MAX)
          .default(performanceConfigDefault.features.media_chunk_size),
        max_simultaneous_engine_requests: z
          .number()
          .min(1)
          .default(performanceConfigDefault.features.max_simultaneous_engine_requests),
      })
      .default(performanceConfigDefault.features),
    style: z
      .object({
        border_radius: z.boolean().default(performanceConfigDefault.style.border_radius),
        box_shadow: z.boolean().default(performanceConfigDefault.style.box_shadow),
      })
      .default(performanceConfigDefault.style),
  })
  .default(performanceConfigDefault);
export type PerformanceConfig = z.infer<typeof performanceConfigSchema>;
