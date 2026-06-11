import Link from "next/link";

/**
 * /audit — placeholder destination for all CTA buttons.
 * Swap in the real intake form / scheduling embed for zzcornerstone.com.
 */
export default function AuditPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bone px-6 text-center text-evergreen">
      <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-cinematic text-energy">
        48-Hour Wellness Audit
      </p>
      <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Your audit starts here.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed opacity-75">
        This is a placeholder page. Connect your intake form, scheduling tool,
        or checkout flow here.
      </p>
      <Link
        href="/"
        className="mt-10 font-display text-xs font-semibold uppercase tracking-widest underline underline-offset-4"
      >
        ← Back to home
      </Link>
    </main>
  );
}
