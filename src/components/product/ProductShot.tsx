import { DeviceFrame } from "./DeviceFrame";
import { screens, screenNote, type Screen, type ScreenKey } from "@/content/screens";

/**
 * InfoFlask Crystal 實際畫面：桌機與手機各一組截圖（<picture> 依螢幕寬度切換），外框標示「實際畫面」。
 * 靜態輸出沒有影像最佳化服務，所以直接用預先產生的 WebP 與 srcSet。
 */
export function ProductShot({ id, priority = false, note = false, className = "" }: { id: ScreenKey; priority?: boolean; note?: boolean; className?: string }) {
  const s: Screen = screens[id];
  const src = (suffix: string, w: number) => `/screens/${s.file}${suffix}-${w}.webp`;
  return (
    <figure className={className}>
      <DeviceFrame title={`InfoFlask Crystal｜${s.title}`} badge="實際畫面">
        <div className="relative">
          <picture>
            <source media="(max-width: 639px)" srcSet={`${src("-m", 780)} 780w, ${src("-m", 1170)} 1170w`} sizes="calc(100vw - 42px)" width={s.mobile.w} height={s.mobile.h} />
            <img
              src={src("", 1280)}
              srcSet={`${src("", 1280)} 1280w, ${src("", 2560)} 2560w`}
              sizes="(min-width: 1200px) 1134px, calc(100vw - 66px)"
              width={s.size.w}
              height={s.size.h}
              alt={s.alt}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
          {s.fade && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />}
        </div>
      </DeviceFrame>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-ink-2">
        {s.caption}
        {note && <span className="mt-1 block text-[12px] text-ink-3">{screenNote}</span>}
      </figcaption>
    </figure>
  );
}
