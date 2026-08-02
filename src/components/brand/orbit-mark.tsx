import { cn } from "@/lib/cn";

export function OrbitMark({ className, id = "hero-orbit" }: { className?: string; id?: string }) {
  return (
    <svg
      className={cn("orbit-mark", className)}
      viewBox="0 0 600 600"
      fill="none"
      role="img"
      aria-label="A network of paths orbiting a globe"
    >
      <circle className="orbit-mark__halo" cx="300" cy="300" r="250" />
      <circle className="orbit-mark__ring" cx="300" cy="300" r="188" />
      <circle className="orbit-mark__ring orbit-mark__ring--inner" cx="300" cy="300" r="112" />
      <path
        id={id}
        className="orbit-mark__path"
        d="M73 394C121 485 230 545 346 522C473 497 553 374 523 252C493 130 371 54 249 84C127 114 51 236 81 358C105 457 198 522 299 514C393 507 468 434 478 344C489 240 410 151 309 140C217 130 137 193 119 282C102 366 153 449 235 470C308 489 383 451 413 383C443 315 418 234 355 195C299 160 225 170 179 217C137 260 130 327 160 378"
      />
      <path
        className="orbit-mark__globe"
        d="M252 278C265 247 297 229 329 236C360 243 381 271 379 303C377 335 352 361 320 365C287 370 256 351 245 320C239 306 241 290 252 278Z"
      />
      <circle className="orbit-mark__dot orbit-mark__dot--one" cx="73" cy="394" r="10" />
      <circle className="orbit-mark__dot orbit-mark__dot--two" cx="523" cy="252" r="8" />
      <circle className="orbit-mark__dot orbit-mark__dot--three" cx="160" cy="378" r="7" />
      <path className="orbit-mark__spark" d="M465 85V127M444 106H486" />
    </svg>
  );
}
