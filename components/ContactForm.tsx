"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const TOPICS = [
  {
    id: "role",
    label: "A backend role",
    placeholder: "The role, the team, and what the backend looks like today.",
  },
  {
    id: "project",
    label: "A project or API",
    placeholder: "What you are building, the stack, and where you need help.",
  },
  {
    id: "other",
    label: "Something else",
    placeholder: "What would you like to talk about?",
  },
] as const;

type TopicId = (typeof TOPICS)[number]["id"];
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const LABELS: Record<Field, { id: string; text: string }> = {
  name: { id: "f-name", text: "Your name" },
  email: { id: "f-email", text: "Email" },
  message: { id: "f-message", text: "Message" },
};

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter an email like name@company.com.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Write at least 20 characters so I know what you need.";
  }
  return errors;
}

const fieldClass =
  "w-full rounded-xl border bg-brand px-4 font-display text-base text-head outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faint hover:border-accent/40 focus:border-primary focus:shadow-[0_0_0_3px_rgb(169_128_63_/_0.28)]";

export default function ContactForm() {
  const [topic, setTopic] = useState<TopicId>("role");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const current = TOPICS.find((t) => t.id === topic) ?? TOPICS[0];
  const errorList = (Object.keys(errors) as Field[]).map((key) => ({
    id: LABELS[key].id,
    text: `${LABELS[key].text}: ${errors[key]}`,
  }));
  const firstName = name.trim().split(/\s+/)[0] || "there";

  function updateField(field: Field, value: string) {
    const next = { name, email, message, [field]: value };
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const check = validate(next);
      if (check[field]) return prev;
      const rest = { ...prev };
      delete rest[field];
      return rest;
    });
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate({ name, email, message });
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  function reset() {
    setSent(false);
    setMessage("");
    setErrors({});
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center gap-5"
      >
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/35 font-display text-xl text-accent"
        >
          ✓
        </span>
        <h2 id="form-title" className="text-gradient font-serif text-3xl leading-tight sm:text-4xl">
          Thanks, {firstName}. Your message is on its way.
        </h2>
        <p className="max-w-md font-display text-lg leading-relaxed text-ink/90">
          I&rsquo;ll reply to{" "}
          <strong className="font-medium text-head">{email}</strong>. In the
          meantime, the case studies show how I approach problems like yours.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link href="/work" className="btn btn-primary">
            Read case studies <span className="arrow">&rarr;</span>
          </Link>
          <button type="button" onClick={reset} className="btn btn-secondary">
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h2 id="form-title" className="font-display text-2xl font-medium text-head sm:text-3xl">
          Send a message
        </h2>
        <p className="font-ui text-sm text-muted">
          Fields marked <span aria-hidden>*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
      </div>

      {errorList.length > 0 && (
        <div
          role="alert"
          className="flex flex-col gap-1.5 rounded-2xl border border-accent/30 bg-brand px-4 py-4"
        >
          <strong className="font-ui text-sm font-semibold text-head">
            Please fix {errorList.length === 1 ? "1 field" : `${errorList.length} fields`} before
            sending:
          </strong>
          <ul className="list-disc space-y-1 pl-5 font-ui text-sm leading-relaxed text-ink">
            {errorList.map((err) => (
              <li key={err.id}>
                <a href={`#${err.id}`} className="underline underline-offset-3 hover:text-primary">
                  {err.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
        <legend className="mb-1 p-0 font-ui text-sm font-medium text-head">
          What&rsquo;s this about? <span aria-hidden className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {TOPICS.map((t) => {
            const on = t.id === topic;
            return (
              <label
                key={t.id}
                className={`relative inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 font-ui text-sm transition-colors duration-200 ${
                  on
                    ? "border-primary-strong bg-primary-strong text-brand"
                    : "border-line bg-transparent text-head hover:border-accent/40"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={t.id}
                  checked={on}
                  onChange={() => setTopic(t.id)}
                  className="absolute m-0 h-px w-px opacity-0"
                />
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full border ${
                    on ? "border-brand bg-brand" : "border-accent/50 bg-transparent"
                  }`}
                />
                {t.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="f-name" className="font-ui text-sm font-medium text-head">
            Your name <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "f-name-err" : undefined}
            className={`${fieldClass} min-h-[52px] ${
              errors.name ? "border-head" : "border-line"
            }`}
          />
          {errors.name && (
            <span id="f-name-err" className="font-ui text-sm text-head">
              ↳ {errors.name}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="f-email" className="font-ui text-sm font-medium text-head">
            Email <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "f-email-err" : undefined}
            className={`${fieldClass} min-h-[52px] ${
              errors.email ? "border-head" : "border-line"
            }`}
          />
          {errors.email && (
            <span id="f-email-err" className="font-ui text-sm text-head">
              ↳ {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="f-company" className="font-ui text-sm font-medium text-head">
          Company or project <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="f-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={`${fieldClass} min-h-[52px] border-line`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="f-message" className="font-ui text-sm font-medium text-head">
            Message <span aria-hidden className="text-accent">*</span>
          </label>
          <span id="f-message-hint" className="font-ui text-xs tracking-wide text-muted">
            {message.length} / 2000
          </span>
        </div>
        <textarea
          id="f-message"
          name="message"
          rows={6}
          maxLength={2000}
          required
          placeholder={current.placeholder}
          value={message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "f-message-hint f-message-err" : "f-message-hint"
          }
          className={`${fieldClass} min-h-40 resize-y py-3.5 leading-relaxed ${
            errors.message ? "border-head" : "border-line"
          }`}
        />
        {errors.message && (
          <span id="f-message-err" className="font-ui text-sm text-head">
            ↳ {errors.message}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <button type="submit" className="btn btn-primary min-h-[52px] px-7 text-base">
          Send message <span className="arrow">&rarr;</span>
        </button>
        <p className="font-ui text-sm text-muted">Your details are only used to reply to you.</p>
      </div>
    </form>
  );
}
