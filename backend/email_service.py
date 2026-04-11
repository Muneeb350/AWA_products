import os
import uuid
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv

load_dotenv()

# Load settings once at startup
_MAIL_USERNAME = os.getenv("MAIL_USERNAME", "")
_MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", "")
_MAIL_FROM = os.getenv("MAIL_FROM", "")
_MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
_MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
_MAIL_STARTTLS = os.getenv("MAIL_STARTTLS", "True").lower() == "true"
_MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS", "False").lower() == "true"

ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", _MAIL_FROM)


_fm = FastMail(ConnectionConfig(
    MAIL_USERNAME=_MAIL_USERNAME,
    MAIL_PASSWORD=_MAIL_PASSWORD,
    MAIL_FROM=_MAIL_FROM,
    MAIL_PORT=_MAIL_PORT,
    MAIL_SERVER=_MAIL_SERVER,
    MAIL_STARTTLS=_MAIL_STARTTLS,
    MAIL_SSL_TLS=_MAIL_SSL_TLS,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
))


def _build_html(name: str, email: str, subject: str, message: str, phone: str | None) -> str:
    phone_row = (
        f"""
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;vertical-align:top;">Phone</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;vertical-align:top;">{phone}</td>
        </tr>"""
        if phone
        else ""
    )

    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;
                      box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1d4ed8;padding:32px 40px;">
              <p style="margin:0;font-size:13px;color:#bfdbfe;letter-spacing:0.08em;
                        text-transform:uppercase;font-weight:600;">AWA Products · New Inquiry</p>
              <h1 style="margin:10px 0 0;font-size:28px;color:#ffffff;font-weight:700;
                         line-height:1.3;">
                Inquiry from: {name}
              </h1>
              <p style="margin:8px 0 0;font-size:16px;color:#ffffff;font-weight:600;">
                <a href="mailto:{email}" style="color:#ffffff;text-decoration:underline;">{email}</a>
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
                You have received a new inquiry through the AWA Products website.
                Here are the details:
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border-top:1px solid #e5e7eb;">
                <tr>
                  <td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;vertical-align:top;">Name</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;vertical-align:top;">{name}</td>
                </tr>
                <tr style="border-top:1px solid #f3f4f6;">
                  <td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;vertical-align:top;">Email</td>
                  <td style="padding:8px 0;font-size:14px;vertical-align:top;">
                    <a href="mailto:{email}" style="color:#1d4ed8;text-decoration:none;">{email}</a>
                  </td>
                </tr>
                {phone_row}
                <tr style="border-top:1px solid #f3f4f6;">
                  <td style="padding:8px 0;color:#6b7280;font-size:14px;width:110px;vertical-align:top;">Subject</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;vertical-align:top;">{subject}</td>
                </tr>
              </table>

              <!-- Message block -->
              <p style="margin:28px 0 8px;font-size:13px;color:#6b7280;
                        text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">
                Message
              </p>
              <div style="background:#f9fafb;border-left:4px solid #1d4ed8;
                          border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="margin:0;font-size:15px;color:#1f2937;line-height:1.7;
                          white-space:pre-wrap;">{message}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td>
                    <a href="mailto:{email}?subject=Re: {subject}"
                       style="display:inline-block;background:#1d4ed8;color:#ffffff;
                              text-decoration:none;font-size:14px;font-weight:600;
                              padding:12px 28px;border-radius:8px;letter-spacing:0.02em;">
                      Reply to {name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #e5e7eb;background:#f9fafb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
                This email was generated automatically by the AWA Products contact form.
                Hit Reply to respond directly to the customer.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


async def send_contact_notification(
    name: str,
    email: str,
    subject: str,
    message: str,
    phone: str | None = None,
) -> None:
    html = _build_html(name, email, subject, message, phone)
    msg = MessageSchema(
        subject="New Contact Inquiry - AWA Products",
        recipients=[ADMIN_EMAIL],
        body=html,
        subtype=MessageType.html,
        reply_to=[email],
        from_name=name,
        from_email=_MAIL_USERNAME,
        headers={
            "X-Entity-Ref-ID": str(uuid.uuid4()),
        },
    )
    await _fm.send_message(msg)
