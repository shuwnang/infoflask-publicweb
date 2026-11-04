import { LOGO_VIEWBOX, LogoPaths, MARK_VIEWBOX, MarkPaths } from "./LogoPaths";

/**
 * 正式商標（來源：infoflask_logo/infoflask logo.ai）。
 * - Wordmark：完整「InfoFlask」字標；「Info」與燒瓶走 currentColor（淺底＝墨色／深底＝白），「Flask」固定品牌藍。
 * - LogoMark：燒瓶 o＋三角形，用於小尺寸。
 */
export function Wordmark({ invert = false, className = "", height = 26 }: { invert?: boolean; className?: string; height?: number }) {
  const width = Math.round((height * 666) / 161);
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      className={`${invert ? "text-white" : "text-[#231916]"} ${className}`}
      role="img"
      aria-label="InfoFlask"
    >
      <LogoPaths />
    </svg>
  );
}

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true">
      <MarkPaths />
    </svg>
  );
}
