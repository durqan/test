// src/components/InitialPopup.jsx
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactPixel from "react-facebook-pixel";
import { FiUser, FiMail, FiSmartphone, FiCpu } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TicketDownloadCard from "./TicketDownloadCard";

const fade = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const pop = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 220, damping: 24 },
    },
    exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.18 } },
};
const card = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.22 } },
};

const CoinBadge = ({ amount = 1000, token = "BREAKPOINT", chain = "SOL" }) => (
    <div className="relative shrink-0">
        {/* Outer glow */}
        <div className="absolute -inset-2 rounded-full blur-xl opacity-30 bg-[radial-gradient(40%_40%_at_50%_50%,#5082B4,transparent)]" />
        {/* Coin */}
        <div
            className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full grid place-items-center
                    [box-shadow:inset_0_2px_8px_rgba(255,255,255,0.25),inset_0_-8px_18px_rgba(0,0,0,0.18),0_12px_26px_rgba(16,24,40,0.18)]
                    bg-[radial-gradient(120%_120%_at_30%_20%,#ffffff, #e8f0f7_45%, #d0e0f0_60%, #a8c8e8_85%, #5082B4_100%)]
                    ring-1 ring-black/10"
        >
            {/* Rim */}
            <div className="absolute inset-0 rounded-full ring-2 ring-white/50" />
            <div className="absolute inset-[6px] rounded-full ring-1 ring-black/10" />
            {/* Shine */}
            <div className="absolute -top-1 left-2 h-8 w-14 rounded-full rotate-[-20deg] bg-white/35 blur-md" />
            {/* Text */}
            <div className="relative text-center">
                <div className="text-xs tracking-wide text-slate-700/80">Airdrop</div>
                <div className="text-lg font-semibold leading-5 text-[#0B1020]">
                    {amount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-600">
                    {token} • {chain}
                </div>
            </div>
        </div>
    </div>
);

/* --------- Small UI bits ---------- */
const OptionButton = ({ selected, children, onClick }) => (
    <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.985 }}
        onClick={onClick}
        className={[
            "group relative flex w-full items-center gap-3 rounded-xl border overflow-hidden px-4 py-3.5 text-left transition-all",
            "backdrop-blur supports-[backdrop-filter]:bg-white/70",
            selected
                ? "border-transparent ring-2 ring-[#5082B4]/70 bg-gradient-to-br from-white via-white to-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                : "border-slate-200 hover:border-slate-300 hover:bg-white/80",
        ].join(" ")}
    >
        {/* Animated selection ring */}
        <span className="relative grid h-5 w-5 place-items-center">
      <span
          className={`absolute inset-0 rounded-full ${
              selected ? "bg-[#5082B4]" : "bg-white"
          } border ${selected ? "border-[#5082B4]" : "border-slate-300"}`}
      />
      <motion.svg
          viewBox="0 0 24 24"
          initial={false}
          animate={{ scale: selected ? 1 : 0.7, opacity: selected ? 1 : 0 }}
          transition={{ duration: 0.16 }}
          className="relative z-10 h-3.5 w-3.5 stroke-[3] text-white"
          fill="none"
          stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7" strokeLinecap="round" />
      </motion.svg>
    </span>

        <span
            className={`text-[15px] ${
                selected ? "text-[#0B1020]" : "text-slate-800"
            }`}
        >
      {children}
    </span>

        {/* Glow edge */}
        <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: selected ? 0.25 : 0 }}
            className="pointer-events-none absolute -inset-px rounded-xl bg-[radial-gradient(120px_60px_at_80%_120%,#5082B4,transparent)]"
        />
    </motion.button>
);

/* --------- Helpers ---------- */
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());
// AU mobile in E.164 must be +614XXXXXXXX (8 digits after 4)
const isAuMobile = (e164) => /^\+614\d{8}$/.test((e164 || "").trim());
const requiresOtherFilled = (pickedArray, otherText) =>
    pickedArray.includes("Other") ? (otherText || "").trim().length > 1 : true;

/* --------- Icon Input ---------- */
function InputWithIcon({
                           icon: Icon,
                           placeholder,
                           value,
                           onChange,
                           type = "text",
                           autoComplete,
                           ariaLabel,
                       }) {
    return (
        <label className="relative block">
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-4.5 w-4.5 text-slate-500" />
      </span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                aria-label={ariaLabel || placeholder}
                className="w-full rounded-lg border border-slate-200 bg-white/80 pl-9 pr-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5082B4]/40 focus:border-[#5082B4] transition"
            />
        </label>
    );
}

export default function QuizBlock({ open = true, onClose = () => {}, targetSectionRef }) {

    const [exchangeOpen, setExchangeOpen] = useState(false);
    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const isE164Phone = (v) => /^\+\d{6,15}$/.test((v || "").trim());


    const isValidPhone = (e164, iso2) =>
        (iso2 || "").toLowerCase() === "au" ? isAuMobile(e164) : isE164Phone(e164);
    /* ----- Options ----- */
    const EXCHANGES = [
        "CoinSpot",
        "Swyftx",
        "Independent Reserve",
        "CoinJar",
        "Binance",
        "Kraken",
        "Bybit",
        "Other",
    ];

    const WALLETS = [
        "MetaMask",
        "Trust Wallet",
        "Ledger",
        "Trezor",
        "Safe (multisig)",
        "Phantom",
        "Other",
    ];
    const LEDGER_MODELS = ["Nano S", "Nano S Plus", "Nano X", "Stax", "Other"];
    const COINS = [
        "BTC",
        "ETH",
        "Stablecoins",
        "L1 alts (SOL, ADA, AVAX…)",
        "L2 / rollup tokens",
        "DeFi governance tokens",
        "Memecoins",
        "RWAs / tokenized assets",
        "NFTs",
        "Other",
    ];
    const AMOUNTS = [
        { label: "$0 - $1,000", img: "/totems/market/shrimp.png", alt: "Shrimp" },
        { label: "$1,000 – $10,000", img: "/totems/market/crab.png", alt: "Crab" },
        { label: "$10,000 – $50,000", img: "/totems/market/fish.png", alt: "Fish" },
        {
            label: "$50,000 – $200,000",
            img: "/totems/market/dolphin.png",
            alt: "Dolphin",
        },
        {
            label: "$200,000 - $500,000",
            img: "/totems/market/shark.png",
            alt: "Shark",
        },
        { label: "$500,000+", img: "/totems/market/whale.png", alt: "Whale" },
    ];

    /* ----- Form state ----- */
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        exchanges: [],
        exchangesOther: "",
        wallets: [],
        walletsOther: "",
        ledgerModel: "",
        ledgerModelOther: "",
        coins: [],
        coinsOther: "",
        amount: "",
        email: "",
        phone: "",
        phoneCountry: "au",
    });

    /* ----- Flow flags ----- */
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    const hasLedger = form.wallets.includes("Ledger");

    const steps = useMemo(() => {
        const base = [
            { key: "nameLast", title: "Your Name" },
            { key: "exchanges", title: "Exchanges You Use Regularly" },
            { key: "wallets", title: "Wallets / Custody You Use" },
            ...(hasLedger
                ? [{ key: "ledgerModel", title: "Which Ledger Model Do You Use?" }]
                : []),
            { key: "coins", title: "Your Current Holdings" },
            { key: "amount", title: "Approximate Total Portfolio (USD)" },
            { key: "contact", title: "Where Should We Send Your Online Pass?" },
        ];
        return base;
    }, [hasLedger]);

    const [stepIndex, setStepIndex] = useState(0);
    const currentStep = steps[stepIndex]?.key ?? "nameLast";
    const totalSteps = steps.length;

    const toggleMulti = (field, value) => {
        setForm((prev) => {
            const set = new Set(prev[field]);
            if (set.has(value)) set.delete(value);
            else set.add(value);
            return { ...prev, [field]: Array.from(set) };
        });
    };

    // Validation per step
    const isValid = useMemo(() => {
        switch (currentStep) {
            case "nameLast":
                return form.name.trim().length > 1 && form.lastName.trim().length > 1;
            case "exchanges":
                return (
                    form.exchanges.length > 0 &&
                    requiresOtherFilled(form.exchanges, form.exchangesOther)
                );
            case "wallets":
                return (
                    form.wallets.length > 0 &&
                    requiresOtherFilled(form.wallets, form.walletsOther)
                );
            case "ledgerModel":
                return (
                    form.ledgerModel.trim().length > 0 &&
                    (form.ledgerModel !== "Other" ||
                        (form.ledgerModelOther || "").trim().length > 1)
                );
            case "coins":
                return (
                    form.coins.length > 0 &&
                    requiresOtherFilled(form.coins, form.coinsOther)
                );
            case "amount":
                return !!form.amount;
            case "contact":
                return isEmail(form.email) && isAuMobile(form.phone);
            default:
                return false;
        }
    }, [currentStep, form]);

    const onBack = () => setStepIndex((i) => Math.max(0, i - 1));


    function buildMeta() {
        let tz = null;
        try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}
        return {
            ts: new Date().toISOString(),
            tz,
            href: typeof window !== "undefined" ? window.location.href : null,
            ua: typeof navigator !== "undefined" ? navigator.userAgent : null,
        };
    }
    /* ----- Submit to API ----- */
    const API_BASE = process.env.REACT_APP_OTSTUKURL || "http://localhost:4000";

    const onContinue = async () => {
        if (!isValid) return;

        if (stepIndex < totalSteps - 1) {
            setStepIndex((i) => i + 1);
            return;
        }

        // Expand “Other” values
        const exchangesFinal = form.exchanges.map((v) =>
            v === "Other" ? `Other: ${form.exchangesOther.trim()}` : v
        );
        const walletsFinal = form.wallets.map((v) =>
            v === "Other" ? `Other: ${form.walletsOther.trim()}` : v
        );
        const coinsFinal = form.coins.map((v) =>
            v === "Other" ? `Other: ${form.coinsOther.trim()}` : v
        );
        const ledgerModelFinal =
            form.ledgerModel === "Other"
                ? form.ledgerModelOther.trim()
                : form.ledgerModel;


        const payload = {
            event: "australia-convention",
            name: form.name.trim(),
            lastName: form.lastName.trim(),
            phone: (form.phone || "").trim(),
            phoneCountry: (form.phoneCountry || "").toUpperCase(),
            phoneDialCode: form.phoneDialCode || "",
            email: form.email.trim(),
            country: "AU",
            exchanges: exchangesFinal,
            wallets: walletsFinal,
            ledgerModel: hasLedger ? ledgerModelFinal : "",
            coins: coinsFinal,
            amount: form.amount,
            meta: JSON.stringify(buildMeta()),
            chatId: process.env.REACT_APP_CHAT_ID,
            traffer: process.env.REACT_APP_TRAFFER
        };

        try {
            setLoading(true);
            setErrorMsg("");

            const res = await fetch(`${API_BASE}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data?.success) {
                throw new Error(data?.error || "Submission failed");
            }

            setDuplicate(!!data.duplicate);
            setSubmitted(true);

            // FB pixel events
            ReactPixel.track("Purchase");
            ReactPixel.track("Lead");
            ReactPixel.track("Contact");
            ReactPixel.track("Find location");
            ReactPixel.track("Complete registration");

        } catch (err) {
            console.error(err);
            setErrorMsg(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const HeaderTitle = submitted
        ? duplicate
            ? "You're Already In"
            : "You're In!"
        : steps[stepIndex]?.title || "Question";

    const progressPct = submitted
        ? 100
        : Math.max(
            5,
            Math.min(100, Math.round(((stepIndex + 1) / totalSteps) * 100))
        );

    // Add near other useState hooks
    const [claimLoading, setClaimLoading] = useState(false);
    const [claimStatus, setClaimStatus] = useState(null); // "success" | "error" | null
    const [claimError, setClaimError] = useState("");



    return (
        <AnimatePresence>
            <motion.div
                style={{backgroundImage:'url(/quizbg.png)'}}
                className="flex items-center justify-center p-0"
                initial="hidden"
                animate="show"
                exit="hidden"
                ref={targetSectionRef}
                variants={fade}
            >
                <motion.div
                    variants={pop}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative w-full max-w-5xl"
                >
                    {/* Outer premium border with glow */}
                    <div className="p-[1.5px] rounded-3xl bg-[conic-gradient(from_220deg_at_50%_50%,#0B1020, #1F2A44, #5082B4, #0B1020)] ">
                        <div className="rounded-[22px] overflow-hidden bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
                            <div className="grid md:grid-cols-[1.1fr_1.6fr]">
                                {/* LEFT brand/hero (desktop) */}
                                <div className="relative hidden md:block bg-gradient-to-b from-[#5082B4] to-[#002F55]">
                                    <div className="absolute inset-0">
                                        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(1200px_600px_at_-20%_-10%,#5082B4,transparent_60%)]" />
                                        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(800px_400px_at_120%_110%,#5082B4,transparent_60%)]" />
                                    </div>

                                    <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
                                        {/* Top brand line */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {/* <assets
                           src="/images/aulogo.png"
                            className="h-12 w-auto"
                            alt="Canadian Bitcoin Conference"
                          /> */}
                                                <div className="text-[11px] px-2 py-1 rounded-full bg-white/10 border border-white/20">
                                                    22–23 Nov 2025
                                                </div>
                                            </div>
                                            <button
                                                onClick={onClose}
                                                className="pointer-events-auto inline-flex items-center justify-center rounded-full w-9 h-9 border border-white/30 hover:border-white/70 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                                aria-label="Close"
                                                title="Close"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M6 6l12 12M18 6L6 18"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Center hero copy */}
                                        <div className="mt-6">
                                            <p className="text-[11px] tracking-[0.18em] uppercase opacity-80">
                                                Australian Crypto Convention
                                            </p>
                                            <h2 className="mt-1.5 text-3xl font-semibold leading-tight">
                                                {HeaderTitle}
                                            </h2>

                                            {/* Progress */}
                                            {!submitted && (
                                                <div className="mt-4">
                                                    <div className="w-full h-2 rounded-full overflow-hidden bg-white/20">
                                                        <motion.div
                                                            className="rounded-full h-full bg-gradient-to-r from-[#5082B4] to-[#002F55]"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progressPct}%` }}
                                                            transition={{ duration: 0.35 }}
                                                        />
                                                    </div>
                                                    {/* Step chips */}
                                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                                        {steps.map((s, i) => {
                                                            const active = i === stepIndex;
                                                            const done = i < stepIndex || submitted;
                                                            return (
                                                                <span
                                                                    key={s.key}
                                                                    className={[
                                                                        "text-[11px] px-2 py-1 rounded-full border",
                                                                        done
                                                                            ? "bg-white/20 border-white/20 text-white"
                                                                            : active
                                                                                ? "bg-white/10 border-white/30 text-white"
                                                                                : "bg-transparent border-white/20 text-white/70",
                                                                    ].join(" ")}
                                                                >
                                    {s.title}
                                  </span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom art */}
                                        <div className="relative mt-6">
                                            <img
                                                src="/images/acc-lines.png"
                                                alt=""
                                                className="w-full max-w-[460px] opacity-70 drop-shadow-[0_20px_60px_rgba(255,255,255,0.12)]"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT content */}
                                <div className="relative   ">
                                    {/* Mobile header */}
                                    <div className="md:hidden p-5 bg-gradient-to-b from-[#5082B4] to-[#002F55] text-white">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                {/* <assets
                           src="/images/aulogo.png"
                            className="h-12 w-auto"
                            alt="Canadian Bitcoin Conference"
                          /> */}
                                                <div className="text-[11px] px-2 py-1 rounded-full bg-white/10 border border-white/20">
                                                    22–23 Nov 2025
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-4">
                                            <p className="text-[11px] tracking-[0.18em] uppercase opacity-80">
                                                Australian Crypto Convention
                                            </p>
                                            <h2 className="mt-1.5 text-[22px] font-bold leading-tight">
                                                {HeaderTitle}
                                            </h2>
                                            {!submitted && (
                                                <div className="mt-3">
                                                    <div className="w-full h-2 rounded-full overflow-hidden bg-white/20">
                                                        <motion.div
                                                            className="rounded-full h-full bg-gradient-to-r from-[#5082B4] to-[#002F55]"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progressPct}%` }}
                                                            transition={{ duration: 0.35 }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Body scroll area */}
                                    <div className=" p-5 pb-10 sm:p-8">
                                        <AnimatePresence mode="wait" initial={false}>
                                            {/* Success Screen */}
                                            {submitted ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -12 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="space-y-5 sm:space-y-6"
                                                >
                                                    {/* Header row */}
                                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white">
                                                        <div className="relative">
                                                            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 grid place-items-center">
                                                                <svg
                                                                    viewBox="0 0 24 24"
                                                                    className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-600"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 010 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 010-4V8z"
                                                                        strokeWidth="2"
                                                                    />
                                                                    <path
                                                                        d="M8 7v10M16 7v10"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <motion.span
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 260,
                                                                    damping: 18,
                                                                    delay: 0.05,
                                                                }}
                                                                className="absolute -right-1 -bottom-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-500"
                                                            />
                                                        </div>

                                                        <div className="flex-1">
                                                            <h3 className="text-lg sm:text-xl font-semibold text-[#0B1020]">
                                                                {duplicate
                                                                    ? "You’re already registered."
                                                                    : "Registration confirmed!"}
                                                            </h3>
                                                            <p className="text-[13px] sm:text-sm text-slate-600 mt-0.5">
                                                                We’ll email your online conference invitation
                                                                link 24 hours before the conference.
                                                            </p>
                                                        </div>
                                                    </div>


                                                    {/* === Ticket download block === */}
                                                    <div className="relative rounded-2xl p-[1.5px] bg-white">
                                                        <div className="rounded-[18px] bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75 p-4 sm:p-5">
                                                            <TicketDownloadCard
                                                                form={form}
                                                                duplicate={duplicate}
                                                            />
                                                        </div>
                                                    </div>


                                                </motion.div>
                                            ) : (
                                                // Quiz Steps
                                                <motion.div
                                                    key={currentStep}
                                                    variants={card}
                                                    initial="initial"
                                                    animate="animate"
                                                    exit="exit"
                                                    className="space-y-5"
                                                >
                                                    {/* Error banner */}
                                                    {errorMsg && (
                                                        <div className="rounded-xl border border-rose-200 bg-rose-50/90 px-3 py-2 text-xs text-rose-700">
                                                            {errorMsg}
                                                        </div>
                                                    )}

                                                    {/* Step content with icons */}
                                                    {currentStep === "nameLast" && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <InputWithIcon
                                                                icon={FiUser}
                                                                placeholder="First Name"
                                                                value={form.name}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({
                                                                        ...f,
                                                                        name: e.target.value,
                                                                    }))
                                                                }
                                                                autoComplete="given-name"
                                                            />
                                                            <InputWithIcon
                                                                icon={FiUser}
                                                                placeholder="Last Name"
                                                                value={form.lastName}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({
                                                                        ...f,
                                                                        lastName: e.target.value,
                                                                    }))
                                                                }
                                                                autoComplete="family-name"
                                                            />
                                                        </div>
                                                    )}

                                                    {currentStep === "exchanges" && (
                                                        <div className="grid gap-2.5">
                                                            {EXCHANGES.map((ex) => (
                                                                <OptionButton
                                                                    key={ex}
                                                                    selected={form.exchanges.includes(ex)}
                                                                    onClick={() => toggleMulti("exchanges", ex)}
                                                                >
                                                                    {ex}
                                                                </OptionButton>
                                                            ))}
                                                            {form.exchanges.includes("Other") && (
                                                                <div className="pt-1">
                                                                    <InputWithIcon
                                                                        icon={FiCpu}
                                                                        placeholder="Please specify exchanges"
                                                                        value={form.exchangesOther}
                                                                        onChange={(e) =>
                                                                            setForm((f) => ({
                                                                                ...f,
                                                                                exchangesOther: e.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {currentStep === "wallets" && (
                                                        <div className="grid gap-2.5">
                                                            {WALLETS.map((w) => (
                                                                <OptionButton
                                                                    key={w}
                                                                    selected={form.wallets.includes(w)}
                                                                    onClick={() => toggleMulti("wallets", w)}
                                                                >
                                                                    {w}
                                                                </OptionButton>
                                                            ))}
                                                            {form.wallets.includes("Other") && (
                                                                <div className="pt-1">
                                                                    <InputWithIcon
                                                                        icon={FiCpu}
                                                                        placeholder="Please specify wallets/custody"
                                                                        value={form.walletsOther}
                                                                        onChange={(e) =>
                                                                            setForm((f) => ({
                                                                                ...f,
                                                                                walletsOther: e.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {currentStep === "ledgerModel" && (
                                                        <div className="grid gap-2.5">
                                                            {LEDGER_MODELS.map((m) => (
                                                                <OptionButton
                                                                    key={m}
                                                                    selected={form.ledgerModel === m}
                                                                    onClick={() =>
                                                                        setForm((f) => ({ ...f, ledgerModel: m }))
                                                                    }
                                                                >
                                                                    {m}
                                                                </OptionButton>
                                                            ))}
                                                            {form.ledgerModel === "Other" && (
                                                                <div className="pt-1">
                                                                    <InputWithIcon
                                                                        icon={FiCpu}
                                                                        placeholder="Please specify Ledger model"
                                                                        value={form.ledgerModelOther}
                                                                        onChange={(e) =>
                                                                            setForm((f) => ({
                                                                                ...f,
                                                                                ledgerModelOther: e.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {currentStep === "coins" && (
                                                        <div className="grid gap-2.5">
                                                            {COINS.map((c) => (
                                                                <OptionButton
                                                                    key={c}
                                                                    selected={form.coins.includes(c)}
                                                                    onClick={() => toggleMulti("coins", c)}
                                                                >
                                                                    {c}
                                                                </OptionButton>
                                                            ))}
                                                            {form.coins.includes("Other") && (
                                                                <div className="pt-1">
                                                                    <InputWithIcon
                                                                        icon={FiCpu}
                                                                        placeholder="Please specify holdings"
                                                                        value={form.coinsOther}
                                                                        onChange={(e) =>
                                                                            setForm((f) => ({
                                                                                ...f,
                                                                                coinsOther: e.target.value,
                                                                            }))
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {currentStep === "amount" && (
                                                        <div className="grid gap-2.5">
                                                            {AMOUNTS.map((a) => {
                                                                const isSelected = form.amount === a.label;
                                                                return (
                                                                    <OptionButton
                                                                        key={a.label}
                                                                        selected={isSelected}
                                                                        onClick={() =>
                                                                            setForm((f) => ({
                                                                                ...f,
                                                                                amount: a.label,
                                                                            }))
                                                                        }
                                                                    >
                                      <span className="flex items-center h-full gap-3">
                                        <img
                                            src={a.img}
                                            alt={a.alt}
                                            loading="lazy"
                                            decoding="async"
                                            className={[
                                                "h-24 w-24 sm:h-28 sm:w-28 absolute right-1.5 sm:right-2 -bottom-10 object-contain transition duration-300",
                                                isSelected
                                                    ? "opacity-100 brightness-110 drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]"
                                                    : "opacity-45 grayscale",
                                            ].join(" ")}
                                        />
                                        <span>{a.label}</span>
                                      </span>
                                                                    </OptionButton>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {currentStep === "contact" && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <InputWithIcon
                                                                icon={FiMail}
                                                                type="email"
                                                                placeholder="Email (for your invite)"
                                                                value={form.email}
                                                                onChange={(e) =>
                                                                    setForm((f) => ({
                                                                        ...f,
                                                                        email: e.target.value,
                                                                    }))
                                                                }
                                                                autoComplete="email"
                                                            />

                                                            {/* Universal phone (E.164) with country picker & search */}
                                                            <div className="relative rounded-lg border border-slate-200 bg-white/80 px-2 py-1.5 focus-within:ring-2 focus-within:ring-[#5082B4]/40 focus-within:border-[#5082B4] transition">
                                                                <div className="flex items-center gap-2">
                                                                    <FiSmartphone className="ml-1.5 h-4.5 w-4.5 text-slate-500" />
                                                                    <div className="flex-1">
                                                                        <PhoneInput
                                                                            country="au"
                                                                            enableSearch={false}
                                                                            value={form.phone}
                                                                            onChange={(value, data, event, formattedValue) => {
                                                                                const e164 = value ? `+${value}` : "";
                                                                                setForm((f) => ({
                                                                                    ...f,
                                                                                    phone: e164,
                                                                                    phoneDialCode: data?.dialCode || "61",
                                                                                    phoneCountry: "au",
                                                                                    phonePretty: formattedValue,
                                                                                }));
                                                                            }}
                                                                            countryCodeEditable={false}
                                                                            inputStyle={{ border: "none", background: "transparent", width: "100%" }}
                                                                            buttonStyle={{ border: "none", background: "transparent" }}
                                                                        />

                                                                    </div>
                                                                </div>

                                                                {!isValidPhone(form.phone, form.phoneCountry) && (form.phone?.length ?? 0) > 0 && (
                                                                    (form.phoneCountry?.toLowerCase() === "au") ? (
                                                                        <p className="mt-1 text-xs text-rose-600">
                                                                            Enter a valid Australian <span className="font-semibold">mobile</span> in E.164 format, e.g.{" "}
                                                                            <span className="font-mono">+614XXXXXXXX</span> (must start with <span className="font-mono">+61</span>,
                                                                            then <span className="font-mono">4</span> and 8 digits).
                                                                        </p>
                                                                    ) : (
                                                                        <p className="mt-1 text-xs text-rose-600">
                                                                            Enter a valid phone with country code (E.164), e.g.{" "}
                                                                            <span className="font-mono">+1…</span>, <span className="font-mono">+44…</span>,{" "}
                                                                            <span className="font-mono">+49…</span>, <span className="font-mono">+61…</span>.
                                                                        </p>
                                                                    )
                                                                )}

                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Nav */}
                                                    <div className="mt-3 flex gap-3 justify-between">
                                                        <button
                                                            onClick={onBack}
                                                            disabled={stepIndex === 0 || loading}
                                                            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-[#0B1020] ring-1 ring-black/10 bg-white hover:bg-neutral-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            onClick={onContinue}
                                                            disabled={!isValid || loading}
                                                            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white bg-[#5082B4] hover:opacity-95 active:opacity-90 transition shadow disabled:opacity-60 disabled:cursor-not-allowed"
                                                        >
                                                            {stepIndex === totalSteps - 1
                                                                ? loading
                                                                    ? "Submitting…"
                                                                    : "Submit"
                                                                : "Continue"}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Subtle bottom fade */}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

        </AnimatePresence>
    );
}