export const recovery = (_url: string): string => `
<div style="
    border-style: solid;
    border-width: thin;
    border-color: #dadce0;
    border-radius: 8px;
    padding: 40px 20px;
  " align="center" class="m_8641656249677547691mdv2rw">
  <h2 width="74" height="24" aria-hidden="true" style="margin-bottom: 16px" alt="Google" class="CToWUd"
    jslog="138226; u014N:xr6bB; 53:W2ZhbHNlLDBd"></h2>
  <div style="
      font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
        sans-serif;
      border-bottom: thin solid #dadce0;
      color: rgba(0, 0, 0, 0.87);
      line-height: 32px;
      padding-bottom: 24px;
      text-align: center;
      word-break: break-word;
    ">
    <h1 style="">Laboratorio BRIMON</h1>
  </div>
  <div style="
      font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
      line-height: 20px;
      padding-top: 20px;
      text-align: center;
    ">
    Haz click en el siguiente enlace para restablecer tu contraseña
    <div style="padding-top: 32px; text-align: center">
      <a href="${_url}" style="
          font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
            sans-serif;
          line-height: 16px;
          color: #ffffff;
          font-weight: 400;
          text-decoration: none;
          font-size: 14px;
          display: inline-block;
          padding: 10px 24px;
          background-color: #4184f3;
          border-radius: 5px;
          min-width: 90px;
        " target="_blank">Recuperar contraseña</a>
    </div>
  </div>
</div>
`;

export const welcome = (
  email_: string,
  user_: string,
  role_: string,
  password_: string,
  systemUrl_: string
): string => `
<body>
  <div style="
      font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
        sans-serif;
      border-bottom: thin solid #dadce0;
      color: rgba(0, 0, 0, 0.87);
      line-height: 32px;
      padding-bottom: 24px;
      text-align: center;
      word-break: break-word;
    ">
    <div style="font-size: 24px">Bienvenido a <strong>Laboratorio BRIMON </strong></div>
  </div>
  <div style="
      font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
      line-height: 20px;
      padding-top: 20px;
      text-align: center;
    ">
    Te damos la bienvenida a SISTEMA DEL LABORATORIO BRIMON. Tus datos de acceso al
    sistema son los siguiente:
    <div style="
        padding-top: 20px;
        font-size: 12px;
        line-height: 16px;
        color: #5f6368;
        letter-spacing: 0.3px;
        text-align: center;
      ">
      <strong>Usuario:</strong> ${user_}<br />
      <div style="
          padding-top: 20px;
          font-size: 12px;
          line-height: 16px;
          color: #5f6368;
          letter-spacing: 0.3px;
          text-align: center;
        ">
        <strong>Email:</strong> ${email_}<br />
        <strong>Rol:</strong> ${role_}<br />
        <div style="
            padding-top: 20px;
            font-size: 12px;
            line-height: 16px;
            color: #5f6368;
            letter-spacing: 0.3px;
            text-align: center;
          ">
          <strong>Contraseña:</strong> ${password_}<br />
        </div>
      </div>
    </div>
    <div style="padding-top: 32px; text-align: center">
      <a href="${systemUrl_}" style="
          font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
            sans-serif;
          line-height: 16px;
          color: #ffffff;
          font-weight: 400;
          text-decoration: none;
          font-size: 14px;
          display: inline-block;
          padding: 10px 24px;
          background-color: #4184f3;
          border-radius: 5px;
          min-width: 90px;
        " target="_blank">Ir al sistema</a>
    </div>
  </div>
</body>
`;
