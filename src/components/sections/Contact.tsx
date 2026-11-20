import { useState, type FormEvent } from 'react';
import { Button } from '../Button';
import { Check, Mail, MapPin, Phone } from '../icons';
import { SITE } from '../../data/content';
import type { ContactFormValues, SubmitStatus } from '../../types';

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  site: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

function validate(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 3) {
    errors.name = 'Informe seu nome completo.';
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Informe um e-mail corporativo válido.';
  }

  if (!URL_PATTERN.test(values.site.trim())) {
    errors.site = 'Informe o domínio no formato suaempresa.com.br.';
  }

  return errors;
}

interface ContactProps {
  /** Recebe os dados do formulário e devolve a promessa de envio. */
  onSubmit?: (values: ContactFormValues) => Promise<void>;
}

/**
 * Formulário de captação. Por padrão simula o envio; injete `onSubmit` para
 * conectar a um endpoint real (CRM, e-mail transacional etc.).
 */
export function Contact({ onSubmit }: ContactProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const update = (field: keyof ContactFormValues) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setValues(INITIAL_VALUES);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="section section--beige contact" aria-labelledby="contato-title">
      <div className="container contact__layout">
        <div className="contact__intro" data-reveal>
          <span className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            Private Access
          </span>
          <h2 id="contato-title">Inicie sua jornada ao topo</h2>
          <p>
            Preencha os dados abaixo para uma avaliação confidencial do seu ecossistema digital.
            Retornamos em até um dia útil com os próximos passos.
          </p>

          <ul className="contact__channels">
            <li>
              <a href={`mailto:${SITE.email}`}>
                <Mail className="contact__channel-icon" width={16} height={16} />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref}>
                <Phone className="contact__channel-icon" width={16} height={16} />
                {SITE.phone}
              </a>
            </li>
            <li>
              <span>
                <MapPin className="contact__channel-icon" width={16} height={16} />
                {SITE.address}
              </span>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="nome">Nome / Representante</label>
            <input
              id="nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              placeholder="Seu nome completo"
              className="field__control"
              value={values.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'nome-error' : undefined}
              onChange={(event) => update('name')(event.target.value)}
            />
            {errors.name ? (
              <span className="field__error" id="nome-error" role="alert">
                {errors.name}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="email">E-mail Corporativo</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="nome@empresa.com"
              className="field__control"
              value={values.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onChange={(event) => update('email')(event.target.value)}
            />
            {errors.email ? (
              <span className="field__error" id="email-error" role="alert">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="site">Domínio da Empresa</label>
            <input
              id="site"
              name="site"
              type="url"
              inputMode="url"
              autoComplete="url"
              required
              placeholder="https://sualoja.com.br"
              className="field__control"
              value={values.site}
              aria-invalid={Boolean(errors.site)}
              aria-describedby={errors.site ? 'site-error' : undefined}
              onChange={(event) => update('site')(event.target.value)}
            />
            {errors.site ? (
              <span className="field__error" id="site-error" role="alert">
                {errors.site}
              </span>
            ) : null}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="mensagem">Objetivo principal</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={3}
              className="field__control field__control--textarea"
              placeholder="Conte brevemente o desafio da sua marca (opcional)"
              value={values.message}
              onChange={(event) => update('message')(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="btn--block"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando…' : 'Solicitar Análise Confidencial'}
          </Button>

          <div className="contact__feedback" aria-live="polite">
            {status === 'success' ? (
              <p className="contact__feedback--success">
                <Check className="contact__feedback-icon" width={16} height={16} aria-hidden="true" />
                Solicitação recebida com sucesso. Nossa diretoria entrará em contato.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="contact__feedback--error">
                Revise os campos destacados para enviar sua solicitação.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
